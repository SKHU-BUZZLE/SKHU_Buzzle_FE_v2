import { LoaderIcon } from '@buzzle/design';
import { useKakaoOAuth } from '@hooks/useKakaoOAuth';

export default function KakaoCallback() {
  const { error } = useKakaoOAuth();

  return (
    <div className='flex flex-1 items-center justify-center'>
      <LoaderIcon className='size-100 animate-spin' color='rgba(6, 86, 215, 0.15)' />
      {/* 접근성용 에러 텍스트만 숨겨서 유지 */}
      {error && <p className='sr-only'>로그인 실패: {String(error)}</p>}
    </div>
  );
}
