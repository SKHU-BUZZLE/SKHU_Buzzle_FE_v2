import { createContext, useContext } from 'react';

import type { ModalContextType } from './types';

/**
 * @description Modal 컴포넌트들 간의 상태를 공유하는 Context
 */
export const ModalContext = createContext<ModalContextType | null>(null);

/**
 * @description Modal Context를 사용하는 Hook
 * @returns {ModalContextType} Modal Context 값
 * @throws {Error} Modal.Root 외부에서 사용할 경우 에러 발생
 *
 * @example
 * ```tsx
 * function MyModalComponent() {
 *   const { open, onClose, onConfirm, titleId } = useModalContext();
 *   // ...
 * }
 * ```
 */
export function useModalContext(): ModalContextType {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('모달 컴포넌트는 <Modal.Root> 내부에서 사용되어야 합니다.');
  }
  return context;
}
