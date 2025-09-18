import { twMerge } from 'tailwind-merge';

import { useModalContext } from './ModalContext';
import type { ModalTitleProps } from './types';

/**
 * @component ModalTitle
 * @description
 * 모달의 제목을 렌더링하는 컴포넌트입니다.
 * - Context에서 제공되는 `titleId`를 자동으로 연결합니다.
 * - 기본 스타일은 디자인 시스템의 헤딩 토큰을 사용하며, 필요 시 className으로 확장 가능합니다.
 *
 * @example
 * ```tsx
 * <Modal.Title>정말 삭제할까요?</Modal.Title>
 * ```
 */
function ModalTitle({ children, className }: ModalTitleProps) {
  const { titleId } = useModalContext();

  return (
    <h2 className={twMerge('ds-typ-title-2', className)} id={titleId}>
      {children}
    </h2>
  );
}

export const Title = ModalTitle;
