import { twMerge } from 'tailwind-merge';

/**
 * NoteIcon
 *
 * 노트(메모, 기록, 오답노트 등)를 나타내는 아이콘 컴포넌트입니다.
 * 학습 기록, 노트, 오답 관리 같은 UI에서 활용할 수 있습니다.
 *
 * 크기 (Size)
 * - 기본 클래스에 `size-22`가 포함되어 **22px × 22px**로 렌더링됩니다. (프로젝트 spacing 규칙)
 * - 다른 크기가 필요하면 `className`으로 `size-*` 유틸리티를 덮어쓰세요. 예: `"size-20"`.
 *
 * 색상 (Color)
 * - `stroke="currentColor"`로 동작하므로 Tailwind의 `text-*` 유틸리티로 선 색상을 제어합니다.
 *   예: `"text-gray-900"`, `"text-primary-600"`.
 *
 * 접근성 (A11y)
 * - 장식용이면 `aria-hidden`을 전달하세요: `<NoteIcon aria-hidden />`
 * - 의미를 전달해야 하면 `aria-label`을 제공하세요: `<NoteIcon aria-label="노트" />`
 *
 * 사용 예
 * ```tsx
 * // 1) 장식용(스크린리더 숨김), 기본 22px
 * <NoteIcon aria-hidden className="text-gray-800" />
 *
 * // 2) 의미 전달, 22px, 프라이머리 컬러
 * <NoteIcon aria-label="노트" className="text-primary-600" />
 *
 * // 3) 크기 오버라이드(20px), 회색 500
 * <NoteIcon aria-hidden className="size-20 text-gray-500" />
 * ```
 *
 * @param {string} [className] Tailwind 유틸리티 클래스. 예: `"size-20 text-gray-900"`.
 * @param {React.SVGProps<SVGSVGElement>} [props] 표준 SVG 속성(onClick, aria-*, data-*, tabIndex 등).
 * @returns {JSX.Element} SVG 아이콘 요소.
 */
export default function NoteIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-22', className)}
      fill='none'
      viewBox='0 0 22 22'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M11.8801 6.01698L16.6541 7.28798M10.8581 9.81298L13.2441 10.449M10.9771 16.966L11.9311 17.221C14.6311 17.941 15.9811 18.3 17.0451 17.689C18.1081 17.079 18.4701 15.736 19.1931 13.052L20.2161 9.25498C20.9401 6.56998 21.3011 5.22799 20.6871 4.16999C20.0731 3.11199 18.7241 2.75298 16.0231 2.03398L15.0691 1.77898C12.3691 1.05898 11.0191 0.699985 9.95611 1.31098C8.89211 1.92099 8.53011 3.26398 7.80611 5.94798L6.78411 9.74498C6.06011 12.43 5.69811 13.772 6.31311 14.83C6.92711 15.887 8.27711 16.247 10.9771 16.966Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='1.5'
      />
      <path
        d='M11 19.9459L10.048 20.2059C7.35403 20.9389 6.00803 21.3059 4.94603 20.6829C3.88603 20.0609 3.52403 18.6919 2.80303 15.9549L1.78203 12.0829C1.06003 9.34591 0.699027 7.97691 1.31203 6.89891C1.84203 5.96591 3.00003 5.99991 4.50003 5.99991'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='1.5'
      />
    </svg>
  );
}

NoteIcon.displayName = 'NoteIcon';
