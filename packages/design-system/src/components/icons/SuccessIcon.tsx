import { twMerge } from 'tailwind-merge';

/**
 * SuccessIcon
 *
 * 원형 배경 안에 체크 표시가 들어간 아이콘 컴포넌트입니다.
 * 성공 상태, 정답 표시, 완료 알림 등 긍정적인 피드백을 전달할 때 사용합니다.
 *
 * 크기 (Size)
 * - 기본 클래스에 `size-16`이 포함되어 **16px × 16px**로 렌더링됩니다.
 * - 필요에 따라 `className`으로 `size-*` 유틸리티를 덮어쓸 수 있습니다. 예: `"size-20"`.
 *
 * 색상 (Color)
 * - `circle`은 `currentColor`를 사용하여 Tailwind `text-*` 유틸리티로 배경색을 제어합니다.
 *   예: `"text-green-500"`, `"text-primary-600"`.
 * - 체크(`path`)는 흰색(`fill="#FDFDFD"`)으로 고정되어 대비를 유지합니다.
 *
 * 접근성 (A11y)
 * - 장식용이면 `aria-hidden`을 전달하세요: `<SuccessIcon aria-hidden />`
 * - 의미를 전달해야 하면 `aria-label`을 제공하세요: `<SuccessIcon aria-label="성공" />`
 *
 * 사용 예
 * ```tsx
 * // 1) 성공 상태 (장식용)
 * <SuccessIcon aria-hidden className="text-green-500" />
 *
 * // 2) 정답 아이콘, 스크린리더 읽기
 * <SuccessIcon aria-label="정답" className="text-green-600" />
 *
 * // 3) 크기 오버라이드
 * <SuccessIcon aria-hidden className="size-20 text-emerald-500" />
 * ```
 *
 * @param {string} [className] Tailwind 유틸리티 클래스. 예: `"size-20 text-green-500"`.
 * @param {React.SVGProps<SVGSVGElement>} [props] 표준 SVG 속성(onClick, aria-*, data-* 등).
 * @returns {JSX.Element} SVG 아이콘 요소.
 */
export default function SuccessIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-16', className)}
      fill='none'
      viewBox='0 0 16 17'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <circle cx='8' cy='8.5' fill='currentColor' r='8' />
      <path
        d='M11.7884 5.27604C11.843 5.22034 11.9082 5.17608 11.9801 5.14587C12.052 5.11566 12.1292 5.1001 12.2072 5.1001C12.2852 5.1001 12.3624 5.11566 12.4343 5.14587C12.5062 5.17608 12.5714 5.22034 12.626 5.27604C12.8548 5.50724 12.858 5.88084 12.634 6.11604L7.90359 11.708C7.84989 11.767 7.78471 11.8144 7.71206 11.8473C7.6394 11.8803 7.56079 11.898 7.48104 11.8995C7.40129 11.901 7.32207 11.8862 7.24823 11.8561C7.17439 11.8259 7.10748 11.781 7.05159 11.724L4.17319 8.80725C4.06218 8.69403 4 8.5418 4 8.38325C4 8.22469 4.06218 8.07246 4.17319 7.95924C4.22779 7.90354 4.29295 7.85928 4.36486 7.82907C4.43678 7.79886 4.51399 7.7833 4.59199 7.7833C4.66999 7.7833 4.74721 7.79886 4.81912 7.82907C4.89103 7.85928 4.9562 7.90354 5.01079 7.95924L7.45239 10.4336L11.7724 5.29364L11.7884 5.27604Z'
        fill='#FDFDFD'
      />
    </svg>
  );
}

SuccessIcon.displayName = 'SuccessIcon';
