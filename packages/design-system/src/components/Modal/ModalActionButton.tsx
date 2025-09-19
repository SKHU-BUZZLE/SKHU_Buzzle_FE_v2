import Button from '@components/Button';
import { Slot } from '@components/Slot';
import { twm } from '@components/utils/twm';
import { twMerge } from 'tailwind-merge';

import { useModalContext } from './ModalContext';
import type { ModalActionButtonProps } from './types';

/**
 * @component ModalActionButton
 * @description
 * 모달에서 **확인/동의/삭제 등 주요 액션**을 실행하는 버튼입니다.
 *
 * - 기본적으로 디자인 시스템 `Button`을 사용합니다.
 * - `asChild`가 true일 경우, Slot 패턴을 통해 자식 요소(<a>, <Link> 등)에 props를 직접 주입합니다.
 * - 클릭 시 실행 순서: 외부 onClick → Context onConfirm
 *
 * @example 기본 사용
 * ```tsx
 * <Modal.ActionButton>삭제</Modal.ActionButton>
 * ```
 *
 * @example asChild 사용
 * ```tsx
 * <Modal.ActionButton asChild onClick={() => console.log('slot')}>
 *   <a href="/danger-zone">위험 구역</a>
 * </Modal.ActionButton>
 * ```
 */
function ModalActionButton({
  children,
  className,
  onClick,
  asChild = false,
  disabled,
  ...props
}: ModalActionButtonProps) {
  const { onConfirm } = useModalContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLElement>) => {
    if (onClick) onClick(e); // 외부 핸들러 먼저
    if (e.defaultPrevented) return; // 막혔다면 onConfirm 실행 안 함
    if (onConfirm) onConfirm();
  };

  if (asChild) {
    // Slot 모드 → 자식 엘리먼트에 props 주입
    return (
      <Slot aria-label='Confirm modal action' className={twMerge('flex-1', className)} onClick={handleClick} {...props}>
        {children}
      </Slot>
    );
  }

  // 기본 모드 → 디자인 시스템 Button 사용
  return (
    <Button
      aria-label='Confirm modal action'
      className={twm('h-43 flex-1 rounded-2xl', className)}
      disabled={disabled}
      size='md'
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
}

export const ActionButton = ModalActionButton;
