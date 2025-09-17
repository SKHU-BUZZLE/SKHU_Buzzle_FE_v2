import { exchangeAuthCodeForTokens, getKakaoOAuthCallback } from '@apis/auth';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function KakaoCallbackPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    console.log('[OAuthCallback] query.code =', code);

    if (!code) {
      setError('인가 코드가 없습니다.');
      return;
    }

    window.history.replaceState(null, '', location.pathname);

    getKakaoOAuthCallback(code)
      .then((res) => {
        console.log('[OAuthCallback] /oauth2/callback/kakao response:', res);

        const idToken = res.data.id_token;

        console.log('[OAuthCallback] extracted idToken =', idToken);
        if (!idToken) throw new Error('id_token을 받지 못했습니다.');

        return exchangeAuthCodeForTokens(idToken);
      })
      .then((res) => {
        console.log('[OAuthCallback] /kakao/token response:', res);

        const accessToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;

        console.log('[OAuthCallback] accessToken =', accessToken);
        console.log('[OAuthCallback] refreshToken =', refreshToken);

        if (!accessToken || !refreshToken) {
          throw new Error('서비스 토큰 발급 실패');
        }

        // ✅ 테스트: 로컬스토리지 저장
        const auth = { accessToken, refreshToken, user: null };
        localStorage.setItem('auth', JSON.stringify(auth));
        console.log('[OAuthCallback] saved localStorage.auth =', auth);

        // 완료 후 홈으로 이동
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.error('[OAuthCallback] 로그인 실패:', err);
        setError(err?.message ?? '로그인 실패');
      });
  }, [location.pathname, location.search, navigate]);

  return (
    <main className='flex min-h-screen items-center justify-center bg-gray-50 p-6'>
      <div className='w-full max-w-md rounded-xl border bg-white p-6 text-center shadow'>
        {!error ? (
          <p className='text-gray-700'>로그인 처리 중입니다…</p>
        ) : (
          <p className='text-red-600'>로그인 실패: {error}</p>
        )}
      </div>
    </main>
  );
}
