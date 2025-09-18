import { twMerge } from 'tailwind-merge';

import { useCounterContext } from './context';

/**
 * CounterValue
 * @description 카운터의 현재 값을 표시하는 컴포넌트입니다.
 * - `CounterContext` 내부에서만 사용 가능합니다.
 * - 선택적으로 단위(`unit`)를 함께 표시할 수 있습니다.
 *
 * @param {string} [props.className] - TailwindCSS 등의 추가 클래스
 * @param {string} [props.unit] - 값 옆에 표시할 단위 (예: "명", "개", "점")
 *
 * @example
 * ```tsx
 * <CounterRoot count={3} onChange={setCount}>
 *   <CounterValue unit="명" />
 * </CounterRoot>
 * ```
 */
export function CounterValue({ className, unit }: { className?: string; unit?: string }) {
  const { count } = useCounterContext();

  return (
    <p className={twMerge('flex gap-2', className)}>
      <span>{count}</span>
      {unit && <span>{unit}</span>}
    </p>
  );
}

export const Value = CounterValue;
