import type React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * @interface OverlayProps
 * @description
 * Overlay(전체 화면 배경 레이어)의 속성 정의
 *
 * @extends React.HTMLAttributes<HTMLDivElement>
 * - 표준 div 속성(className, style, onClick, aria-*, data-* 등)을 모두 상속합니다.
 *
 * @property {string} [className]
 *   Tailwind 등으로 스타일을 확장할 때 사용합니다.
 *   기본값(`fixed inset-0 z-65 bg-black/50`)과 병합되며,
 *   중복/충돌 클래스는 twMerge 규칙에 따라 정리됩니다.
 *
 * @property {React.Ref<HTMLDivElement>} [ref]
 *   외부에서 Overlay의 DOM 노드를 참조할 수 있는 ref입니다.
 */
export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * @component Overlay
 * @description
 * 화면 전체를 덮는 **반투명 배경 레이어**입니다.
 * - 모달/드로어/팝오버 등 레이어드 UI에서 배경과의 분리를 위해 사용합니다.
 * - 기본 스타일: `fixed inset-0 z-65 bg-black-900/50`
 *   (화면 전체 덮기 + 높은 z-index + 검정 50% 투명도)
 * - 접근성: 정보성 역할이 없으므로 기본 `aria-hidden="true"`
 *
 * @example 기본 사용
 * ```tsx
 * <Overlay onClick={onClose} />
 * ```
 *
 * @example 애니메이션
 * ```tsx
 * <Overlay
 *   data-state={open ? 'open' : 'closed'}
 *   className="transition-opacity duration-200
 *              data-[state=open]:opacity-100
 *              data-[state=closed]:opacity-0"
 *   onClick={onClose}
 * />
 * ```
 */
export default function Overlay({ className, ref, ...props }: OverlayProps) {
  return (
    <div ref={ref} aria-hidden='true' className={twMerge('bg-black-900/50 fixed inset-0 z-65', className)} {...props} />
  );
}
