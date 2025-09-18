import { logout } from '@hooks/useLogout';
import { useAuthStore } from '@stores/auth';
import axios, { AxiosError, HttpStatusCode, type InternalAxiosRequestConfig } from 'axios';

interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * .env 파일에서 설정한 VITE_BASE_URL을 기준으로 Axios 인스턴스를 생성하여 반환합니다.
 * 이 인스턴스를 통해 공통 설정이 적용된 API 요청을 수행할 수 있습니다.
 *
 * @example
 * ```ts
 * import axiosInstance from '@/apis/axiosInstance';
 *
 * axiosInstance.get('/users')
 *   .then(response => console.log(response.data));
 * ```
 * @see {@link https://axios-http.com/docs/instance Axios 공식 문서 - 인스턴스}
 */
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** EXCLUDE_AUTH_URLS
 * @description 인증이 필요 없는 API 경로입니다. 요청 인터셉터에서 해당 경로들은 accessToken을 헤더에 포함하지 않습니다.
 */
const EXCLUDE_AUTH_URLS = ['/oauth2/callback/kakao', '/kakao/token', '/token/access'];

/** 요청 인터셉터
 * 인증이 필요한 요청에는 Authorization 헤더에 accessToken을 자동으로 추가합니다.
 */
axiosInstance.interceptors.request.use((config) => {
  const url = config.url ?? '';

  // 로그인이 필요 없는 api는 토큰을 생략합니다.
  const skip = EXCLUDE_AUTH_URLS.some((excluded) => url.startsWith(excluded));

  if (!skip) {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// 에러 메시지 추출 유틸 함수
const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (typeof message === 'string') return message;
    if (status) return `요청에 실패했습니다. (Status: ${status})`;
  }
  return '알 수 없는 오류가 발생했습니다.';
};

/**
 * 응답 인터셉터
 *
 * 동작 요약
 * 1) 401(Unauthorized) 이외의 에러는 표준화된 메시지로 그대로 throw
 * 2) 401인 경우:
 *    - 재발급 요청 자체('/token/access')의 401이면 즉시 중단(무한 루프 방지)
 *    - 동일 요청 재시도는 1회만 허용(무한 루프 방지용 플래그 사용)
 *    - 스토어에 refreshToken이 없으면 인증 해제 후 에러 반환
 *    - refresh API로 새 토큰 발급 성공 시 스토어 갱신 → 원요청 Authorization 갱신 후 재시도
 *    - 재발급 실패 시 인증 해제 후 에러 반환
 *
 */
axiosInstance.interceptors.response.use(
  // 성공 응답은 손대지 않고 통과
  (response) => response,
  // 에러 응답 처리
  async (error: AxiosError) => {
    if (!axios.isAxiosError(error)) return Promise.reject(error);

    // 원래 요청 객체 (재시도 시 필요)
    const originalRequest = (error.config ?? {}) as RetryableRequest;
    // HTTP 상태코드
    const status = error.response?.status;

    // 401 이외 에러는 메시지 표준화 후 바로 반환
    if (status !== HttpStatusCode.Unauthorized) {
      return Promise.reject(new Error(getErrorMessage(error)));
    }

    // 무한 루프 방지: 재발급 요청 자체가 401이면 즉시 중단
    if (originalRequest?.url?.startsWith('/token/access')) {
      logout();
      return Promise.reject(new Error(getErrorMessage(error)));
    }

    // 무한 루프 방지: 같은 원요청의 재시도는 1회만 허용
    if (originalRequest._retry) {
      logout();
      return Promise.reject(new Error(getErrorMessage(error)));
    }
    // 재시도 플래그 설정
    originalRequest._retry = true;

    // 스토어에서 refreshToken 조회
    const { refreshToken } = useAuthStore.getState();
    if (!refreshToken) {
      // 재발급 시도 자체가 불가능 → 인증 해제 후 에러 반환
      logout();
      return Promise.reject(new Error('인증이 만료되었습니다. 다시 로그인해 주세요.'));
    }

    try {
      // 토큰 재발급 요청 (POST /token/access { refreshToken })
      const response = await axios.post(
        '/token/access',
        { refreshToken },
        { baseURL: import.meta.env.VITE_BACKEND_URL },
      );

      // 스웨거 문서가 정확하지 않아 안전하게 처리
      const payload = response.data?.data ?? response.data;
      const { accessToken, refreshToken: newRefreshToken } = payload;
      if (!accessToken || !newRefreshToken) throw new Error('토큰 재발급 실패');

      // 새 토큰을 스토어에 저장
      useAuthStore.getState().setTokens(accessToken, newRefreshToken);

      // 원요청 헤더에 새 Access 토큰 부착
      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      // 원요청 재시도
      return axiosInstance(originalRequest);
    } catch (error) {
      // 재발급 실패 → 인증 해제 후 에러 반환
      logout();
      return Promise.reject(new Error(getErrorMessage(error)));
    }
  },
);
