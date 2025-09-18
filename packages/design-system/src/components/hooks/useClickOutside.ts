import { useEffect } from 'react';

/**
 * @hook useClickOutside
 * @description
 * 지정한 ref 영역 외부를 클릭했을 때 콜백을 실행하는 훅입니다.
 * - 모달, 드롭다운, 드로어 등 "외부 클릭 시 닫기" 패턴에서 재사용할 수 있습니다.
 *
 * @param ref   감지할 대상 요소의 ref
 * @param active 외부 클릭 감지를 활성화할지 여부 (보통 열림 상태)
 * @param onClose 외부 클릭 시 실행할 콜백
 *
 * @example
 * ```tsx
 * function Example({ open, onClose }: { open: boolean; onClose: () => void }) {
 *   const ref = useRef<HTMLDivElement>(null);
 *   useClickOutside(ref, open, onClose);
 *
 *   return open ? <div ref={ref}>모달</div> : null;
 * }
 * ```
 */
export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  active: boolean,
  onClose: () => void,
) {
  useEffect(() => {
    if (!active) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      // ref.current가 있고, 클릭한 대상이 그 내부가 아니면 닫기
      if (ref.current && !ref.current.contains(target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, active, onClose]);
}
