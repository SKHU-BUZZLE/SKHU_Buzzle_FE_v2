import { twMerge } from 'tailwind-merge';

/**
 * SportsIcon
 *
 * 스포츠(⚽)를 나타내는 아이콘 컴포넌트입니다.
 * 카테고리 "스포츠" 표시, 경기/운동/레저 관련 콘텐츠에서 활용할 수 있습니다.
 *
 * 크기 (Size)
 * - 기본 클래스에 `size-32`가 포함되어 **32px × 32px** 정사각형으로 렌더링됩니다. (프로젝트 spacing 규칙)
 * - 다른 크기가 필요하면 `className`으로 `size-*` 유틸리티를 덮어쓰세요. 예: `"size-24"`, `"size-40"`.
 *
 * 색상 (Color)
 * - `fill="currentColor"`로 동작하므로 Tailwind의 `text-*` 유틸리티로 채우기 색상을 제어합니다.
 *   예: `"text-gray-900"`, `"text-green-600"`.
 *
 * 접근성 (A11y)
 * - 장식용이면 `aria-hidden`을 전달하세요: `<SportsIcon aria-hidden />`
 * - 의미를 전달해야 하면 `aria-label`을 제공하세요: `<SportsIcon aria-label="스포츠" />`
 *
 * 사용 예
 * ```tsx
 * // 1) 장식용(스크린리더 숨김), 기본 32px
 * <SportsIcon aria-hidden className="text-gray-800" />
 *
 * // 2) 의미 전달, 32px, 초록색
 * <SportsIcon aria-label="스포츠" className="text-green-600" />
 *
 * // 3) 크기 오버라이드(24px), 회색
 * <SportsIcon aria-hidden className="size-24 text-gray-500" />
 * ```
 *
 * @param {string} [className] Tailwind 유틸리티 클래스. 예: `"size-24 text-green-600"`.
 * @param {React.SVGProps<SVGSVGElement>} [props] 표준 SVG 속성(onClick, aria-*, data-*, tabIndex 등).
 * @returns {JSX.Element} SVG 아이콘 요소.
 */
export default function SportsIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-32', className)}
      fill='none'
      viewBox='0 0 32 33'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M3 16.25C3 12.8022 4.36964 9.49559 6.80761 7.05761C9.24559 4.61964 12.5522 3.25 16 3.25C19.4478 3.25 22.7544 4.61964 25.1924 7.05761C27.6304 9.49559 29 12.8022 29 16.25C29 19.6978 27.6304 23.0044 25.1924 25.4424C22.7544 27.8804 19.4478 29.25 16 29.25C12.5522 29.25 9.24559 27.8804 6.80761 25.4424C4.36964 23.0044 3 19.6978 3 16.25ZM11.286 6.31C9.82624 7.00275 8.53702 8.00859 7.51 9.256L8.804 13.464L10.816 14.134L15 10.954V8.786L11.286 6.31ZM5.072 17.518C5.272 19.248 5.872 20.858 6.778 22.248H10.586L11.856 20.978L10.21 16.038L8.162 15.356L5.072 17.518ZM13.772 27.022C15.2418 27.326 16.7582 27.326 18.228 27.022L19.808 23.47L18.586 22.25H13.414L12.194 23.47L13.772 27.022ZM25.22 22.25C26.1165 20.8718 26.6926 19.3102 26.906 17.68L23.82 15.364L21.79 16.04L20.144 20.98L21.414 22.25H25.22ZM24.46 9.224C23.4379 7.99071 22.1587 6.99552 20.712 6.308L17 8.786V10.954L21.184 14.134L23.192 13.466L24.46 9.224Z'
        fill='currentColor'
      />
    </svg>
  );
}

SportsIcon.displayName = 'SportsIcon';
