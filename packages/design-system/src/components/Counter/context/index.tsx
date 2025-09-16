import { createContext, useContext } from 'react';

/**
 * @interface CounterContextType
 * @property {number} count - 현재 카운터 값
 * @property {(value: number) => void} onChange - 카운터 값이 변경될 때 호출되는 콜백
 * @property {number | null} min - 허용되는 최소값 (null일 경우 제한 없음)
 * @property {number | null} max - 허용되는 최대값 (null일 경우 제한 없음)
 * @property {number} step - 증가/감소 시 이동할 단위
 */
export interface CounterContextType {
  count: number;
  onChange: (value: number) => void; // 디자인 시스템 + 공통 컴포넌트이기 때문에 범용성을 넓히기 위한 타입 선언
  min: number | null;
  max: number | null;
  step: number;
}

/**
 * CounterContext
 * @description 반드시 `<Counter>` 컴포넌트 내부에서 사용
 */
export const CounterContext = createContext<CounterContextType | null>(null);

/**
 * @throws {Error} CounterContext 가 `<Counter>` 외부에서 사용될 경우 에러 발생
 * @returns {CounterContextType} Counter 관련 상태와 제어 함수
 *
 * @example
 * ```tsx
 * const { count, onChange, min, max, step } = useCounterContext();
 * ```
 */
export function useCounterContext() {
  const context = useContext(CounterContext);
  if (!context) throw new Error('Counter components must be used inside <Counter>');
  return context;
}
