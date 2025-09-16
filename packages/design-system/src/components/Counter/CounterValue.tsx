import { twMerge } from 'tailwind-merge';

import { useCounterContext } from './context';

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
