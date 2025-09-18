import { useEffect } from 'react';

/**
 * @hook useEscToClose
 * @description ESC 키를 눌렀을 때 모달을 닫는 훅입니다.
 * @param open 모달이 열려 있는 상태
 * @param onClose ESC 키 입력 시 실행할 닫기 함수
 */
export function useEscToClose(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);
}
