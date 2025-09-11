import React, { useMemo } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

/** react-live의 scope는 { 심볼이름: 실제값 }의 딕셔너리임을 반영한 Extras 타입 */
type Extras = Record<string, unknown>;

/**
 * StatefulPlayground
 *
 * `react-live`를 활용하여 **상태를 포함한 React 코드**를 실행하고 편집할 수 있는 컴포넌트입니다.
 * - `noInline` 모드이므로 `render(<Component />)` 형식의 코드 실행을 지원합니다.
 * - Playground에서 여러 개의 컴포넌트 조합을 넣거나 `useState`, `useEffect`와 같은 훅을 사용할 수 있습니다.
 * - 기본적으로 `React`, `useState`, `useEffect`가 scope에 포함되며, 필요하면 `extraScope`로 추가적인 스코프를 넘길 수 있습니다.
 *
 * @param props.code - 실행할 React 코드 문자열 (예: 함수 컴포넌트 + `render(<Component />)`)
 * @param props.extraScope - react-live 실행 스코프에 추가할 외부 심볼 딕셔너리
 *
 * @example
 * ```tsx
 * import StatefulPlayground from '@/layouts/StatefulPlayground';
 * import Button from '@/components/Button';
 *
 * const code = `
 * function Demo() {
 *   const [count, setCount] = useState(0);
 *
 *   useEffect(() => {
 *     console.log("Count changed:", count);
 *   }, [count]);
 *
 *   return (
 *     <Button onClick={() => setCount(count + 1)}>
 *       Count: {count}
 *     </Button>
 *   );
 * }
 *
 * render(<Demo />);
 * `;
 *
 * export default function ButtonDoc() {
 *   return <StatefulPlayground code={code} extraScope={{ Button }} />;
 * }
 * ```
 */
export default function StatefulPlayground({ code, extraScope = {} }: { code: string; extraScope?: Extras }) {
  /** react-live 실행 환경에서 제한할 스코프 범위 설정. 스코프는 변하지 않기 때문에 useMemo로 처리 */
  const scope = useMemo(
    () => ({ React, useState: React.useState, useEffect: React.useEffect, ...extraScope }),
    [extraScope],
  );

  return (
    <LiveProvider noInline code={code.trim()} scope={scope}>
      <div className='flex flex-col gap-12'>
        <div className='bg-surface border-surface min-h-xl mb-4 flex flex-col justify-center overflow-auto rounded-2xl border px-12 py-12'>
          <LivePreview />
        </div>

        <div className='flex flex-col gap-8'>
          <LiveEditor className='rounded-2xl bg-[#011627] p-5 font-mono text-sm text-white' />
          <LiveError className='text-error-red-500 mt-2 text-sm' />
        </div>
      </div>
    </LiveProvider>
  );
}
