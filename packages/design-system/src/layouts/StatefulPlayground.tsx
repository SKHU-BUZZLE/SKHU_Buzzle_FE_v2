import React, { useMemo } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

/** react-live의 scope는 { 심볼이름: 실제값 }의 딕셔너리임을 반영한 Extras 타입 */
type Extras = Record<string, unknown>;

export default function StatefulPlayground({ code, extraScope = {} }: { code: string; extraScope?: Extras }) {
  /** react-live 실행 환경에서 제한할 스코프 범위 설정. 스코프는 변하지 않기 때문에 useMemo로 처리 */
  const scope = useMemo(
    () => ({ React, useState: React.useState, useEffect: React.useEffect, ...extraScope }),
    [extraScope],
  );

  return (
    <LiveProvider noInline code={code.trim()} scope={scope}>
      <div className='flex flex-col gap-12'>
        <div className='bg-white-50 border-white-200 min-h-xl mb-4 flex flex-col justify-center overflow-auto rounded-2xl border px-12 py-12'>
          <LivePreview />
        </div>

        <div className='flex flex-col gap-8'>
          <LiveEditor className='rounded-2xl bg-[#0B1522] p-5 font-mono text-sm text-white' />
          <LiveError className='text-error-red-500 mt-2 text-sm' />
        </div>
      </div>
    </LiveProvider>
  );
}
