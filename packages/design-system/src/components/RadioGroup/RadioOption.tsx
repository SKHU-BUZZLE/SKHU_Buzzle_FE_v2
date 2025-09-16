import { twMerge } from 'tailwind-merge';

import { useRadioGroupContext } from './RadioGroupContext';
import type { RadioOptionProps } from './types';

/**
 * @component RadioOption
 * @description 브라우저 기본 점형 라디오를 노출하는 옵션 컴포넌트입니다.
 * - mode가 "option"일 때만 사용 가능 (혼용 금지).
 * - 이벤트의 event.target.value(문자열) 대신, props.value를 그대로 onChange에 전달합니다.
 */
function RadioOption({ value, children, className, inputClassName, disabled }: RadioOptionProps) {
  const { name, value: selected, onChange, mode } = useRadioGroupContext();

  if (mode !== 'option') {
    throw new Error('Radio.Option은 Radio.Root(mode="option")에서만 사용할 수 있습니다.');
  }

  const checked = selected === value;

  return (
    <label className={twMerge('cursor-pointer', disabled && 'cursor-not-allowed opacity-50', className)}>
      <input
        checked={checked}
        className={inputClassName}
        disabled={disabled}
        name={name}
        type='radio'
        value={String(value)}
        onChange={() => onChange(value)}
      />
      {children}
    </label>
  );
}

export const Option = RadioOption;
