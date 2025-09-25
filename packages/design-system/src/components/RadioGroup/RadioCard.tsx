import { type HTMLMotionProps, motion } from 'motion/react';
import { twMerge } from 'tailwind-merge';

import { useRadioGroupContext } from './RadioGroupContext';
import type { RadioCardProps } from './types';

const MotionLabel = motion.label;

// 링크/카드에서 쓰던 모션 재사용 (리터럴 좁히기로 타입 오류 방지)
const cardMotion = {
  transition: { type: 'spring', stiffness: 300, damping: 20 },
  whileHover: { scale: 0.96 },
  whileTap: { scale: 0.92 },
} satisfies Pick<HTMLMotionProps<'label'>, 'transition' | 'whileHover' | 'whileTap'>;

/**
 * @component RadioCard
 * @description 카드형 라디오 옵션(아이콘/라벨 세로 배치, gap-4, 중앙 정렬).
 * - mode="card"에서만 사용 가능.
 * - 커스텀 children은 받지 않고, icon/label만으로 자동 레이아웃합니다.
 */
function RadioCard({ value, icon, label, className, disabled }: RadioCardProps) {
  const { name, value: selected, onChange, mode } = useRadioGroupContext();

  if (mode !== 'card') {
    throw new Error('Radio.Card는 Radio.Root(mode="card")에서만 사용할 수 있습니다.');
  }

  const isChecked = selected === value;

  // base: 카드 기본 상태
  const base =
    'relative flex items-center justify-center rounded-2xl px-16 py-14 ' + // 레이아웃, 모양
    'bg-white-100 dark:bg-dm-black-600 text-black-200 dark:text-black-100 ds-typ-body-3 ' + // 기본 배경/텍스트
    'hover:bg-primary-500/5 dark:hover:bg-[#0656D7]/10 ' + // hover 상태
    'active:bg-primary-500/10 dark:active:bg-[#0656D7]/20 active:text-primary-500'; // active 상태

  // state: 선택(checked) 상태
  const state = isChecked ? 'bg-primary-500/10 dark:bg-[#0656D7]/30 text-primary-500 dark:text-primary-500' : '';

  // disabled: 비활성화 상태
  const disabledCls = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  // disabled일 땐 모션 제거
  const motionProps = disabled ? {} : cardMotion;

  // content: 아이콘 + 라벨 세로 정렬
  const content = (
    <span className='flex flex-col items-center justify-center gap-4 text-center'>
      {icon && (
        <span aria-hidden className='inline-flex'>
          {icon}
        </span>
      )}
      {label && <span className='inline-block'>{label}</span>}
    </span>
  );

  return (
    <MotionLabel {...motionProps} className={twMerge(base, state, disabledCls, className)}>
      <input
        checked={isChecked}
        className='sr-only'
        disabled={disabled}
        name={name}
        type='radio'
        value={String(value)}
        onChange={() => onChange(value)}
      />
      {content}
    </MotionLabel>
  );
}

export const Card = RadioCard;
