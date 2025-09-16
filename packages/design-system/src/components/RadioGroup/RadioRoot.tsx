import { useId } from 'react';
import { twMerge } from 'tailwind-merge';

import { RadioGroupContext } from './RadioGroupContext';
import type { RadioRootProps } from './types';

/**
 * @component RadioRoot
 * @description
 * 라디오 그룹의 상태(`value`, `onChange`, `name`, `mode`, `titleId`)를 Context로 제공하고,
 * 접근성 속성(`role="radiogroup"`)을 가진 컨테이너를 렌더링합니다.
 *
 * - 이 컴포넌트는 **상태/접근성 래퍼**만 담당하고, UI는 `children`으로 조합합니다.
 * - `mode`에 따라 내부에서 사용할 수 있는 하위 컴포넌트가 달라집니다.
 *   - `mode="option"`: `<Radio.Option>`만 사용 (점형 라디오 UI)
 *   - `mode="card"`:   `<Radio.Card>`만 사용 (카드형 라디오 UI)
 * - **접근성 규칙(A11y)**:
 *   - `ariaLabel`이 **있으면** `aria-label`을 사용합니다. (제목 없이도 그룹 이름이 읽힘)
 *   - `ariaLabel`이 **없으면** `aria-labelledby={titleId}`를 사용하므로,
 *     같은 트리 안에 `<Radio.Title />`을 함께 렌더링해야 합니다.
 * - `name`을 주지 않으면 `useId()`로 고유 그룹명이 자동 생성됩니다.
 *   폼 전송/폼 라이브러리 연동 시에는 의미 있는 `name`을 명시적으로 넘겨주세요.
 *
 * @example
 * // 카드형(그리드 배치, 제목 없이 aria-label 사용)
 * <Radio.Root
 *   value={cat}
 *   onChange={setCat}
 *   mode="card"
 *   className="mt-20"
 *   containerClassName="grid grid-cols-4 gap-12"
 *   ariaLabel="퀴즈 카테고리 선택"
 * >
 *   {CATS.map(({ key, label }) => (
 *     <Radio.Card key={key} value={key} className="h-88">
 *       <span className="text-12">{label}</span>
 *     </Radio.Card>
 *   ))}
 * </Radio.Root>
 *
 * @example
 * // 점형(세로 스택 배치, 제목 사용 → aria-labelledby 자동 연결)
 * <Radio.Root
 *   value={density}
 *   onChange={setDensity}
 *   mode="option"
 *   className="p-16"
 *   containerClassName="flex flex-col gap-10"
 * >
 *   <Radio.Title className="mb-8 text-16 font-medium">밀도</Radio.Title>
 *   <Radio.Option value="default" className="inline-flex items-center gap-8">
 *     <span>기본</span>
 *   </Radio.Option>
 *   <Radio.Option value="comfortable" className="inline-flex items-center gap-8">
 *     <span>보통</span>
 *   </Radio.Option>
 * </Radio.Root>
 */
function RadioRoot({
  value,
  onChange,
  mode,
  name,
  className,
  containerClassName,
  ariaLabel,
  children,
}: RadioRootProps) {
  const reactId = useId();
  const groupName = name || `radio-group-${reactId}`;
  const titleId = `radio-group-title-${reactId}`;

  const ariaProps = {
    'aria-label': ariaLabel || undefined,
    'aria-labelledby': ariaLabel ? undefined : titleId,
  };

  return (
    <RadioGroupContext.Provider value={{ name: groupName, value, onChange, titleId, mode }}>
      <div role='radiogroup' {...ariaProps} className={className}>
        <div className={twMerge('flex flex-col gap-16', containerClassName)}>{children}</div>
      </div>
    </RadioGroupContext.Provider>
  );
}

export const Root = RadioRoot;
