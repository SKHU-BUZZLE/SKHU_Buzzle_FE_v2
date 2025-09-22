import Button from '@components/Button';
import { twm } from '@components/utils/twm';

import { useModalContext } from './ModalContext';
import type { ModalCloseButtonProps } from './types';

const BASE_CLOSEBUTTON_CLASS =
  'h-43 flex-1 rounded-2xl ' + 'bg-white-200 dark:bg-dm-black-500 ' + 'text-black-300 dark:text-white-300';

/**
 * @component ModalCloseButton
 * @description
 * 모달을 **닫기 전용**으로 사용하는 버튼입니다.
 * - 클릭 시 Context에서 제공하는 `onClose()`만 실행됩니다.
 * - 외부에서 onClick을 직접 전달할 수 없습니다.
 *
 * @example
 * ```tsx
 * <Modal.Footer>
 *   <Modal.CloseButton>취소</Modal.CloseButton>
 *   <Modal.ActionButton>확인</Modal.ActionButton>
 * </Modal.Footer>
 * ```
 */
function ModalCloseButton({ children, className }: ModalCloseButtonProps) {
  const { onClose } = useModalContext();

  return (
    <Button aria-label='Close modal' className={twm(BASE_CLOSEBUTTON_CLASS, className)} size='md' onClick={onClose}>
      {children}
    </Button>
  );
}

export const CloseButton = ModalCloseButton;
