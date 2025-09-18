import { twMerge } from 'tailwind-merge';

/**
 * MoonIcon
 *
 * 달(🌙)을 나타내는 아이콘 컴포넌트입니다.
 * 다크 모드/라이트 모드 토글 버튼 등 테마 전환 UI에서 주로 활용할 수 있습니다.
 *
 * 크기 (Size)
 * - 기본 클래스에 `size-15`가 포함되어 **15px × 15px**로 렌더링됩니다. (프로젝트 spacing 규칙)
 * - 다른 크기가 필요하면 `className`으로 `size-*` 유틸리티를 덮어쓰세요. 예: `"size-20"`.
 *
 * 색상 (Color)
 * - `fill="currentColor"`로 동작하므로 Tailwind의 `text-*` 유틸리티로 색상을 제어합니다.
 *   예: `"text-gray-900"`, `"text-yellow-400"`, `"text-blue-500"`.
 *
 * 접근성 (A11y)
 * - 장식용이면 `aria-hidden`을 전달하세요: `<MoonIcon aria-hidden />`
 * - 의미를 전달해야 하면 `aria-label`을 제공하세요: `<MoonIcon aria-label="다크 모드" />`
 *
 * 사용 예
 * ```tsx
 * // 1) 장식용(스크린리더 숨김), 기본 15px
 * <MoonIcon aria-hidden className="text-gray-800" />
 *
 * // 2) 다크 모드 버튼, 의미 전달
 * <MoonIcon aria-label="다크 모드" className="text-yellow-400" />
 *
 * // 3) 크기 오버라이드(20px), 파란색
 * <MoonIcon aria-hidden className="size-20 text-blue-500" />
 * ```
 *
 * @param {string} [className] Tailwind 유틸리티 클래스. 예: `"size-20 text-gray-900"`.
 * @param {React.SVGProps<SVGSVGElement>} [props] 표준 SVG 속성(onClick, aria-*, data-*, tabIndex 등).
 * @returns {JSX.Element} SVG 아이콘 요소.
 */
export default function MoonIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-15', className)}
      fill='none'
      viewBox='0 0 15 15'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M7.49844 14.2751C5.54802 14.2751 3.89805 13.6 2.54851 12.25C1.19898 10.8999 0.523954 9.24997 0.523438 7.30007C0.523438 5.51757 1.10469 3.97067 2.26719 2.65937C3.42969 1.34807 4.9151 0.582888 6.72344 0.363821C6.89135 0.337988 7.0399 0.360722 7.16906 0.432022C7.29823 0.503321 7.40156 0.596838 7.47906 0.712571C7.55656 0.828305 7.59867 0.96393 7.60539 1.11945C7.6121 1.27496 7.56354 1.4235 7.45969 1.56507C7.2401 1.9009 7.07529 2.25611 6.96524 2.6307C6.85519 3.00528 6.80042 3.39924 6.80094 3.81257C6.80094 4.97507 7.20781 5.9632 8.02156 6.77695C8.83531 7.5907 9.82344 7.99757 10.9859 7.99757C11.3864 7.99757 11.7837 7.93945 12.1779 7.8232C12.5721 7.70695 12.924 7.54549 13.2334 7.33882C13.3755 7.2484 13.521 7.20655 13.6698 7.21327C13.8186 7.21999 13.9508 7.25538 14.0666 7.31945C14.1957 7.38403 14.296 7.4809 14.3673 7.61007C14.4386 7.73924 14.461 7.89424 14.4347 8.07507C14.2539 9.85757 13.4951 11.3365 12.1585 12.5119C10.8219 13.6874 9.26854 14.2751 7.49844 14.2751Z'
        fill='currentColor'
      />
    </svg>
  );
}

MoonIcon.displayName = 'MoonIcon';
