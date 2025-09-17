import { twm } from '@components/utils/twm';

// 키보드로 입력할 수 있는 텍스트 타입들로 제한
type TextInputType = 'text' | 'password' | 'email' | 'search' | 'tel' | 'url';

// React.ComponentProps<'input'>: 실제 React에서 <input>을 사용할 때 허용되는 전체 props 타입을 추출 (ref 포함)
interface InputProps extends React.ComponentProps<'input'> {
  type?: TextInputType;
  value?: string;
  defaultValue?: string; // uncontrolled
  minLength?: number;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function Input({
  name,
  className,
  type = 'text',
  value,
  onChange,
  minLength,
  maxLength,
  defaultValue,
  onBlur,
  onFocus,
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={twm(
        'placeholder:text-white-600 dark:placeholder:text-white-900 w-full outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      defaultValue={defaultValue}
      maxLength={maxLength}
      minLength={minLength}
      name={name}
      type={type}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
}
