function buildKakaoAuthorizeUrl(): string {
  const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    throw new Error('카카오 OAuth 환경변수가 설정되지 않았습니다.');
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
  });

  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
}

export default function LoginPage() {
  const handleLogin = () => {
    window.location.href = buildKakaoAuthorizeUrl();
  };

  return (
    // 임시 버튼 - 스타일은 추후 변경 예정
    <main className='flex min-h-screen items-center justify-center p-6'>
      <div className='w-full max-w-md'>
        {/* 임시 버튼 - 스타일은 추후 변경 예정 */}
        <button
          className='w-full rounded-md bg-yellow-300 py-3 font-medium hover:opacity-90'
          type='button'
          onClick={handleLogin}
        >
          카카오로 시작하기
        </button>
      </div>
    </main>
  );
}
