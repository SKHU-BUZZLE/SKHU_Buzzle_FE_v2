import { twMerge } from 'tailwind-merge';

import { useRadioGroupContext } from './RadioGroupContext';
import type { RadioTitleProps } from './types';

/**
 * @component RadioTitle
 * @description 라디오 그룹의 제목 요소를 렌더링합니다(aria-labelledby 연결용 id 사용).
 *
 * @example
 * <Radio.Root ...>
 *   <Radio.Title className="mb-8 text-16 font-medium">카테고리</Radio.Title>
 *   ...
 * </Radio.Root>
 */
function RadioTitle({ children, className }: RadioTitleProps) {
  const { titleId } = useRadioGroupContext();

  return (
    <h2 className={twMerge('ds-typ-title-2 ds-text-strong', className)} id={titleId}>
      {children}
    </h2>
  );
}

export const Title = RadioTitle;
