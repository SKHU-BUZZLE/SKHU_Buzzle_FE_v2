import Button from '@components/Button';
import { MinusIcon } from '@components/icons';
import { twMerge } from 'tailwind-merge';

import { useCounterContext } from './context';
import clamp from './utils/clamp';

/**
 * CounterDown
 * @description 카운터 값을 감소시키는 버튼 컴포넌트입니다.
 * - `CounterContext` 내부에서만 동작합니다.
 *
 * @param {string} [props.className] - 아이콘 스타일의 추가 TailwindCSS 클래스
 *
 * @example
 * ```tsx
 * <Counter>
 *   <CounterDown className="text-red-500" />
 * </Counter>
 * ```
 */
export function CounterDown({ className }: { className?: string }) {
  const { count, onChange, step, min } = useCounterContext();
  const disabled = typeof min === 'number' && count <= min;

  return (
    <Button
      iconOnly
      aria-label='감소'
      className='border-none'
      disabled={disabled}
      leftIcon={<MinusIcon className={twMerge('text-black-100', className)} />}
      size='sm'
      variant='outline'
      onClick={() => onChange(clamp(count - step, min, null))}
    />
  );
}

export const Down = CounterDown;
