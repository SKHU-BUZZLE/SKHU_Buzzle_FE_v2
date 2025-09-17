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
