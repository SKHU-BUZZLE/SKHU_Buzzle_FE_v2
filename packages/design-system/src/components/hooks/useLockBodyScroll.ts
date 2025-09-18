import { useEffect } from 'react';

/**
 * @hook useLockBodyScroll
 * @description 모달이 열려 있을 때 body의 스크롤을 잠그는 훅입니다.
 * @param open 모달이 열려 있는 상태
 */
export function useLockBodyScroll(open: boolean) {
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);
}
