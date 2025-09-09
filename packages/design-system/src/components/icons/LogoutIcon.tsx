import { twMerge } from 'tailwind-merge';

/**
 * LogoutIcon
 *
 * 로그아웃(나가기) 동작을 나타내는 아이콘 컴포넌트입니다.
 * 주로 내비게이션 메뉴, 사용자 계정 메뉴, 헤더/푸터 영역에서 로그아웃 버튼과 함께 사용됩니다.
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
 * - 장식용이면 `aria-hidden`을 전달하세요: `<LogoutIcon aria-hidden />`
 * - 의미를 전달해야 하면 `aria-label`을 제공하세요: `<LogoutIcon aria-label="로그아웃" />`
 *
 * 사용 예
 * ```tsx
 * // 1) 장식용 (스크린리더 숨김)
 * <LogoutIcon aria-hidden className="text-gray-600" />
 *
 * // 2) 로그아웃 버튼과 함께 사용
 * <button aria-label="로그아웃">
 *   <LogoutIcon className="text-red-500" />
 * </button>
 *
 * // 3) 크기 오버라이드 (20px)
 * <LogoutIcon aria-hidden className="size-20 text-gray-700" />
 * ```
 *
 * @param {string} [className] Tailwind 유틸리티 클래스. 예: `"size-20 text-gray-500"`.
 * @param {React.SVGProps<SVGSVGElement>} [props] 표준 SVG 속성(onClick, aria-*, data-* 등).
 * @returns {JSX.Element} SVG 아이콘 요소.
 */
export default function LogoutIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-18', className)}
      fill='none'
      viewBox='0 0 18 18'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M14.2807 9.00022H7.49697M12.8526 11.1424L14.9948 9.00022L12.8526 6.85798M9.28216 5.42983V4.71575C9.28216 4.33698 9.1317 3.97373 8.86387 3.70589C8.59604 3.43806 8.23278 3.2876 7.85401 3.2876H4.28362C3.90485 3.2876 3.5416 3.43806 3.27377 3.70589C3.00593 3.97373 2.85547 4.33698 2.85547 4.71575V13.2847C2.85547 13.6634 3.00593 14.0267 3.27377 14.2945C3.5416 14.5624 3.90485 14.7128 4.28362 14.7128H7.85401C8.23278 14.7128 8.59604 14.5624 8.86387 14.2945C9.1317 14.0267 9.28216 13.6634 9.28216 13.2847V12.5706'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.6'
      />
    </svg>
  );
}

LogoutIcon.displayName = 'LogoutIcon';
