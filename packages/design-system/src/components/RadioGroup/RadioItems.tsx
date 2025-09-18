import { twMerge } from 'tailwind-merge';

import type { RadioItemsProps } from './types';

/**
 * @component RadioItems
 * @description 옵션/카드를 배치하는 컨테이너 슬롯(세로/그리드/간격 등 레이아웃 담당).
 */
function RadioItems({ className, children }: RadioItemsProps) {
  return <div className={twMerge('flex flex-col gap-12', className)}>{children}</div>;
}

export const Items = RadioItems;
