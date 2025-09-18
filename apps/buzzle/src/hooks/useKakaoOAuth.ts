import { exchangeAuthCodeForTokens, getKakaoOAuthCallback } from '@apis/auth';
import { useAuthStore } from '@stores/auth';
import { useUserStore } from '@stores/user';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * 카카오 OAuth 콜백 전용 훅
 *
 * 흐름
 * 1) URL의 ?code= 읽기
 * 2) GET /oauth2/callback/kakao → id_token 획득
 * 3) POST /kakao/token → access/refresh 토큰 발급  (서버 응답은 { data: { accessToken, refreshToken } } 형태로 온다고 가정)
 * 4) zustand auth 스토어에 토큰 저장
 * 5) 사용자 프로필/라이프를 미리 로드 (하나 실패해도 이동은 진행) → 홈으로 이동
 *
 */
export const useKakaoOAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const setTokens = useAuthStore((state) => state.setTokens);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const fetchLife = useUserStore((state) => state.fetchLife);

  const requestSentRef = useRef(false);

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (code: string) => {
      const kakaoResponse = await getKakaoOAuthCallback(code);
      const idToken = kakaoResponse.data.id_token;
      if (!idToken) throw new Error('id_token을 받지 못했습니다.');

      const tokenResponse = await exchangeAuthCodeForTokens(idToken);
      const accessToken = tokenResponse.data.data.accessToken;
      const refreshToken = tokenResponse.data.data.refreshToken;
      if (!accessToken || !refreshToken) throw new Error('서비스 토큰 발급 실패');

      return { accessToken, refreshToken };
    },

    onSuccess: async ({ accessToken, refreshToken }) => {
      setTokens(accessToken, refreshToken);

      await Promise.allSettled([fetchUser(), fetchLife()]);

      navigate('/', { replace: true });
    },

    onError: (err) => {
      console.error('[useAuth] 인증 오류 발생:', err);
      // 에러시 로그인으로 보낼꺼면 여기 추가해야 함.
    },
  });

  // 콜백 진입 시 한 번만 실행
  useEffect(() => {
    const code = searchParams.get('code');
    if (!code || requestSentRef.current) return;

    requestSentRef.current = true;
    mutate(code);
  }, [searchParams, mutate]);

  return { isLoading: isPending, error };
};
