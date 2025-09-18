import Overlay from '@components/Overlay';
import Portal from '@components/Portal';
import { twMerge } from 'tailwind-merge';

import { useModalContext } from './ModalContext';
import type { ModalContentProps } from './types';

const BASE_MODAL_CLASS =
  'relative mx-20 w-full ds-layout-max-width p-20 ' +
  'flex flex-col gap-12 ' +
  'rounded-4xl shadow-[0_0_10px_rgba(0,0,0,0.1)] ' +
  'bg-white-50 dark:border-dm-black-600 ' +
  'text-black-600 dark:text-white-300';

/**
 * @component ModalContent
 * @description
 * - Portal + Overlay + 모달 컨텐츠 박스를 렌더링하는 컴포넌트입니다.
 * - Root에서 내려주는 Context(open, modalRef 등)를 활용합니다.
 *
 * @example
 * ```tsx
 * <Modal.Root open={isOpen} onClose={() => setIsOpen(false)}>
 *   <Modal.Content className="max-w-md p-6">
 *     <Modal.Title>정말 삭제할까요?</Modal.Title>
 *     <Modal.Description>이 작업은 되돌릴 수 없습니다.</Modal.Description>
 *     <Modal.Footer>
 *       <Modal.CloseButton>취소</Modal.CloseButton>
 *       <Modal.ActionButton onClick={handleConfirm}>삭제</Modal.ActionButton>
 *     </Modal.Footer>
 *   </Modal.Content>
 * </Modal.Root>
 * ```
 */
function ModalContent({ children, className }: ModalContentProps) {
  const { open, modalRef, titleId, descriptionId } = useModalContext();

  if (!open) return null;

  return (
    <Portal>
      <Overlay />
      {/* 중앙 정렬 레이어 */}
      <div className='fixed inset-0 z-70 flex items-center justify-center'>
        {/* 모달 컨테이너 */}
        <div
          ref={modalRef}
          aria-describedby={descriptionId}
          aria-labelledby={titleId}
          aria-modal='true'
          className={twMerge(BASE_MODAL_CLASS, className)}
          role='dialog'
        >
          {children}
        </div>
      </div>
    </Portal>
  );
}

export const Content = ModalContent;
