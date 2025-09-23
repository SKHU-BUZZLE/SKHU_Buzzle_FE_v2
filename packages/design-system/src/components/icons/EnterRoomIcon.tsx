import { twMerge } from 'tailwind-merge';

/**
 * EnterRoomIcon
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
 * - 장식용이면 `aria-hidden`을 전달하세요: `<EnterRoomIcon aria-hidden />`
 * - 의미를 전달해야 하면 `aria-label`을 제공하세요: `<EnterRoomIcon aria-label="전체 카테고리" />`
 *
 * 사용 예
 * ```tsx
 * // 1) 장식용(스크린리더 숨김), 기본 32px
 * <EnterRoomIcon aria-hidden className="text-gray-800" />
 *
 * // 2) 의미 전달, 32px, 프라이머리 컬러
 * <EnterRoomIcon aria-label="전체 카테고리" className="text-primary-600" />
 *
 * // 3) 크기 오버라이드(24px), 회색
 * <EnterRoomIcon aria-hidden className="size-24 text-gray-500" />
 * ```
 *
 * @param {string} [className] Tailwind 유틸리티 클래스. 예: `"size-24 text-gray-900"`.
 * @param {React.SVGProps<SVGSVGElement>} [props] 표준 SVG 속성(onClick, aria-*, data-*, tabIndex 등).
 * @returns {JSX.Element} SVG 아이콘 요소.
 */
export default function EnterRoomIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-32', className)} // 기본 32px, 필요시 오버라이드
      fill='none'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M12 9.71431V16.5715M8.57143 13.1429H15.4286M10.8663 4.64802L5.152 7.91317C4.80199 8.11309 4.51108 8.40203 4.30877 8.75066C4.10645 9.09929 3.99993 9.49523 4 9.89831V17.7143C4 18.3205 4.24082 18.9019 4.66947 19.3306C5.09812 19.7592 5.67951 20 6.28571 20H17.7143C18.3205 20 18.9019 19.7592 19.3305 19.3306C19.7592 18.9019 20 18.3205 20 17.7143V9.89717C19.9999 9.49428 19.8933 9.09858 19.6909 8.75016C19.4886 8.40175 19.1978 8.113 18.848 7.91317L13.1337 4.64802C12.7884 4.45079 12.3977 4.34705 12 4.34705C11.6023 4.34705 11.2116 4.45079 10.8663 4.64802Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.7'
      />
    </svg>
  );
}

EnterRoomIcon.displayName = 'EnterRoomIcon';
