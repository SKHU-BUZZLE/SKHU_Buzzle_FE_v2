import Input from '@components/Input';
import isValidButton from '@components/utils/isValidButton';
import isValidIcon from '@components/utils/isValidIcon';
import { twm } from '@components/utils/twm';

function isValidSlot(node: React.ReactNode) {
  if (isValidIcon(node) || isValidButton(node)) return true;
  return false;
}

type TextInputType = 'text' | 'password' | 'email' | 'search' | 'tel' | 'url';

interface FormFieldProps extends Omit<React.ComponentProps<'input'>, 'type'> {
  type?: TextInputType;
  name?: string;
  value?: string;
  defaultValue?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  fieldClassName?: string;
  label?: string;
  labelClassName?: string;
  errorMessage?: string;
  errorClassName?: string;
  inputClassName?: string;
  inputWrapperClassName?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export default function FormField({
  type = 'text',
  name,
  value,
  defaultValue,
  onFocus,
  onBlur,
  fieldClassName,
  label,
  labelClassName,
  errorMessage,
  errorClassName,
  inputClassName,
  inputWrapperClassName,
  leftSlot: LeftSlot,
  rightSlot: RightSlot,
  ...inputProps
}: FormFieldProps) {
  // 각 Slot은 icon 혹은 button만 허용
  const ValidLeftSlot = isValidSlot(LeftSlot) ? LeftSlot : null;
  const ValidRightSlot = isValidSlot(RightSlot) ? RightSlot : null;

  // 내부 input의 focus 상태를 감지하기 위해 focus-within 사용
  const baseClassName =
    'bg-white-200 w-full dark:bg-dm-black-600 flex items-center gap-8 px-4 py-2 ds-typ-body-2 rounded-md ' +
    'border-white-200 dark:border-dm-black-600 focus-within:border-white-600 dark:focus-within:border-white-900 border outline-none ' +
    'disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <div className={twm('flex flex-col gap-12', fieldClassName)}>
      {label && (
        <label className={twm('ds-typ-title-2', labelClassName)} htmlFor={name}>
          {label}
        </label>
      )}
      {/* inputWrapper = input과 leftSlot, rightSlot을 포함 */}
      <div className={twm(baseClassName, inputWrapperClassName)}>
        {ValidLeftSlot}
        <Input
          className={inputClassName}
          defaultValue={defaultValue}
          type={type}
          value={value}
          onBlur={onBlur}
          onFocus={onFocus}
          {...inputProps}
        />
        {ValidRightSlot}
      </div>
      {errorMessage && <p className={twm('text-error-red-500 ds-typ-body-3', errorClassName)}>{errorMessage}</p>}
    </div>
  );
}
