import { twMerge } from 'tailwind-merge';

/**
 * CreateRoomIcon
 *
 * 책(📚)을 나타내는 아이콘 컴포넌트입니다.
 * 카테고리 "전체" 표시, 독서/학습 관련 메뉴, 콘텐츠 분류 아이콘 등에서 활용할 수 있습니다.
 *
 * 크기 (Size)
 * - 기본 클래스에 `size-32`가 포함되어 **32px × 32px** 정사각형으로 렌더링됩니다. (프로젝트 spacing 규칙)
 * - 다른 크기가 필요하면 `className`으로 `size-*` 유틸리티를 덮어쓰세요. 예: `"size-24"`, `"size-40"`.
 *
 * 색상 (Color)
 * - `fill="currentColor"`와 `stroke="currentColor"`로 동작하므로 Tailwind의 `text-*` 유틸리티로 색상을 제어합니다.
 *   예: `"text-gray-900"`, `"text-primary-600"`.
 *
 * 접근성 (A11y)
 * - 장식용이면 `aria-hidden`을 전달하세요: `<CreateRoomIcon aria-hidden />`
 * - 의미를 전달해야 하면 `aria-label`을 제공하세요: `<CreateRoomIcon aria-label="전체 카테고리" />`
 *
 * 사용 예
 * ```tsx
 * // 1) 장식용(스크린리더 숨김), 기본 32px
 * <CreateRoomIcon aria-hidden className="text-gray-800" />
 *
 * // 2) 의미 전달, 32px, 프라이머리 컬러
 * <CreateRoomIcon aria-label="전체 카테고리" className="text-primary-600" />
 *
 * // 3) 크기 오버라이드(24px), 회색
 * <CreateRoomIcon aria-hidden className="size-24 text-gray-500" />
 * ```
 *
 * @param {string} [className] Tailwind 유틸리티 클래스. 예: `"size-24 text-gray-900"`.
 * @param {React.SVGProps<SVGSVGElement>} [props] 표준 SVG 속성(onClick, aria-*, data-*, tabIndex 등).
 * @returns {JSX.Element} SVG 아이콘 요소.
 */
export default function CreateRoomIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-32', className)} // 기본 크기 32px, 필요시 오버라이드
      fill='none'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M12.2004 4H5.40039V19.2'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.6'
      />
      <path d='M2.5 20H20' stroke='currentColor' strokeLinecap='round' strokeWidth='1.6' />
      <path
        d='M17.4006 12.4V19.6M20.8006 7.00002H14.6006M14.6006 7.00002L17.2006 4.40002M14.6006 7.00002L17.2006 9.60002'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.6'
      />
      <circle cx='14.0008' cy='12.4' fill='currentColor' r='1.2' />
    </svg>
  );
}

CreateRoomIcon.displayName = 'CreateRoomIcon';
