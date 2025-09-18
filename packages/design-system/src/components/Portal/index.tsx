import { type PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = PropsWithChildren<{
  /**
   * 포탈이 붙을 대상 노드
   * @default document.body
   *
   * - `container`가 지정되면 해당 DOM 노드에 children이 렌더링됩니다.
   * - 지정하지 않으면 기본적으로 `document.body`에 렌더링됩니다.
   * - SSR 환경에서 document가 존재하지 않을 수 있으므로,
   *   내부적으로 `mounted` 상태를 통해 브라우저 렌더링 이후에만 body를 안전하게 참조합니다.
   */
  container?: Element | DocumentFragment | null;
}>;

/**
 * @component Portal
 * @description
 * React Portal을 생성하는 범용 컴포넌트입니다.
 * 부모 DOM 트리와 분리된 다른 DOM 노드(예: `document.body`)에
 * React 요소(children)를 렌더링할 때 사용합니다.
 *
 * - **모달, 드롭다운, 툴팁, 토스트** 같은 컴포넌트가
 *   레이아웃/overflow/z-index의 영향을 받지 않고 독립적으로 렌더링되도록 도와줍니다.
 * - SSR 환경에서도 안전하게 동작할 수 있도록 `mounted` 상태를 통해
 *   클라이언트 렌더링 이후에만 포털을 생성합니다.
 *
 * @param {Element | DocumentFragment | null} [container=document.body]
 * 포탈이 붙을 대상 DOM 노드. 기본값은 `document.body`.
 * @param {React.ReactNode} children
 * 포탈로 렌더링할 React 요소.
 *
 * @example 기본 사용
 * ```tsx
 * <Portal>
 *   <div className="fixed inset-0 bg-black/50">모달 오버레이</div>
 * </Portal>
 * ```
 *
 * @example 특정 DOM 노드에 렌더링
 * ```tsx
 * const customRoot = document.getElementById('custom-root');
 *
 * <Portal container={customRoot}>
 *   <div className="p-4 bg-blue-500 text-white">커스텀 위치</div>
 * </Portal>
 * ```
 */
export function Portal({ container, children }: PortalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // container가 지정되면 그곳에 렌더링,
  // 지정되지 않았다면 mounted 상태일 때 document.body를 기본값으로 사용
  const target = container ?? (mounted ? document.body : null);

  // target이 존재할 때만 React Portal 생성
  return target ? createPortal(children, target) : null;
}
