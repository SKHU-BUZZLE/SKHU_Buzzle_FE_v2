import { useEffect } from 'react';

/**
 * @hook useClickOutside
 * @description
 * 지정한 ref 요소 **바깥을 포인터 다운(pointerdown)** 했을 때 콜백을 실행하는 훅입니다.
 * - 모달, 드롭다운, 드로어 등에서 "외부 클릭 시 닫기" 동작을 구현할 때 유용합니다.
 * - `pointerdown` 이벤트를 사용하여 모바일 터치도 누락되지 않도록 합니다.
 * - 기본 좌클릭/터치 입력만 처리하며, 우클릭/보조 버튼은 무시합니다.
 * - 캡처 단계에서 리스너를 등록하여 내부에서 `stopPropagation`을 해도 안정적으로 동작합니다.
 *
 * @param ref 감지할 대상 요소의 ref 객체
 * @param active 훅 활성화 여부 (보통 열림 상태)
 * @param onClose 외부 클릭 시 실행할 콜백 함수
 *
 * @example
 * ```tsx
 * function ExampleDropdown({ open, onClose }: { open: boolean; onClose: () => void }) {
 *   const ref = useRef<HTMLDivElement>(null);
 *
 *   useClickOutside(ref, open, onClose);
 *
 *   if (!open) return null;
 *   return (
 *     <div ref={ref} style={{ border: '1px solid #ddd', padding: 12 }}>
 *       <p>이 영역 바깥을 클릭/터치하면 닫힙니다.</p>
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

    const handlePointerDown = (e: PointerEvent) => {
      // 좌클릭/터치만 처리
      if (e.button !== 0) return;

      const target = e.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        onClose();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
    };
  }, [ref, active, onClose]);
}
