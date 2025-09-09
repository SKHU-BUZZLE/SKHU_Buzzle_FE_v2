import { twMerge } from 'tailwind-merge';

/**
 * HeartIcon
 *
 * 하트(좋아요, 즐겨찾기, 생명)를 나타내는 아이콘 컴포넌트입니다.
 * 좋아요 버튼, 즐겨찾기, 생명 표시 등 감정/생명 표현 UI에서 활용할 수 있습니다.
 *
 * 크기 (Size)
 * - 기본 클래스에 `size-16`이 포함되어 **16px × 16px**로 렌더링됩니다. (프로젝트 spacing 규칙)
 * - 다른 크기가 필요하면 `className`으로 `size-*` 유틸리티를 덮어쓰세요. 예: `"size-20"`.
 *
 * 색상 (Color)
 * - `fill="currentColor"`로 동작하므로 Tailwind의 `text-*` 유틸리티로 채우기 색상을 제어합니다.
 *   예: `"text-red-500"`, `"text-gray-400"`.
 *
 * 접근성 (A11y)
 * - 장식용이면 `aria-hidden`을 전달하세요: `<HeartIcon aria-hidden />`
 * - 의미를 전달해야 하면 `aria-label`을 제공하세요: `<HeartIcon aria-label="좋아요" />`
 *
 * 사용 예
 * ```tsx
 * // 1) 장식용(스크린리더 숨김), 기본 16px
 * <HeartIcon aria-hidden className="text-gray-400" />
 *
 * // 2) 의미 전달, 16px, 빨간색
 * <HeartIcon aria-label="좋아요" className="text-red-500" />
 *
 * // 3) 크기 오버라이드(20px), 회색
 * <HeartIcon aria-hidden className="size-20 text-gray-500" />
 * ```
 *
 * @param {string} [className] Tailwind 유틸리티 클래스. 예: `"size-20 text-red-500"`.
 * @param {React.SVGProps<SVGSVGElement>} [props] 표준 SVG 속성(onClick, aria-*, data-*, tabIndex 등).
 * @returns {JSX.Element} SVG 아이콘 요소.
 */
export default function HeartIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-16', className)}
      fill='none'
      viewBox='0 0 16 15'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M4.2341 0.805387C4.8979 0.692286 5.57861 0.729595 6.22607 0.914565C6.87353 1.09953 7.47123 1.42745 7.9751 1.87414L8.00285 1.89889L8.02835 1.87639C8.50925 1.45436 9.07462 1.13973 9.68673 0.953499C10.2989 0.767264 10.9436 0.713702 11.5781 0.796387L11.7626 0.823387C12.5623 0.961469 13.3098 1.31325 13.9259 1.84149C14.5421 2.36972 15.0039 3.05475 15.2624 3.82401C15.521 4.59328 15.5667 5.41816 15.3948 6.21129C15.2228 7.00442 14.8396 7.73629 14.2856 8.32939L14.1506 8.46814L14.1146 8.49889L8.5271 14.0331C8.39816 14.1608 8.22733 14.2373 8.04626 14.2486C7.8652 14.2599 7.68617 14.2052 7.54235 14.0946L7.47185 14.0331L1.8521 8.46664C1.25677 7.88738 0.833376 7.15465 0.62882 6.34959C0.424265 5.54453 0.446527 4.69856 0.69314 3.90537C0.939754 3.11219 1.4011 2.40274 2.02607 1.85559C2.65105 1.30845 3.41527 0.944959 4.2341 0.805387Z'
        fill='currentColor'
      />
    </svg>
  );
}

HeartIcon.displayName = 'HeartIcon';
