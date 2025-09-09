import { twMerge } from 'tailwind-merge';

/**
 * HomeIcon
 *
 * 집(홈) 위치/대시보드 이동을 표현하는 기본 아이콘 컴포넌트입니다.
 *
 * 크기(Size)
 * - 기본 클래스에 `size-20`이 포함되어 **20px × 20px**로 렌더링됩니다. (프로젝트 spacing 규칙)
 * - 다른 크기가 필요하면 `className`으로 `size-*` 유틸리티를 덮어쓰세요. 예: `"size-24"`
 *
 * 색상(Color)
 * - `fill="currentColor"`로 동작하므로 Tailwind의 `text-*` 유틸리티로 색상을 제어합니다.
 *   예: `"text-gray-900"`, `"text-primary-600"`
 *
 * 접근성(A11y)
 * - 장식용이면 `aria-hidden`을 전달하세요: `<HomeIcon aria-hidden />`
 * - 의미를 전달해야 하면 `aria-label`을 제공하세요: `<HomeIcon aria-label="홈" />`
 *
 * 사용 예
 * ```tsx
 * // 1) 장식용(스크린리더 숨김), 기본 20px
 * <HomeIcon aria-hidden className="text-gray-800" />
 *
 * // 2) 의미 전달, 20px, 프라이머리 컬러
 * <HomeIcon aria-label="홈" className="text-primary-600" />
 *
 * // 3) 크기 오버라이드(24px), 컬러 회색 500
 * <HomeIcon aria-hidden className="size-24 text-gray-500" />
 * ```
 *
 * @param {string} [className] Tailwind 유틸리티 클래스. 예: `"size-24 text-gray-900"`.
 * @param {React.SVGProps<SVGSVGElement>} [props] 표준 SVG 속성(onClick, aria-*, data-*, tabIndex 등).
 * @returns {JSX.Element} SVG 아이콘 요소.
 */
export default function HomeIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-20', className)}
      fill='none'
      viewBox='0 0 20 19'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M9.33666 0.253244C9.51966 0.0907323 9.75591 0.000976562 10.0007 0.000976562C10.2454 0.000976563 10.4817 0.0907323 10.6647 0.253244L19.6647 8.25324C19.8528 8.43196 19.9641 8.67681 19.975 8.93606C19.986 9.19532 19.8957 9.44868 19.7233 9.64262C19.5509 9.83657 19.3099 9.9559 19.0512 9.97543C18.7924 9.99495 18.5362 9.91313 18.3367 9.74724L18.0007 9.45024V17.0002C18.0007 17.5307 17.7899 18.0394 17.4149 18.4145C17.0398 18.7895 16.5311 19.0002 16.0007 19.0002H4.00066C3.47023 19.0002 2.96152 18.7895 2.58645 18.4145C2.21137 18.0394 2.00066 17.5307 2.00066 17.0002V9.45024L1.66466 9.74724C1.46512 9.91313 1.20891 9.99495 0.950159 9.97543C0.691407 9.9559 0.450376 9.83657 0.277982 9.64262C0.105589 9.44868 0.0153331 9.19532 0.0262821 8.93606C0.0372311 8.67681 0.148527 8.43196 0.336659 8.25324L9.33666 0.253244ZM4.00066 7.67024V17.0002H7.00066V12.0002C7.00066 11.735 7.10602 11.4807 7.29355 11.2931C7.48109 11.1056 7.73544 11.0002 8.00066 11.0002H12.0007C12.2659 11.0002 12.5202 11.1056 12.7078 11.2931C12.8953 11.4807 13.0007 11.735 13.0007 12.0002V17.0002H16.0007V7.67124L10.0007 2.33824L4.00066 7.67024ZM11.0007 17.0002V13.0002H9.00066V17.0002H11.0007Z'
        fill='currentColor'
      />
    </svg>
  );
}

HomeIcon.displayName = 'HomeIcon';
