import { useEffect } from 'react';

/**
 * @hook useLockBodyScroll
 * @description
 * 모달이 열려 있을 때 body의 스크롤을 잠그는 훅입니다.
 *
 * @param open 모달이 열려 있는 상태
 *
 * @example
 * ```tsx
 * function ExampleModal({ open }: { open: boolean }) {
 *   // 모달이 열려 있는 동안 body 스크롤이 잠김
 *   useLockBodyScroll(open);
 *
 *   if (!open) return null;
 *   return (
 *     <div role="dialog" style={{ height: 300, overflow: 'auto' }}>
 *       <p>여기에 긴 내용...</p>
 *       <p>body 스크롤은 막히고, 이 div 내부만 스크롤 가능합니다.</p>
 *     </div>
 *   );
 * }
 * ```
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
