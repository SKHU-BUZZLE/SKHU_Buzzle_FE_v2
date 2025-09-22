import { Counter } from '@buzzle/design';

/**
 * QuestionCounter
 * @description 싱글 퀴즈에서 문제 수를 조절하는 카운터 컴포넌트입니다.
 * - 내부적으로 디자인 시스템의 `Counter` 컴포넌트를 사용합니다.
 * - 최소 1문제, 최대 10문제까지 선택할 수 있도록 제한되어 있습니다.
 *
 * @param {number} props.count - 현재 선택된 문제 수
 * @param {(value: number) => void} props.setCount - 문제 수 변경 시 호출되는 콜백 함수
 *
 * @example
 * ```tsx
 * const [count, setCount] = useState(1);
 *
 * <QuestionCounter count={count} setCount={setCount} />
 * ```
 *
 * @remarks
 * - API 요청 시 선택한 문제 수를 전달할 수 있도록,
 *   외부 상태(`count`, `setCount`)를 props로 전달받아 제어형 컴포넌트로 동작합니다.
 */
export default function QuestionCounter({ count, setCount }: { count: number; setCount: (value: number) => void }) {
  return (
    <div className='ds-theme-bg-muted w-full rounded-2xl p-24'>
      <Counter.Root count={count} max={10} min={1} onChange={setCount}>
        <div className='flex justify-between gap-12'>
          <Counter.Value className='text-primary-500 ds-typ-title-1' unit='문제' />
          <div className='flex gap-8'>
            <Counter.Down className='text-black-200 dark:text-black-100 size-24' />
            <Counter.Up className='text-black-200 dark:text-black-100 size-24' />
          </div>
        </div>
      </Counter.Root>
      <p className='ds-typ-body-3 ds-text-caption mt-8'>최대 10문제까지 선택할 수 있어요</p>
    </div>
  );
}
