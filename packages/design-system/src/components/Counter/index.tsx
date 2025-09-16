import { MinusIcon, PlusIcon } from '@components/icons';
import { createContext, useContext } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * === Util ===
 */
function clamp(n: number, min?: number | null, max?: number | null) {
  if (min != null && n < min) return min;
  if (max != null && n > max) return max;
  return n;
}

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

const CounterContext = createContext<CounterContextType | null>(null);

export function useCounterContext() {
  const context = useContext(CounterContext);
  if (!context) throw new Error('Counter components must be used inside <Counter>');
  return context;
}

/**
 * === Root Component ===
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

/**
 * === Count Up Component ===
 */
export function CounterUp({ className }: { className?: string }) {
  const { count, onChange, step, max } = useCounterContext();
  const disabled = typeof max === 'number' && count >= max;

  return (
    <button
      className='disabled:opacity-40'
      disabled={disabled}
      onClick={() => onChange(clamp(count + step, null, max))}
    >
      <PlusIcon className={twMerge('text-black-100', className)} />
    </button>
  );
}

export const Up = CounterUp;

/**
 * === Count Down Component ===
 */
export function CounterDown({ className }: { className?: string }) {
  const { count, onChange, step, min } = useCounterContext();
  const disabled = typeof min === 'number' && count <= min;

  return (
    <button
      className='disabled:opacity-40'
      disabled={disabled}
      onClick={() => onChange(clamp(count - step, min, null))}
    >
      <MinusIcon className={twMerge('text-black-100', className)} />
    </button>
  );
}

export const Down = CounterDown;

/**
 * === Value Component ===
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

/**
 * === Export ===
 */
export const Counter = {
  Root,
  Value,
  Up,
  Down,
};
