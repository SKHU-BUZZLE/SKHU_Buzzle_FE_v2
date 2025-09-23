import { validateInviteCode } from '@apis/multi';
import { Button, FormField, KeyboardIcon, Modal } from '@buzzle/design';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EnterRoomPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState('');

  const handleEnterRoom = async () => {
    try {
      const code = inputRef.current?.value ?? '';
      if (!code) return; // 빈값 방지

      const res = await validateInviteCode({ inviteCode: code });

      if (res.data.statusCode === 200) {
        // 유효한 초대코드라면 대기방으로 이동
        navigate(`/multi-room/${code}/lobby`, {
          state: { code },
          replace: true, // 뒤로가기 시 코드 입력 페이지 안 보이게
        });
      } else {
        // 유효하지 않은 초대 코드일 때
        setModalDescription('올바른 초대 코드를 입력해주세요');
        setIsOpen(true);
      }
    } catch (err) {
      console.error(err);
      setModalDescription('초대 코드가 잘못되었거나 방이 없어요');
      setIsOpen(true);
    }
  };

  return (
    <div className='flex min-h-0 flex-1 flex-col gap-36'>
      <h1 className='ds-typ-heading-3 ds-text-strong'>방 입장하기</h1>

      <FormField
        ref={inputRef}
        inputClassName='ds-typ-title-1 text-primary-500'
        inputWrapperClassName='py-20 px-24 ds-theme-bg-muted rounded-2xl gap-12'
        label='참여 코드를 입력해주세요'
        labelClassName='ds-typ-body-3'
        minLength={0}
        name='code'
        placeholder='ABCD12'
        rightSlot={<KeyboardIcon className='text-white-600 dark:text-white-900 size-24' />}
      />

      <Button className='mt-auto w-full' onClick={handleEnterRoom}>
        입장하기
      </Button>

      <Modal.Root open={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Content>
          <Modal.Title>앗! 입장할 수 없어요</Modal.Title>
          <Modal.Description>{modalDescription}</Modal.Description>

          <Modal.Footer>
            <Modal.ActionButton onClick={() => setIsOpen(false)}>확인</Modal.ActionButton>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
}
