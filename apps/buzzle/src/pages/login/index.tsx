function buildKakaoAuthorizeUrl() {
  const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID!;
  const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI!;

  // 디버그 로그
  console.log('[Login] VITE_KAKAO_CLIENT_ID =', clientId);
  console.log('[Login] VITE_KAKAO_REDIRECT_URI =', redirectUri);
  console.log('[Login] VITE_BACKEND_URL =', import.meta.env.VITE_BACKEND_URL);

  const qs = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
  });
  const url = `https://kauth.kakao.com/oauth/authorize?${qs.toString()}`;
  console.log('[Login] kakao authorize url =', url);
  return url;
}

export default function LoginPage() {
  const handleLogin = () => {
    const url = buildKakaoAuthorizeUrl();
    window.location.href = url;
  };

  return (
    <main className='flex min-h-screen items-center justify-center bg-gray-50 p-6'>
      <div className='w-full max-w-md space-y-4 rounded-xl border bg-white p-6 shadow'>
        <h1 className='text-lg font-semibold'>테스트 로그인</h1>

        <button className='w-full rounded-md bg-yellow-300 py-3 font-medium hover:opacity-90' onClick={handleLogin}>
          카카오로 시작하기
        </button>

        <div className='space-y-1 text-sm text-gray-600'>
          <p>
            <span className='font-medium'>client_id:</span> {import.meta.env.VITE_KAKAO_CLIENT_ID}
          </p>
          <p>
            <span className='font-medium'>redirect_uri:</span> {import.meta.env.VITE_KAKAO_REDIRECT_URI}
          </p>
          <p>
            <span className='font-medium'>backend:</span> {import.meta.env.VITE_BACKEND_URL}
          </p>
        </div>
      </div>
    </main>
  );
}
