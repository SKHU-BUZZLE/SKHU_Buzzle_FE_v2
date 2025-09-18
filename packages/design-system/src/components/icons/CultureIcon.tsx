import { twMerge } from 'tailwind-merge';

/**
 * CultureIcon
 *
 * 문화/예술(🎨)을 나타내는 아이콘 컴포넌트입니다.
 * 카테고리 "문화/예술" 표시, 전시/공연/창작 활동 관련 콘텐츠에서 활용할 수 있습니다.
 *
 * 크기 (Size)
 * - 기본 클래스에 `size-32`가 포함되어 **32px × 32px** 정사각형으로 렌더링됩니다. (프로젝트 spacing 규칙)
 * - 다른 크기가 필요하면 `className`으로 `size-*` 유틸리티를 덮어쓰세요. 예: `"size-24"`, `"size-40"`.
 *
 * 색상 (Color)
 * - `stroke="currentColor"`로 동작하므로 Tailwind의 `text-*` 유틸리티로 선 색상을 제어합니다.
 *   예: `"text-gray-900"`, `"text-purple-600"`.
 *
 * 접근성 (A11y)
 * - 장식용이면 `aria-hidden`을 전달하세요: `<CultureIcon aria-hidden />`
 * - 의미를 전달해야 하면 `aria-label`을 제공하세요: `<CultureIcon aria-label="문화/예술" />`
 *
 * 사용 예
 * ```tsx
 * // 1) 장식용(스크린리더 숨김), 기본 32px
 * <CultureIcon aria-hidden className="text-gray-800" />
 *
 * // 2) 의미 전달, 32px, 보라색
 * <CultureIcon aria-label="문화/예술" className="text-purple-600" />
 *
 * // 3) 크기 오버라이드(24px), 회색
 * <CultureIcon aria-hidden className="size-24 text-gray-500" />
 * ```
 *
 * @param {string} [className] Tailwind 유틸리티 클래스. 예: `"size-24 text-purple-600"`.
 * @param {React.SVGProps<SVGSVGElement>} [props] 표준 SVG 속성(onClick, aria-*, data-*, tabIndex 등).
 * @returns {JSX.Element} SVG 아이콘 요소.
 */
export default function CultureIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-32', className)}
      fill='none'
      viewBox='0 0 32 33'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M12.7074 22.246C12.3586 21.3861 11.7217 20.6742 10.9057 20.2323C10.0897 19.7903 9.14541 19.6459 8.23461 19.8236C7.32381 20.0014 6.50315 20.4903 5.91319 21.2066C5.32322 21.9229 5.00067 22.822 5.00078 23.75C5.00078 24.1608 4.91641 24.5673 4.75289 24.9441C4.58937 25.321 4.35019 25.6603 4.05017 25.9409C3.75016 26.2216 3.3957 26.4376 3.00877 26.5756C2.62184 26.7136 2.21068 26.7707 1.80078 26.7434C2.46004 27.8886 3.47896 28.7842 4.69935 29.2911C5.91973 29.798 7.27332 29.8878 8.54998 29.5466C9.82664 29.2054 10.9549 28.4522 11.7597 27.4041C12.5645 26.356 13.0008 25.0715 13.0008 23.75C13.0008 23.218 12.8968 22.71 12.7074 22.246ZM12.7074 22.246C14.2928 21.7058 15.809 20.9808 17.2248 20.086M10.5008 20.0527C11.0411 18.464 11.767 16.9446 12.6634 15.526M17.2234 20.086C19.7518 18.4883 21.9159 16.3769 23.5754 13.8887L28.7434 6.13668C28.9414 5.84143 29.0308 5.48661 28.9962 5.13281C28.9617 4.77901 28.8054 4.44818 28.554 4.19681C28.3026 3.94545 27.9718 3.78914 27.618 3.75458C27.2642 3.72003 26.9094 3.80937 26.6141 4.00735L18.8621 9.17668C16.3734 10.836 14.2615 13.0002 12.6634 15.5287C14.6924 16.4364 16.3157 18.0598 17.2234 20.0887'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2.2'
      />
    </svg>
  );
}

CultureIcon.displayName = 'CultureIcon';
