import { useEffect } from 'react';

/**
 * @hook useClickOutside
 * @description
 * 지정한 ref 요소 영역 밖을 클릭했을 때 콜백을 실행하는 훅입니다.
 * - 모달, 드롭다운, 드로어 등에서 "외부 클릭 시 닫기" 동작을 구현할 때 유용합니다.
 *
 * @param ref 감지할 대상 요소의 ref 객체
 * @param open 훅이 동작할지 여부 (보통 열림 상태)
 * @param onClose 외부 클릭 시 실행할 콜백 함수
 *
 * @example
 * ```tsx
 * function ExampleDropdown({ open, onClose }: { open: boolean; onClose: () => void }) {
 *   const ref = useRef<HTMLDivElement>(null);
 *
 *   // 열려 있을 때만 외부 클릭을 감지하여 닫기 실행
 *   useClickOutside(ref, open, onClose);
 *
 *   if (!open) return null;
 *   return (
 *     <div ref={ref} style={{ border: '1px solid #ddd', padding: 12 }}>
 *       <p>이 영역 바깥을 클릭하면 닫힙니다.</p>
 *       <button onClick={onClose}>닫기</button>
 *     </div>
 *   );
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
