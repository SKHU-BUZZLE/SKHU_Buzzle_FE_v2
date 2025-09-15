import { createContext, useContext } from 'react';

import type { RadioGroupContextType } from './types';

/**
 * @description Radio 컴포넌트들 간의 상태를 공유하는 Context
 */
export const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

/**
 * @description Radio Context를 사용하는 Hook
 * @returns {RadioGroupContextType} Radio Context 값
 * @throws {Error} Radio.Root 외부에서 사용할 경우 에러 발생
 *
 * @example
 * ```tsx
 * function MyRadioComponent() {
 *   const { value, onChange, mode } = useRadioGroupContext();
 *   // ...
 * }
 * ```
 */
export function useRadioGroupContext(): RadioGroupContextType {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('Radio 컴포넌트는 <Radio.Root> 내부에서만 사용할 수 있습니다.');
  }
  return context;
}
