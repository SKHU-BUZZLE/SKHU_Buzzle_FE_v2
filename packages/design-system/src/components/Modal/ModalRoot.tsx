import { useClickOutside } from '@components/hooks/useClickOutside';
import { useEscToClose } from '@components/hooks/useEscToClose';
import { useLockBodyScroll } from '@components/hooks/useLockBodyScroll';
import { useId, useRef } from 'react';

import { ModalContext } from './ModalContext';
import type { ModalRootProps } from './types';

/**
 * @component ModalRoot
 * @description
 * Modal의 전역 상호작용(ESC, 외부 클릭, body 스크롤락)과 상태를 관리하는 루트 컴포넌트입니다.
 * - Portal/Overlay/role/aria 등 "표시/구조"는 Content가 담당합니다.
 * - Root는 훅을 통해 "행동"을 제어하고, Context로 하위에 open/onClose/onConfirm/modalRef/titleId/descriptionId를 제공합니다.
 */
function ModalRoot({ children, open, onClose, onConfirm }: ModalRootProps) {
  const titleId = useId();
  const descriptionId = useId();
  const modalRef = useRef<HTMLDivElement | null>(null);

  useLockBodyScroll(open);
  useEscToClose(open, onClose);
  useClickOutside(modalRef, open, onClose);

  return (
    <ModalContext.Provider value={{ open, onClose, onConfirm, modalRef, titleId, descriptionId }}>
      {children}
    </ModalContext.Provider>
  );
}

export const Root = ModalRoot;
