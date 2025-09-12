import LifeCounter from '@components/LifeCounter';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import StatelessPlayground, { type Spec } from '@layouts/StatelessPlayground';

export default function LifeCounterDoc() {
  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}
      {/* <LifeCounter life={30} /> */}

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
      <StatelessPlayground component={LifeCounter} initialProps={{ life: 0 }} specs={specs} />
    </div>
  );
}

const description = `
# LifeCounter
남은 생명을 확인하는 LifeCounter 컴포넌트입니다.  

`;

const propsSpecs = [
  {
    propName: 'life',
    type: ['number'],
    description: '남은 생명 수',
    required: true,
    defaultValue: '0',
  },
];

const specs = [{ type: 'text', propName: 'life', label: 'Life' }] satisfies ReadonlyArray<Spec>;
