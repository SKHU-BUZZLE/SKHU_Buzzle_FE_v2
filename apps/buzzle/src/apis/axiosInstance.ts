import { useAuthStore } from '@stores/auth';
import axios from 'axios';

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
