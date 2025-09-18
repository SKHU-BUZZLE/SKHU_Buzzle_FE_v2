import { twMerge } from 'tailwind-merge';

import { useModalContext } from './ModalContext';
import type { ModalDescriptionProps } from './types';

/**
 * @component ModalDescription
 * @description
 * 모달의 설명/보조 텍스트를 렌더링하는 컴포넌트입니다.
 * - Context에서 제공되는 `descriptionId`를 자동으로 연결합니다.
 * - 기본 스타일은 디자인 시스템의 본문 텍스트 토큰을 사용합니다.
 *
 * @example
 * ```tsx
 * <Modal.Description>이 작업은 되돌릴 수 없습니다.</Modal.Description>
 * ```
 */
function ModalDescription({ children, className }: ModalDescriptionProps) {
  const { descriptionId } = useModalContext();

  return (
    <p className={twMerge('ds-typ-body-2 ds-text-caption', className)} id={descriptionId}>
      {children}
    </p>
  );
}

export const Description = ModalDescription;
