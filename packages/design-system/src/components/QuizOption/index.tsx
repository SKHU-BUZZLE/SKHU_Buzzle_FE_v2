import { ErrorIcon, SuccessIcon } from '@components/icons';
import { twMerge } from 'tailwind-merge';

interface QuizOptionProps {
  option: string;
  variant?: Variant;
  disabled?: boolean;
  index?: number | undefined;
  onClick?: (index: number) => void;
}

const VARIANT_CLASSNAME = {
  default: 'bg-white-200 dark:bg-dm-black-600',
  selected: 'bg-primary-alpha-10 dark:primary-alpha-20 text-primary-500',
  correct: 'bg-correct-green-alpha text-correct-green-500',
  incorrect: 'bg-error-red-alpha text-error-red-500',
} as const;
type Variant = keyof typeof VARIANT_CLASSNAME;

export default function QuizOption({ option, variant = 'default', disabled = false, index, onClick }: QuizOptionProps) {
  let icon = null;
  switch (variant) {
    case 'correct':
      icon = <SuccessIcon />;
      break;
    case 'incorrect':
      icon = <ErrorIcon />;
      break;
  }

  return (
    <button
      className={twMerge(
        'bg-white-100 flex w-full cursor-pointer items-center justify-center gap-10 rounded-xl py-16',
        'disabled:cursor-not-allowed disabled:opacity-30', // 비활성화 상태일 때
        VARIANT_CLASSNAME[variant],
      )}
      disabled={disabled}
      onClick={() => {
        // 눌린 선택지의 index를 외부로 반환
        if (index === undefined || index === null) return;
        onClick?.(index);
      }}
    >
      {icon}
      <p className='text-body-2'>{option}</p>
    </button>
  );
}
