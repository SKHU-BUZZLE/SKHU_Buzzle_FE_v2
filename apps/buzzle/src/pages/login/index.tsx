import BuzzleCharacter from '@assets/images/buzzle-character.webp';
import { Button } from '@buzzle/design';
import { KakaoIcon } from '@buzzle/design';

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
    <main className='ds-theme-bg-base flex min-h-screen items-center justify-center bg-amber-100 p-6'>
      <div className='flex h-full w-full max-w-md flex-col items-center gap-[10vh]'>
        <img className='h-auto w-[50vw] max-w-200 min-w-120' src={BuzzleCharacter} />
        {/* <h1 className='ds-typ-heading-1'>버즐에 오신걸 환영합니다!</h1> */}
        <Button
          className='dark:text-black-600 text-black-600 mt-auto w-full flex-1 bg-[#FEE500] dark:bg-[#FEE500]'
          leftIcon={<KakaoIcon className='mr-8 size-28 text-[#000000] opacity-90' />}
          variant='outline'
          onClick={handleLogin}
        >
          카카오로 시작하기
        </Button>
      </div>
    </main>
  );
}
