import { CounterContext } from './context';

/**
 * === Root Component ===
 */
export interface RootProps {
  count: number;
  onChange: (value: number) => void;
  min?: number | null;
  max?: number | null;
  step?: number;
  children?: React.ReactNode;
}
export function CounterRoot({ count, onChange, min = null, max = null, step = 1, children }: RootProps) {
  return <CounterContext.Provider value={{ count, onChange, min, max, step }}>{children}</CounterContext.Provider>;
}

export const Root = CounterRoot;
