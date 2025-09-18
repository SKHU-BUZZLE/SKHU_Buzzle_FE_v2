import { twMerge } from 'tailwind-merge';

/**
 * LoaderIcon
 *
 * 로딩 중을 나타내는 로더 아이콘 컴포넌트입니다.
 *
 * 크기 (Size)
 * - 기본 클래스에 `size-18`이 포함되어 **18px × 18px**로 렌더링됩니다.
 * - 필요 시 `className`을 통해 `size-*` 유틸리티로 크기를 덮어쓸 수 있습니다. 예: `"size-20"`.
 *
 * 색상 (Color)
 * - `stroke="currentColor"` 속성을 사용하므로 Tailwind `text-*` 유틸리티로 선 색상을 제어합니다.
 *   예: `"text-gray-800"`, `"text-red-500"`.
 *
 * 접근성 (A11y)
 * - 장식용이면 `aria-hidden`을 전달하세요: `<LoaderIcon aria-hidden />`
 * - 의미를 전달해야 하면 `aria-label`을 제공하세요: `<LoaderIcon aria-label="로그아웃" />`
 *
 * 사용 예
 * ```tsx
 * // 1) 장식용 (스크린리더 숨김)
 * <LoaderIcon aria-hidden className="text-gray-600" />
 *
 * // 2) 로그아웃 버튼과 함께 사용
 * <button aria-label="로그아웃">
 *   <LoaderIcon className="text-red-500" />
 * </button>
 *
 * // 3) 크기 오버라이드 (20px)
 * <LoaderIcon aria-hidden className="size-20 text-gray-700" />
 * ```
 *
 * @param {string} [className] Tailwind 유틸리티 클래스. 예: `"size-20 text-gray-500"`.
 * @param {React.SVGProps<SVGSVGElement>} [props] 표준 SVG 속성(onClick, aria-*, data-* 등).
 * @returns {JSX.Element} SVG 아이콘 요소.
 */
export default function LoaderIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-18', className)}
      fill='none'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M12 3C10.22 3 8.47991 3.52784 6.99987 4.51677C5.51983 5.50571 4.36628 6.91131 3.68509 8.55585C3.0039 10.2004 2.82567 12.01 3.17294 13.7558C3.5202 15.5016 4.37737 17.1053 5.63604 18.364C6.89472 19.6226 8.49836 20.4798 10.2442 20.8271C11.99 21.1743 13.7996 20.9961 15.4442 20.3149C17.0887 19.6337 18.4943 18.4802 19.4832 17.0001C20.4722 15.5201 21 13.78 21 12'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  );
}

LoaderIcon.displayName = 'LoaderIcon';
