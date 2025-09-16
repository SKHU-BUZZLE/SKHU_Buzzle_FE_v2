import { MinusIcon } from '@components/icons';
import { twMerge } from 'tailwind-merge';

import { useCounterContext } from './context';
import clamp from './utils/clamp';

/**
 * === Count Down Component ===
 */
export function CounterDown({ className }: { className?: string }) {
  const { count, onChange, step, min } = useCounterContext();
  const disabled = typeof min === 'number' && count <= min;

  // todo: 공통 컴포넌트 Button으로 수정할 예정
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
