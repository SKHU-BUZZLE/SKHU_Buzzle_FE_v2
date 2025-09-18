import Slot from '@components/Slot';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';

export default function SlotDoc() {
  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}
      <Slot />

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
    </div>
  );
}

const description = `
# Slot
Slot 컴포넌트입니다.  
~~이곳에 자유롭게 설명을 작성합니다.~~
`;

const propsSpecs = [
  {
    propName: 'name',
    type: ['string', 'number', 'boolean'],
    description: 'prop에 대한 설명을 적어주세요.',
    required: true,
    defaultValue: 'value',
    options: ['1', '2', '3'],
  },
];