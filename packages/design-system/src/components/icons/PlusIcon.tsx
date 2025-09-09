import { twMerge } from 'tailwind-merge';

/**
 * PlusIcon
 *
 * 십자가 모양(`+`)을 표현하는 아이콘 컴포넌트입니다.
 * 수량 증가, 확장, 추가, 더하기 등의 동작을 나타낼 때 사용합니다.
 *
 * 크기 (Size)
 * - 기본 클래스에 `size-24`가 포함되어 **24px × 24px**로 렌더링됩니다.
 * - 필요 시 `className`을 통해 `size-*` 유틸리티로 크기를 덮어쓸 수 있습니다. 예: `"size-16"`.
 *
 * 색상 (Color)
 * - `fill="currentColor"` 속성을 사용하므로 Tailwind `text-*` 유틸리티로 색상을 제어합니다.
 *   예: `"text-gray-700"`, `"text-primary-500"`.
 *
 * 접근성 (A11y)
 * - 단순 장식용이면 `aria-hidden`을 사용하세요: `<PlusIcon aria-hidden />`
 * - 의미 전달이 필요하면 `aria-label`을 제공하세요: `<PlusIcon aria-label="추가" />`
 *
 * 사용 예
 * ```tsx
 * // 1) 장식용 (숨김 처리)
 * <PlusIcon aria-hidden className="text-gray-400" />
 *
 * // 2) 항목 추가 버튼용
 * <button aria-label="항목 추가">
 *   <PlusIcon className="text-green-500" />
 * </button>
 *
 * // 3) 크기 오버라이드
 * <PlusIcon aria-hidden className="size-16 text-gray-700" />
 * ```
 *
 * @param {string} [className] Tailwind 유틸리티 클래스. 예: `"size-16 text-gray-500"`.
 * @param {React.SVGProps<SVGSVGElement>} [props] 표준 SVG 속성(onClick, aria-*, data-* 등).
 * @returns {JSX.Element} SVG 아이콘 요소.
 */
export default function PlusIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-24', className)}
      fill='none'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M18 12.998H13V17.998C13 18.2632 12.8946 18.5176 12.7071 18.7051C12.5196 18.8926 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8926 11.2929 18.7051C11.1054 18.5176 11 18.2632 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8926 5.29289 12.7051C5.10536 12.5176 5 12.2632 5 11.998C5 11.7328 5.10536 11.4784 5.29289 11.2909C5.48043 11.1033 5.73478 10.998 6 10.998H11V5.99799C11 5.73277 11.1054 5.47842 11.2929 5.29088C11.4804 5.10334 11.7348 4.99799 12 4.99799C12.2652 4.99799 12.5196 5.10334 12.7071 5.29088C12.8946 5.47842 13 5.73277 13 5.99799V10.998H18C18.2652 10.998 18.5196 11.1033 18.7071 11.2909C18.8946 11.4784 19 11.7328 19 11.998C19 12.2632 18.8946 12.5176 18.7071 12.7051C18.5196 12.8926 18.2652 12.998 18 12.998Z'
        fill='currentColor'
      />
    </svg>
  );
}

PlusIcon.displayName = 'PlusIcon';
