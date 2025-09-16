import { PlusIcon } from '@components/icons';
import { twMerge } from 'tailwind-merge';

import { useCounterContext } from './context';
import clamp from './utils/clamp';

/**
 * === Count Up Component ===
 */
export function CounterUp({ className }: { className?: string }) {
  const { count, onChange, step, max } = useCounterContext();
  const disabled = typeof max === 'number' && count >= max;

  // todo: 공통 컴포넌트 Button으로 수정할 예정
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
