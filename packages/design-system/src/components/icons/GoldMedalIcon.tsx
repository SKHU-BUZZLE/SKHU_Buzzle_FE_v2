import { twMerge } from 'tailwind-merge';

/**
 * GoldMedalIcon
 *
 * 🥇 1위를 나타내는 금메달 아이콘입니다.
 *
 * 크기 (Size)
 * - 기본 클래스에 `size-27`이 포함되어 **27px × 27px**로 렌더링됩니다.
 * - 다른 크기가 필요하면 `className`으로 `size-*` 유틸리티를 덮어쓸 수 있습니다.
 *
 * 색상 (Color)
 * - **색상은 고정된 값**으로 지정되어 있습니다:
 *   - 메달 원: `#FFD554` (골드)
 *   - 외곽선: `#FFE48F`
 *   - 리본: `#FF6464`
 * - `text-*` 등의 Tailwind 색상 유틸리티로 변경할 수 **없습니다**.
 *
 * 접근성 (A11y)
 * - 장식용일 경우 `aria-hidden`을 전달하세요: `<GoldMedalIcon aria-hidden />`
 * - 의미 전달이 필요할 경우 `aria-label`을 제공합니다: `<GoldMedalIcon aria-label="1위 금메달" />`
 *
 * 사용 예
 * ```tsx
 * // 장식용 (스크린리더 숨김)
 * <GoldMedalIcon aria-hidden />
 *
 * // 의미 전달 (1위)
 * <GoldMedalIcon aria-label="1위 금메달" className="size-32" />
 * ```
 *
 * @param {string} [className] Tailwind 유틸리티 클래스. 기본 `size-27`.
 * @param {React.SVGProps<SVGSVGElement>} [props] 표준 SVG 속성(onClick, aria-*, data-* 등).
 * @returns {JSX.Element} SVG 아이콘 요소.
 */
export default function GoldMedalIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-27', className)}
      fill='none'
      viewBox='0 0 27 27'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M12.33 20.6161C13.0396 20.9917 13.0396 22.0083 12.33 22.3839L6.46777 25.4863C5.80177 25.8388 5 25.356 5 24.6025V18.3975C5 17.644 5.80177 17.1612 6.46777 17.5137L12.33 20.6161Z'
        fill='#FF6464'
      />
      <path
        d='M15.5 20.634C14.8333 21.0189 14.8333 21.9811 15.5 22.366L20.75 25.3971C21.4167 25.782 22.25 25.3009 22.25 24.5311V18.4689C22.25 17.6991 21.4167 17.218 20.75 17.6029L15.5 20.634Z'
        fill='#FF6464'
      />
      <circle cx='13.5' cy='11.5' fill='#FFD554' r='10.5' stroke='#FFE48F' strokeWidth='2' />
      <path
        d='M15.2637 6.10156V16H13.1992V8.05664H13.1445L10.875 9.47852V7.66016L13.3223 6.10156H15.2637Z'
        fill='white'
      />
    </svg>
  );
}

GoldMedalIcon.displayName = 'GoldMedalIcon';
