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
 * - 이 컴포넌트는 **상태/접근성 래퍼**만 담당하며, UI는 `children` 조합으로 구성합니다.
 * - `mode` 값에 따라 사용할 수 있는 하위 컴포넌트가 달라집니다:
 *   - `mode="option"`: `<Radio.Option>`만 사용 가능 (점형 라디오 UI)
 *   - `mode="card"`:   `<Radio.Card>`만 사용 가능 (카드형 라디오 UI)
 * - **권장 구조**:
 *   - `<Radio.Title>`: 그룹 제목 (없을 경우 `ariaLabel`을 직접 지정해야 함)
 *   - `<Radio.Items>`: 옵션/카드들을 감싸는 컨테이너 (세로/그리드/간격 등 레이아웃 담당)
 * - **접근성 규칙(A11y)**:
 *   - `ariaLabel`이 있으면 `aria-label`로 그룹 이름을 제공합니다.
 *   - `ariaLabel`이 없으면 `aria-labelledby={titleId}`로 연결되므로,
 *     같은 트리 안에 `<Radio.Title />`을 반드시 렌더링해야 합니다.
 * - `name`을 생략하면 `useId()`로 고유 그룹명이 자동 생성됩니다.
 *   폼 전송이나 폼 라이브러리 연동 시에는 의미 있는 `name`을 지정하는 것이 좋습니다.
 *
 * @example
 * // 카드형 (아이템은 그리드 배치)
 * <Radio.Root value={cat} onChange={setCat} mode="card" ariaLabel="카테고리 선택">
 *   <Radio.Title>카테고리</Radio.Title>
 *   <Radio.Items className="grid grid-cols-4 gap-8">
 *     {categories.map(c => (
 *       <Radio.Card key={c.value} value={c.value} icon={c.icon} label={c.label} />
 *     ))}
 *   </Radio.Items>
 * </Radio.Root>
 *
 * @example
 * // 점형 (세로 스택 배치)
 * <Radio.Root value={density} onChange={setDensity} mode="option">
 *   <Radio.Title>밀도</Radio.Title>
 *   <Radio.Items className="flex flex-col gap-10">
 *     <Radio.Option value="default">기본</Radio.Option>
 *     <Radio.Option value="comfortable">보통</Radio.Option>
 *   </Radio.Items>
 * </Radio.Root>
 */
function RadioRoot({ value, onChange, mode, name, className, ariaLabel, children }: RadioRootProps) {
  const reactId = useId();
  const groupName = name || `radio-group-${reactId}`;
  const titleId = `radio-group-title-${reactId}`;

  const ariaProps = {
    'aria-label': ariaLabel || undefined,
    'aria-labelledby': ariaLabel ? undefined : titleId,
  };

  return (
    <RadioGroupContext.Provider value={{ name: groupName, value, onChange, titleId, mode }}>
      <div role='radiogroup' {...ariaProps} className={twMerge('flex flex-col gap-16', className)}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export const Root = RadioRoot;
