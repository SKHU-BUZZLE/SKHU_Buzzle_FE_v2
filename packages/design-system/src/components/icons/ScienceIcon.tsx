import { twMerge } from 'tailwind-merge';

/**
 * ScienceIcon
 *
 * 과학/기술(🔬)을 나타내는 아이콘 컴포넌트입니다.
 * 카테고리 "과학/기술" 표시, 실험/연구/기술 관련 콘텐츠에서 활용할 수 있습니다.
 *
 * 크기 (Size)
 * - 기본 클래스에 `size-32`가 포함되어 **32px × 32px** 정사각형으로 렌더링됩니다. (프로젝트 spacing 규칙)
 * - 다른 크기가 필요하면 `className`으로 `size-*` 유틸리티를 덮어쓰세요. 예: `"size-24"`, `"size-40"`.
 *
 * 색상 (Color)
 * - `fill="currentColor"`로 동작하므로 Tailwind의 `text-*` 유틸리티로 채우기 색상을 제어합니다.
 *   예: `"text-gray-900"`, `"text-blue-600"`.
 *
 * 접근성 (A11y)
 * - 장식용이면 `aria-hidden`을 전달하세요: `<ScienceIcon aria-hidden />`
 * - 의미를 전달해야 하면 `aria-label`을 제공하세요: `<ScienceIcon aria-label="과학/기술" />`
 *
 * 사용 예
 * ```tsx
 * // 1) 장식용(스크린리더 숨김), 기본 32px
 * <ScienceIcon aria-hidden className="text-gray-800" />
 *
 * // 2) 의미 전달, 32px, 파란색
 * <ScienceIcon aria-label="과학/기술" className="text-blue-600" />
 *
 * // 3) 크기 오버라이드(24px), 회색
 * <ScienceIcon aria-hidden className="size-24 text-gray-500" />
 * ```
 *
 * @param {string} [className] Tailwind 유틸리티 클래스. 예: `"size-24 text-blue-600"`.
 * @param {React.SVGProps<SVGSVGElement>} [props] 표준 SVG 속성(onClick, aria-*, data-*, tabIndex 등).
 * @returns {JSX.Element} SVG 아이콘 요소.
 */
export default function ScienceIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-32', className)}
      fill='none'
      viewBox='0 0 32 33'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M6.66668 28.75C5.53335 28.75 4.72802 28.2447 4.25068 27.234C3.77335 26.2233 3.8898 25.2842 4.60002 24.4167L12 15.4167V7.41667H10.6667C10.2889 7.41667 9.97246 7.28867 9.71735 7.03267C9.46224 6.77667 9.33424 6.46022 9.33335 6.08333C9.33246 5.70644 9.46046 5.39 9.71735 5.134C9.97424 4.878 10.2907 4.75 10.6667 4.75H21.3334C21.7111 4.75 22.028 4.878 22.284 5.134C22.54 5.39 22.6676 5.70644 22.6667 6.08333C22.6658 6.46022 22.5378 6.77711 22.2827 7.034C22.0276 7.29089 21.7111 7.41844 21.3334 7.41667H20V15.4167L27.4 24.4167C28.1111 25.2833 28.228 26.2224 27.7507 27.234C27.2734 28.2456 26.4676 28.7509 25.3334 28.75H6.66668ZM6.66668 26.0833H25.3334L17.3334 16.35V7.41667H14.6667V16.35L6.66668 26.0833Z'
        fill='currentColor'
      />
    </svg>
  );
}

ScienceIcon.displayName = 'ScienceIcon';
