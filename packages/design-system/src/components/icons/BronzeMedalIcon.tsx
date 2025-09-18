import { twMerge } from 'tailwind-merge';

/**
 * BronzeMedalIcon
 *
 * 🥉 3위를 나타내는 동메달 아이콘입니다.
 *
 * 크기 (Size)
 * - 기본 클래스에 `size-27`이 포함되어 **27px × 27px**로 렌더링됩니다.
 * - 다른 크기가 필요하면 `className`으로 `size-*` 유틸리티를 덮어쓸 수 있습니다.
 *
 * 색상 (Color)
 * - **색상은 고정된 값**으로 지정되어 있습니다:
 *   - 메달 원: `#CE8E2E` (브론즈)
 *   - 외곽선: `#E2B470`
 *   - 리본: `#FF6464`
 * - `text-*` 등의 Tailwind 색상 유틸리티로 변경할 수 **없습니다**.
 *
 * 접근성 (A11y)
 * - 장식용일 경우 `aria-hidden`을 전달하세요: `<BronzeMedalIcon aria-hidden />`
 * - 의미 전달이 필요할 경우 `aria-label`을 제공합니다: `<BronzeMedalIcon aria-label="3위 동메달" />`
 *
 * 사용 예
 * ```tsx
 * // 장식용 (스크린리더 숨김)
 * <BronzeMedalIcon aria-hidden />
 *
 * // 의미 전달 (3위)
 * <BronzeMedalIcon aria-label="3위 동메달" className="size-32" />
 * ```
 *
 * @param {string} [className] Tailwind 유틸리티 클래스. 기본 `size-27`.
 * @param {React.SVGProps<SVGSVGElement>} [props] 표준 SVG 속성(onClick, aria-*, data-* 등).
 * @returns {JSX.Element} SVG 아이콘 요소.
 */
export default function BronzeMedalIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
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
      <circle cx='13.5' cy='11.5' fill='#CE8E2E' r='10.5' stroke='#E2B470' strokeWidth='2' />
      <path
        d='M13.4727 16.1367C11.2988 16.1367 9.74023 14.9336 9.69922 13.2109H11.7773C11.8184 13.9492 12.5293 14.4414 13.4863 14.4414C14.4707 14.4414 15.1816 13.8809 15.168 13.0879C15.1816 12.2812 14.457 11.707 13.2949 11.707H12.3789V10.1895H13.2949C14.2656 10.1895 14.9492 9.65625 14.9492 8.87695C14.9492 8.125 14.375 7.60547 13.5 7.60547C12.625 7.60547 11.9004 8.09766 11.873 8.84961H9.9043C9.93164 7.14062 11.4766 5.96484 13.5 5.96484C15.5645 5.96484 16.9453 7.18164 16.9316 8.75391C16.9453 9.86133 16.166 10.6543 15.0586 10.8457V10.9277C16.5078 11.1055 17.3145 11.9941 17.3008 13.2246C17.3145 14.9199 15.7012 16.1367 13.4727 16.1367Z'
        fill='white'
      />
    </svg>
  );
}

BronzeMedalIcon.displayName = 'BronzeMedalIcon';
