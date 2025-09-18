import { twMerge } from 'tailwind-merge';

/**
 * RankingIcon
 *
 * 랭킹(순위, 차트, 리더보드)을 나타내는 아이콘 컴포넌트입니다.
 * 성과, 순위표, 통계와 관련된 UI에서 활용할 수 있습니다.
 *
 * 크기 (Size)
 * - 기본 클래스에 `size-22`가 포함되어 **22px × 22px**로 렌더링됩니다. (프로젝트 spacing 규칙)
 * - 다른 크기가 필요하면 `className`으로 `size-*` 유틸리티를 덮어쓰세요. 예: `"size-24"`.
 *
 * 색상 (Color)
 * - `stroke="currentColor"`로 동작하므로 Tailwind의 `text-*` 유틸리티로 선 색상을 제어합니다.
 *   예: `"text-gray-900"`, `"text-primary-600"`.
 *
 * 접근성 (A11y)
 * - 장식용이면 `aria-hidden`을 전달하세요: `<RankingIcon aria-hidden />`
 * - 의미를 전달해야 하면 `aria-label`을 제공하세요: `<RankingIcon aria-label="랭킹" />`
 *
 * 사용 예
 * ```tsx
 * // 1) 장식용(스크린리더 숨김), 기본 22px
 * <RankingIcon aria-hidden className="text-gray-800" />
 *
 * // 2) 의미 전달, 22px, 프라이머리 컬러
 * <RankingIcon aria-label="랭킹" className="text-primary-600" />
 *
 * // 3) 크기 오버라이드(24px), 회색 500
 * <RankingIcon aria-hidden className="size-24 text-gray-500" />
 * ```
 *
 * @param {string} [className] Tailwind 유틸리티 클래스. 예: `"size-24 text-gray-900"`.
 * @param {React.SVGProps<SVGSVGElement>} [props] 표준 SVG 속성(onClick, aria-*, data-*, tabIndex 등).
 * @returns {JSX.Element} SVG 아이콘 요소.
 */
export default function RankingIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-22', className)}
      fill='none'
      viewBox='0 0 22 22'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M8 21V16C8 15.057 8 14.586 7.707 14.293C7.414 14 6.943 14 6 14H5.5C4.085 14 3.378 14 2.94 14.44C2.5 14.879 2.5 15.586 2.5 17V21H8ZM8 21H14M8 21V15C8 13.586 8 12.879 8.44 12.44C8.878 12 9.585 12 11 12C12.415 12 13.121 12 13.56 12.44C14 12.879 14 13.586 14 15V21M14 21H19.5V19C19.5 17.586 19.5 16.879 19.06 16.44C18.621 16 17.914 16 16.5 16H16C15.057 16 14.586 16 14.293 16.293C14 16.586 14 17.057 14 18V21ZM1 21H21M11.691 1.57801L12.395 2.99801C12.4547 3.10441 12.5362 3.19705 12.634 3.26992C12.7319 3.3428 12.844 3.39428 12.963 3.42101L14.239 3.63401C15.055 3.77101 15.247 4.36801 14.659 4.95701L13.667 5.95701C13.58 6.05546 13.5162 6.17211 13.4802 6.29843C13.4443 6.42475 13.437 6.55752 13.459 6.68701L13.743 7.92501C13.967 8.90501 13.451 9.28401 12.591 8.77201L11.395 8.05801C11.2726 7.99454 11.1368 7.96141 10.999 7.96141C10.8612 7.96141 10.7254 7.99454 10.603 8.05801L9.407 8.77201C8.551 9.28401 8.031 8.90101 8.255 7.92501L8.539 6.68701C8.56101 6.55752 8.55375 6.42475 8.51775 6.29843C8.48176 6.17211 8.41795 6.05546 8.331 5.95701L7.34 4.95701C6.756 4.36801 6.944 3.77101 7.76 3.63401L9.035 3.42101C9.15341 3.39365 9.26477 3.34178 9.36191 3.26876C9.45906 3.19573 9.53982 3.10316 9.599 2.99701L10.303 1.57701C10.687 0.807012 11.311 0.807012 11.691 1.57701'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
      />
    </svg>
  );
}

RankingIcon.displayName = 'RankingIcon';
