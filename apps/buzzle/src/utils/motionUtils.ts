import type { HTMLMotionProps } from 'motion/react';

// 페이드인
export const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 2, ease: 'easeInOut' },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
} satisfies Pick<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'exit'>;

// 아래에서 위로 올라오는 애니메이션
export const riseIn = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 500, damping: 32, mass: 0.6 },
  },
  exit: { y: 8, opacity: 0, transition: { duration: 0.18 } },
} satisfies Pick<HTMLMotionProps<'li'>, 'initial' | 'animate' | 'exit'>;

// fadeIn + riseIn
export const fadeRiseIn = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 180, damping: 20, mass: 0.6 } },
  exit: { y: 6, opacity: 0, transition: { duration: 0.2 } },
} satisfies Pick<HTMLMotionProps<'p'>, 'initial' | 'animate' | 'exit'>;

// 반복 바운스 애니메이션
export const bounceLoop = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 1.6, // 한 사이클 시간
      repeat: Infinity, // 무한 반복
      repeatType: 'loop', // 처음부터 반복
      ease: 'easeInOut', // 부드럽게
    },
  },
} satisfies Pick<HTMLMotionProps<'img'>, 'animate'>;

// 리스트에서 자식 요소에 딜레이를 주며 하나씩 애니메이션
export const listStagger = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.2 },
  },
} as const;
