import { twMerge } from 'tailwind-merge';

/**
 * EconomyIcon
 *
 * 경제/사회(📈)를 나타내는 아이콘 컴포넌트입니다.
 * 카테고리 "경제/사회" 표시, 금융/산업/비즈니스 관련 콘텐츠에서 활용할 수 있습니다.
 *
 * 크기 (Size)
 * - 기본 클래스에 `size-32`가 포함되어 **32px × 32px** 정사각형으로 렌더링됩니다. (프로젝트 spacing 규칙)
 * - 다른 크기가 필요하면 `className`으로 `size-*` 유틸리티를 덮어쓰세요. 예: `"size-24"`, `"size-40"`.
 *
 * 색상 (Color)
 * - `stroke="currentColor"`로 동작하므로 Tailwind의 `text-*` 유틸리티로 선 색상을 제어합니다.
 *   예: `"text-gray-900"`, `"text-green-600"`.
 *
 * 접근성 (A11y)
 * - 장식용이면 `aria-hidden`을 전달하세요: `<EconomyIcon aria-hidden />`
 * - 의미를 전달해야 하면 `aria-label`을 제공하세요: `<EconomyIcon aria-label="경제/사회" />`
 *
 * 사용 예
 * ```tsx
 * // 1) 장식용(스크린리더 숨김), 기본 32px
 * <EconomyIcon aria-hidden className="text-gray-800" />
 *
 * // 2) 의미 전달, 32px, 초록색
 * <EconomyIcon aria-label="경제/사회" className="text-green-600" />
 *
 * // 3) 크기 오버라이드(24px), 회색
 * <EconomyIcon aria-hidden className="size-24 text-gray-500" />
 * ```
 *
 * @param {string} [className] Tailwind 유틸리티 클래스. 예: `"size-24 text-green-600"`.
 * @param {React.SVGProps<SVGSVGElement>} [props] 표준 SVG 속성(onClick, aria-*, data-*, tabIndex 등).
 * @returns {JSX.Element} SVG 아이콘 요소.
 */
export default function EconomyIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-32', className)}
      fill='none'
      viewBox='0 0 32 33'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M20.5902 16.0848L28.4302 12.6197V30.1557H20.5902V16.0848ZM20.5902 16.0848L15.6896 18.6837L10.7891 11.7534V30.1511H20.5902V16.0848Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2.2'
      />
      <path
        d='M30.3781 3.34888L17.9461 11.294L12.2318 4.61288L2.00781 9.86545M2.94953 15.2186L10.7895 11.7534V30.1535H2.94953V15.2186Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2.2'
      />
      <path
        d='M24.1973 2.2998L30.3755 3.32838L29.347 9.50895'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2.2'
      />
    </svg>
  );
}

EconomyIcon.displayName = 'EconomyIcon';
