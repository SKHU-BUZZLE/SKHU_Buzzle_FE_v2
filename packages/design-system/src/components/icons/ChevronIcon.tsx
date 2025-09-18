import { twMerge } from 'tailwind-merge';

/**
 * ChevronIcon
 *
 * 좌/우/상/하 방향을 나타낼 때 사용하는 기본 체브론(꺾쇠) 아이콘 컴포넌트입니다.
 * 드롭다운, 아코디언, 네비게이션, 페이지 이동 버튼 등에 활용할 수 있습니다.
 *
 * 크기 (Size)
 * - 기본 클래스에 `size-24`가 포함되어 **24px × 24px**로 렌더링됩니다.
 * - 필요 시 `className`으로 `size-*` 유틸리티를 덮어쓸 수 있습니다. 예: `"size-20"`.
 *
 * 색상 (Color)
 * - `stroke="currentColor"` 속성을 사용하므로 Tailwind `text-*` 유틸리티로 색상을 제어합니다.
 *   예: `"text-gray-800"`, `"text-primary-500"`.
 *
 * 방향 (Direction)
 * - 기본은 **왼쪽**을 가리키는 아이콘입니다.
 * - 회전을 통해 다른 방향으로 변형할 수 있습니다:
 *   - 오른쪽: `"rotate-180"`
 *   - 위쪽: `"-rotate-90"`
 *   - 아래쪽: `"rotate-90"`
 *
 * 접근성 (A11y)
 * - 장식용이면 `aria-hidden`을 전달하세요: `<ChevronIcon aria-hidden />`
 * - 의미 전달 시 `aria-label`을 제공합니다: `<ChevronIcon aria-label="이전" />`
 *
 * 사용 예
 * ```tsx
 * // 1) 장식용 (스크린리더 숨김)
 * <ChevronIcon aria-hidden className="text-gray-500" />
 *
 * // 2) 드롭다운 토글 (아래쪽)
 * <ChevronIcon aria-hidden className="rotate-90 text-gray-700" />
 *
 * // 3) 의미 전달 (이전 페이지)
 * <ChevronIcon aria-label="이전" className="text-black" />
 * ```
 *
 * @param {string} [className] Tailwind 유틸리티 클래스. 예: `"rotate-180 text-gray-700"`.
 * @param {React.SVGProps<SVGSVGElement>} [props] 표준 SVG 속성(onClick, aria-*, data-* 등).
 * @returns {JSX.Element} SVG 아이콘 요소.
 */
export default function ChevronIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-24', className)}
      fill='none'
      viewBox='0 0 24 25'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M15 6.5L9 12.5L15 18.5'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  );
}

ChevronIcon.displayName = 'ChevronIcon';
