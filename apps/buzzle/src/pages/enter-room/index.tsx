import { Button, FormField, KeyboardIcon } from '@buzzle/design';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EnterRoomPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='flex min-h-0 flex-1 flex-col gap-36'>
      <h1 className='ds-typ-heading-3 ds-text-strong'>방 입장하기</h1>

      <FormField
        ref={inputRef}
        // errorMessage='올바른 참여 코드를 입력해주세요'
        inputClassName='ds-typ-title-1 text-primary-500'
        inputWrapperClassName='py-20 px-24 ds-theme-bg-muted rounded-2xl gap-12'
        label='참여 코드를 입력해주세요'
        labelClassName='ds-typ-body-3'
        minLength={0}
        name='code'
        placeholder='ABCD12'
        rightSlot={<KeyboardIcon className='text-white-600 dark:text-white-900 size-24' />}
      />

      <Button
        className='mt-auto w-full'
        onClick={async () => {
          try {
            // ! 서버에서 유효한 코드인지 먼저 확인 가능..?
            const code = inputRef.current?.value;
            navigate(`/multi-room/${code}/lobby`, {
              state: { code },
              replace: true, // 뒤로가기 시 코드 입력 페이지 안 보이게
            });
          } catch (err) {
            console.error('[방 생성 실패]', err);
          }
        }}
      >
        방 생성하기
      </Button>
    </div>
  );
}
