import { Counter } from '@components/Counter';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import StatefulPlayground from '@layouts/StatefulPlayground';
import { useEffect, useState } from 'react';

export default function CounterDoc() {
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    console.log('count: ', count);
  }, [count]);

  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <MarkdownViewer content='### Counter.Root' />
      <PropsSpecTable specs={rootPropsSpecs} />

      <MarkdownViewer content='### Counter.Down' />
      <PropsSpecTable specs={btnPropsSpecs} />

      <MarkdownViewer content='### Counter.Value' />
      <PropsSpecTable specs={valuePropsSpecs} />

      <MarkdownViewer content='### Counter.Up' />
      <PropsSpecTable specs={btnPropsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}
      {/* <Counter.Root count={count} onChange={setCount}>
        <div className='flex items-center gap-12'>
          <Counter.Down />
          <Counter.Value />
          <Counter.Up />
        </div>
      </Counter.Root> */}

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
      <StatefulPlayground code={code} extraScope={{ Counter }} />

      <MarkdownViewer content={note} />
      <div className='ds-theme-bg-muted w-full rounded-2xl p-24'>
        <Counter.Root count={count} max={10} min={1} onChange={setCount}>
          <div className='flex justify-between gap-12'>
            <Counter.Value className='text-primary-500 ds-typ-title-1' unit='명' />
            <div className='flex gap-8'>
              <Counter.Down className='text-black-200 dark:text-black-100 size-24' />
              <Counter.Up className='text-black-200 dark:text-black-100 size-24' />
            </div>
          </div>
        </Counter.Root>
        <p className='ds-typ-body-3 ds-text-caption mt-8'>최대 10명의 친구를 초대할 수 있어요</p>
      </div>
    </div>
  );
}

const description = `
# Counter
Counter 컴포넌트는 숫자 값을 -/+ 버튼으로 증감시키는 데 사용되는 컴포넌트입니다.  
\`<CounterRoot>\` 하위에 \`CounterDown\`, \`CounterValue\`, \`CounterUp\`의 합성 컴포넌트 구조로 되어 있습니다.  
또한 \`min\`, \`max\`, \`step\`을 통해 값의 범위와 단위를 제어할 수 있습니다.

- \`CounterRoot\` : 카운터 상태(Context) 제공  
- \`CounterDown\` : 값을 감소시키는 버튼  
- \`CounterValue\` : 현재 값과 단위를 표시  
- \`CounterUp\` : 값을 증가시키는 버튼  
`;

const note = `
### InviteCounter
참여 인원의 도메인을 추가한 \`InviteCounter\`는 서비스 내에서 개발했으며, 아래와 같습니다.  
`;

const rootPropsSpecs = [
  {
    propName: 'count',
    type: ['number'],
    description: '현재 카운터 값입니다.',
    required: true,
  },
  {
    propName: 'onChange',
    type: ['function'],
    description: '카운터 값이 변경될 때 호출되는 콜백입니다. (예: (value: number) => void)',
    required: true,
  },
  {
    propName: 'min',
    type: ['number', 'null'],
    description: '허용되는 최소값입니다. null일 경우 최소 제한이 없습니다.',
    required: false,
    defaultValue: 'null',
  },
  {
    propName: 'max',
    type: ['number', 'null'],
    description: '허용되는 최대값입니다. null일 경우 최대 제한이 없습니다.',
    required: false,
    defaultValue: 'null',
  },
  {
    propName: 'step',
    type: ['number'],
    description: '값을 증가/감소시킬 때의 단위입니다.',
    required: false,
    defaultValue: '1',
  },
  {
    propName: 'children',
    type: ['ReactNode'],
    description: '`CounterDown`, `CounterValue`, `CounterUp` 등 하위 컴포넌트들을 배치합니다.',
    required: false,
  },
];

const btnPropsSpecs = [
  {
    propName: 'className',
    type: ['string'],
    description: '아이콘 스타일에 추가할 TailwindCSS 클래스입니다.',
    required: false,
  },
];

const valuePropsSpecs = [
  {
    propName: 'className',
    type: ['string'],
    description: '컴포넌트에 추가할 TailwindCSS 클래스입니다.',
    required: false,
  },
  {
    propName: 'unit',
    type: ['string'],
    description: '카운트 값 옆에 표시할 단위입니다. (예: "명", "개", "점")',
    required: false,
  },
];

const code = `
function Demo() {
  const [count, setCount] = useState(0);

   return (
    <Counter.Root count={count} onChange={setCount}>
      <div className='flex items-center gap-12'>
        <Counter.Down />
        <Counter.Value />
        <Counter.Up />
      </div>
    </Counter.Root>
  );
}
 render(<Demo />);
`;
