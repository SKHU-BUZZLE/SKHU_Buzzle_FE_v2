import { twMerge } from 'tailwind-merge';

/**
 * HistoryIcon
 *
 * 역사(🏛️)를 나타내는 아이콘 컴포넌트입니다.
 * 카테고리 "역사" 표시, 유적/문화재/과거 사건 관련 콘텐츠에서 활용할 수 있습니다.
 *
 * 크기 (Size)
 * - 기본 클래스에 `size-32`가 포함되어 **32px × 32px** 정사각형으로 렌더링됩니다. (프로젝트 spacing 규칙)
 * - 다른 크기가 필요하면 `className`으로 `size-*` 유틸리티를 덮어쓰세요. 예: `"size-24"`, `"size-40"`.
 *
 * 색상 (Color)
 * - `stroke="currentColor"`로 동작하므로 Tailwind의 `text-*` 유틸리티로 선 색상을 제어합니다.
 *   예: `"text-gray-900"`, `"text-yellow-700"`.
 *
 * 접근성 (A11y)
 * - 장식용이면 `aria-hidden`을 전달하세요: `<HistoryIcon aria-hidden />`
 * - 의미를 전달해야 하면 `aria-label`을 제공하세요: `<HistoryIcon aria-label="역사" />`
 *
 * 사용 예
 * ```tsx
 * // 1) 장식용(스크린리더 숨김), 기본 32px
 * <HistoryIcon aria-hidden className="text-gray-800" />
 *
 * // 2) 의미 전달, 32px, 황토색
 * <HistoryIcon aria-label="역사" className="text-yellow-700" />
 *
 * // 3) 크기 오버라이드(24px), 회색
 * <HistoryIcon aria-hidden className="size-24 text-gray-500" />
 * ```
 *
 * @param {string} [className] Tailwind 유틸리티 클래스. 예: `"size-24 text-yellow-700"`.
 * @param {React.SVGProps<SVGSVGElement>} [props] 표준 SVG 속성(onClick, aria-*, data-*, tabIndex 등).
 * @returns {JSX.Element} SVG 아이콘 요소.
 */
export default function HistoryIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-32', className)}
      fill='none'
      viewBox='0 0 32 33'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M13.9993 8.25L25.3327 28.25H2.66602L13.9993 8.25Z'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='2.2'
      />
      <path
        d='M24.3327 28.25H29.3327L23.9993 18.9167L21.9993 22.25M13.9993 8.25L8.66602 28.25'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2.2'
      />
    </svg>
  );
}

HistoryIcon.displayName = 'HistoryIcon';
