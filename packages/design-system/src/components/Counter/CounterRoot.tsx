import { CounterContext } from './context';

/**
 * CounterRoot
 * @description 숫자 값을 -/+로 입력받는 Counter 컴포넌트의 Root입니다.
 * - 반드시 이 컴포넌트 내부에서 `CounterDown`, `CounterUp`, `CounterValue` 등을 사용해야 합니다.
 *
 * @param {number} props.count - 현재 카운터 값
 * @param {(value: number) => void} props.onChange - 카운터 값이 변경될 때 호출되는 콜백
 * @param {number | null} [props.min=null] - 허용되는 최소값 (null일 경우 제한 없음)
 * @param {number | null} [props.max=null] - 허용되는 최대값 (null일 경우 제한 없음)
 * @param {number} [props.step=1] - 카운터 증가/감소 단위
 * @param {React.ReactNode} [props.children] - 카운터 하위 컴포넌트
 *
 * @example
 * ```tsx
 * <CounterRoot count={value} onChange={setValue} min={0} max={10} step={1}>
 *   <CounterDown />
 *   <CounterValue unit="명" />
 *   <CounterUp />
 * </CounterRoot>
 * ```
 */
export interface RootProps {
  count: number;
  onChange: (value: number) => void;
  min?: number | null;
  max?: number | null;
  step?: number;
  children?: React.ReactNode;
}
export function CounterRoot({ count, onChange, min = null, max = null, step = 1, children }: RootProps) {
  return <CounterContext.Provider value={{ count, onChange, min, max, step }}>{children}</CounterContext.Provider>;
}

export const Root = CounterRoot;
