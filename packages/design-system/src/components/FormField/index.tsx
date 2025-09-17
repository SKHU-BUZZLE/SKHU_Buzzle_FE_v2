import Input, { type TextInputType } from '@components/Input';
import { twm } from '@components/utils/twm';

import isValidSlot from './utils/isValidSlot';

interface FormFieldProps extends Omit<React.ComponentProps<'input'>, 'type'> {
  type?: TextInputType;
  name: string;
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

/**
 * FormField
 * - `label`, `input`, `errorMessage`를 포함한 완성형 입력 필드입니다.
 * - 좌측/우측 슬롯(`leftSlot`, `rightSlot`)을 통해 아이콘이나 버튼을 함께 배치할 수 있습니다.
 * - 내부 `input`의 focus 상태는 부모 wrapper에서 `focus-within`을 통해 감지하여 스타일을 제어합니다.
 * - 접근성을 위해 `label`이 주어지면 `htmlFor`와 `name`을 연결합니다.
 *
 * @param {string} [props.type='text'] 입력 타입 (`text`, `password`, `email` 등 텍스트 계열)
 * @param {string} [props.name] 입력 필드의 name/id. label과 aria 연결 기준
 * @param {string} [props.value] 입력 값 (controlled 방식)
 * @param {string} [props.defaultValue] 초기 값 (uncontrolled 방식)
 * @param {() => void} [props.onFocus] 포커스 이벤트 핸들러
 * @param {() => void} [props.onBlur] 블러 이벤트 핸들러
 *
 * @param {string} [props.fieldClassName] 전체 FormField wrapper 클래스
 * @param {string} [props.label] 라벨 텍스트
 * @param {string} [props.labelClassName] 라벨 커스텀 클래스
 * @param {string} [props.errorMessage] 에러 메시지 텍스트
 * @param {string} [props.errorClassName] 에러 메시지 커스텀 클래스
 * @param {string} [props.inputClassName] 실제 <input> 태그에 적용할 클래스
 * @param {string} [props.inputWrapperClassName] input + leftSlot + rightSlot을 감싸는 wrapper 클래스
 *
 * @param {React.ReactNode} [props.leftSlot] input 왼쪽에 렌더링할 아이콘/버튼 (아이콘과 html <button> 및 공통 컴포넌트 Button)
 * @param {React.ReactNode} [props.rightSlot] input 오른쪽에 렌더링할 아이콘/버튼 (아이콘과 html <button> 및 공통 컴포넌트 Button)
 *
 * @example
 * ```tsx
 * <FormField
 *   name="email"
 *   label="이메일"
 *   placeholder="you@example.com"
 *   value={form.email}
 *   onChange={(e) => setForm({ ...form, email: e.target.value })}
 *   errorMessage={errors.email}
 *   leftSlot={<MailIcon />}
 *   rightSlot={<ClearButton onClick={() => setForm({ ...form, email: '' })} />}
 * />
 * ```
 */
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
          id={name}
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
