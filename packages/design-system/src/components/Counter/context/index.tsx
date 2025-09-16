import { createContext, useContext } from 'react';

/**
 * === Context ===
 */
export interface CounterContextType {
  count: number;
  onChange: (value: number) => void; // 디자인 시스템 + 공통 컴포넌트이기 때문에 범용성을 넓히기 위한 타입 선언
  min: number | null;
  max: number | null;
  step: number;
}

export const CounterContext = createContext<CounterContextType | null>(null);

export function useCounterContext() {
  const context = useContext(CounterContext);
  if (!context) throw new Error('Counter components must be used inside <Counter>');
  return context;
}
