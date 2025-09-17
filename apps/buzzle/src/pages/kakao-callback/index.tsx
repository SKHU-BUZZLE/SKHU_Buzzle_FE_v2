import { LoaderIcon } from '@buzzle/design';
import { useAuth } from '@hooks/useAuth';

export default function KakaoCallback() {
  const { error } = useAuth();

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <LoaderIcon className='size-100 animate-spin' color='#E5F3FF' />
      {/* 접근성용 에러 텍스트만 숨겨서 유지 */}
      {error && <p className='sr-only'>로그인 실패: {String(error)}</p>}
    </div>
  );
}
