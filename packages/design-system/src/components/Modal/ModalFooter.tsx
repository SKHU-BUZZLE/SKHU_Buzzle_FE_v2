import { twMerge } from 'tailwind-merge';

import type { ModalFooterProps } from './types';

/**
 * @component ModalFooter
 * @description
 * 모달 하단 버튼 영역을 렌더링하는 컨테이너 컴포넌트입니다.
 * - 기본적으로 가로 배치 + 오른쪽 정렬 + 버튼 간 간격을 제공합니다.
 * - 필요 시 className을 통해 정렬/간격을 오버라이드할 수 있습니다.
 *
 * @example
 * ```tsx
 * <Modal.Footer>
 *   <Modal.CloseButton>취소</Modal.CloseButton>
 *   <Modal.ActionButton onClick={handleConfirm}>삭제</Modal.ActionButton>
 * </Modal.Footer>
 * ```
 */
function ModalFooter({ children, className }: ModalFooterProps) {
  return <div className={twMerge('mt-18 flex gap-6', className)}>{children}</div>;
}

export const Footer = ModalFooter;
