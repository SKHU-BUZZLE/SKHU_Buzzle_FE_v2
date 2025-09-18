import { twm } from '@components/utils/twm';

// 키보드로 입력할 수 있는 텍스트 타입들로 제한
export type TextInputType = 'text' | 'password' | 'email' | 'search' | 'tel' | 'url';

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

/**
 * 텍스트 입력 전용 Input 컴포넌트
 *
 * - `text`, `password`, `email`, `search`, `tel`, `url` 타입만 허용합니다.
 * - 기본적으로 controlled(`value` + `onChange`)와 uncontrolled(`defaultValue`) 방식을 모두 지원합니다.
 * - 네이티브 `<input>`의 모든 속성을 그대로 확장(`React.ComponentProps<'input'>`)했기 때문에, 필요한 경우 `id`, `placeholder`, `autoComplete` 등도 그대로 전달 가능합니다.
 * - `label`, `errorMessage`, `icon/button slot`을 함께 사용할 수 있는 `FormField` 컴포넌트와 함께 사용하는 것을 권장합니다.
 *
 * @param {string} [props.type='text'] Input의 타입 (텍스트 전용만 지원)
 * @param {string} [props.value] Input의 값 (controlled 방식)
 * @param {string} [props.defaultValue] 초기 값 (uncontrolled 방식)
 * @param {number} [props.minLength] 최소 입력 길이
 * @param {number} [props.maxLength] 최대 입력 길이
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange] 값 변경 이벤트 핸들러
 * @param {() => void} [props.onBlur] 블러 이벤트 핸들러
 * @param {() => void} [props.onFocus] 포커스 이벤트 핸들러
 * @param {string} [props.className] 추가적인 TailwindCSS 클래스
 */
export default function Input({
  type = 'text',
  value,
  defaultValue,
  minLength,
  maxLength,
  onChange,
  onBlur,
  onFocus,
  className,
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
      type={type}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
}
