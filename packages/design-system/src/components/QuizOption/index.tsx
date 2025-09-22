import Button from '@components/Button';
import { ErrorIcon, SuccessIcon } from '@components/icons';
import { twMerge } from 'tailwind-merge';

interface QuizOptionProps {
  /** 보기 텍스트 */
  option: string;
  /** 보기 선택 여부 */
  isSelected?: boolean;
  /** 정답 여부 */
  isCorrect?: boolean;
  /** 오답 여부 */
  isIncorrect?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 보기의 인덱스 */
  index?: number;
  /** 클릭 시 호출되는 콜백 */
  onClick?: (index: number) => void;
}
// const VARIANT_CLASSNAME = {
//   default: 'bg-white-200 dark:bg-dm-black-600 ds-text-normal',
//   selected: 'bg-primary-alpha-10 dark:bg-primary-alpha-20 text-primary-500',
//   correct: 'bg-correct-green-alpha text-correct-green-500',
//   incorrect: 'bg-error-red-alpha text-error-red-500',
// } as const;
// type Variant = keyof typeof VARIANT_CLASSNAME;

/**
 * QuizOption 컴포넌트
 *
 * - 객관식 퀴즈에서 하나의 선지(보기)를 렌더링합니다.
 * - `variant`에 따라 기본, 선택됨, 정답, 오답 상태를 스타일링합니다.
 * - `disabled` 상태일 경우 클릭할 수 없으며 흐리게 표시됩니다.
 * - 클릭 시 `onClick` 콜백을 호출하여 현재 보기의 `index`를 외부로 전달합니다.
 *
 * @param {string} props.option - 보기 텍스트
 * @param {'default' | 'selected' | 'correct' | 'incorrect'} [props.variant='default'] - 보기 상태
 * @param {boolean} [props.disabled=false] - 보기 비활성화 여부
 * @param {number} [props.index] - 보기의 인덱스 (클릭 시 외부로 전달)
 * @param {(index: number) => void} [props.onClick] - 클릭 시 실행되는 콜백
 *
 * @example
 * ```tsx
 * <QuizOption
 *   index={1}
 *   option="정답입니다"
 *   variant="correct"
 *   onClick={(idx) => console.log('선택된 보기:', idx)}
 * />
 *
 * <QuizOption
 *   index={2}
 *   option="오답입니다"
 *   variant="incorrect"
 *   disabled
 * />
 * ```
 */
export default function QuizOption({
  option,
  isSelected = false,
  isCorrect = false,
  isIncorrect = false,
  disabled = false,
  index,
  onClick,
}: QuizOptionProps) {
  // let icon = null;
  // switch (variant) {
  //   case 'correct':
  //     icon = <SuccessIcon />;
  //     break;
  //   case 'incorrect':
  //     icon = <ErrorIcon />;
  //     break;
  // }
  const baseClass = 'ds-typ-body-2 w-full bg-white-200 dark:bg-dm-black-600 ds-text-normal';

  // dark: 클래스는 일반 bg- 보다 우선순위가 높다. twMerge 할 때 조심!
  const stateClass = twMerge(
    isSelected && 'bg-primary-alpha-10 dark:bg-primary-alpha-20 text-primary-500',
    isCorrect && 'bg-correct-green-alpha dark:bg-correct-green-alpha text-correct-green-500',
    isIncorrect && 'bg-error-red-alpha dark:bg-error-red-alpha text-error-red-500',
  );

  let icon = null;
  if (isCorrect) icon = <SuccessIcon />;
  if (isIncorrect) icon = <ErrorIcon />;

  return (
    <Button
      className={twMerge(baseClass, stateClass)}
      disabled={disabled}
      leftIcon={icon}
      round='rounded'
      onClick={() => {
        if (index == null) return;
        onClick?.(index);
      }}
    >
      {option}
    </Button>
    // <Button
    //   className={twMerge('ds-typ-body-2 w-full', VARIANT_CLASSNAME[variant])}
    //   disabled={disabled}
    //   leftIcon={icon}
    //   round='rounded'
    //   onClick={() => {
    //     // 눌린 선택지의 index를 외부로 반환
    //     if (index === undefined || index === null) return;
    //     onClick?.(index);
    //   }}
    // >
    //   {option}
    // </Button>
  );
}
