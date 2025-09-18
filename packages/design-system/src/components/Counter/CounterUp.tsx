import Button from '@components/Button';
import { PlusIcon } from '@components/icons';
import { twMerge } from 'tailwind-merge';

import { useCounterContext } from './context';
import clamp from './utils/clamp';

/**
 * CounterUp
 * @description 카운터 값을 증가시키는 버튼 컴포넌트입니다.
 * - `CounterContext` 내부에서만 동작합니다.
 *
 * @param {string} [props.className] - 아이콘 스타일의 추가 TailwindCSS 클래스
 *
 * @example
 * ```tsx
 * <Counter>
 *   <CounterUp className="text-red-500" />
 * </Counter>
 * ```
 */
export function CounterUp({ className }: { className?: string }) {
  const { count, onChange, step, max } = useCounterContext();
  const disabled = typeof max === 'number' && count >= max;

  return (
    <Button
      iconOnly
      aria-label='증가'
      className='border-none'
      disabled={disabled}
      leftIcon={<PlusIcon className={twMerge('text-black-100', className)} />}
      size='sm'
      variant='outline'
      onClick={() => onChange(clamp(count + step, null, max))}
    />
  );
}

export const Up = CounterUp;
