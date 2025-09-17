import { axiosInstance } from './axiosInstance';

/**
 * 서비스 토큰 페어 응답 형태
 * - 스웨거: { "accessToken": "string", "refreshToken": "string" }
 */
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * 카카오 OAuth 콜백 응답 필드
 * - 스웨거: { "access_token": "string", "id_token": "string" }
 * - 백엔드 콜백 엔드포인트가 JSON을 반환하는 경우에 해당합니다.
 */
export interface CallbackTokens {
  access_token: string;
  id_token: string;
}

/**
 * 카카오 OAuth 콜백 결과 조회
 * GET /oauth2/callback/kakao?code=...
 *
 * - 카카오에서 전달된 인가 코드(code)를 서버 콜백 엔드포인트로 전달해
 *   콜백 응답(JSON)을 그대로 받아옵니다.
 *
 * @param code 카카오 인가 코드
 * @returns access_token, id_token을 포함한 콜백 응답
 *
 * @example
 * getKakaoOAuthCallback(code).then(({ data }) => {
 *   console.log(data.access_token, data.id_token);
 * });
 */
export const getKakaoOAuthCallback = (code: string) => {
  return axiosInstance.get('/oauth2/callback/kakao', {
    params: { code },
  });
};

/**
 * 인가 코드로 서비스 액세스/리프레시 토큰 발급
 * POST /{provider}/token  (provider = "kakao" 고정 사용)
 * → 실제 호출 경로: POST /kakao/token
 *
 * - Request Body: { "authCode": string }
 * - Response Body: { "accessToken": string, "refreshToken": string }
 *
 * @param authCode 카카오 인가 코드
 * @returns 서비스 토큰 페어(accessToken, refreshToken)
 *
 * @example
 * exchangeAuthCodeForTokens(code).then(({ data }) => {
 *   console.log(data.accessToken, data.refreshToken);
 * });
 */
export const exchangeAuthCodeForTokens = (authCode: string) => {
  return axiosInstance.post('/kakao/token', {
    authCode,
  });
};

/**
 * 리프레시 토큰으로 액세스 토큰 재발급
 * POST /token/access
 *
 * - Request Body: { "refreshToken": string }
 * - Response Body: { "accessToken": string, "refreshToken": string }
 *
 * @param refreshToken 저장되어 있는 리프레시 토큰
 * @returns 갱신된 서비스 토큰 페어(accessToken, refreshToken)
 *
 * @example
 * reissueAccessToken(refreshToken).then(({ data }) => {
 *   console.log(data.accessToken, data.refreshToken);
 * });
 */
export const reissueAccessToken = (refreshToken: string) => {
  return axiosInstance.post('/token/access', {
    refreshToken,
  });
};
