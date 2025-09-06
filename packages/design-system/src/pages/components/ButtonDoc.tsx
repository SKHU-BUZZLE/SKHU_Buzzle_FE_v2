import Button from '@components/Button';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import StatelessPlayground, { type Spec } from '@layouts/StatelessPlayground';

export default function ButtonDoc() {
  // handler들을 extraScope로 넘겨서 handler select로 연결할 수 있게 함
  const handlers = {
    onClickAlert: () => alert('Clicked!'),
    onClickAlert2: () => alert('Clicked! 2'),
    onClickAlert3: () => alert('Clicked! 3'),
  };

  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
      <StatelessPlayground
        component={Button}
        extraScope={handlers}
        initialProps={{
          children: '버튼',
          variant: 'primary',
          size: 'xs',
          round: 'rounded',
          loading: false,
          disabled: false,
        }}
        specs={playgroundSpecs}
      />
    </div>
  );
}

const description = `
# Button
Button 컴포넌트입니다.  
`;

const propsSpecs = [
  {
    type: ['string', 'number', 'boolean'],
    propName: 'children',
    required: true,
    description: '버튼에 보여질 텍스트입니다.',
  },
  {
    type: ['string'],
    propName: 'variant',
    defaultValue: 'primary',
    options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    description: '버튼의 색상을 선택합니다.',
    required: true,
  },
  {
    type: ['string'],
    propName: 'size',
    options: ['xl', 'lg', 'md', 'sm', 'xs'],
    defaultValue: 'md',
    description: '버튼의 크기를 선택합니다.',
    required: true,
  },
  {
    type: ['string'],
    propName: 'round',
    options: ['rounded', 'circular', 'square'],
    defaultValue: 'rounded',
    description: '버튼의 모서리 스타일을 선택합니다.',
  },
  {
    type: ['boolean'],
    propName: 'loading',
    defaultValue: 'false',
    description: '버튼 로딩 여부를 나타냅니다.',
  },
  {
    type: ['boolean'],
    propName: 'disabled',
    defaultValue: 'false',
    description: '버튼 비활성화 여부를 나타냅니다.',
  },
  {
    type: ['string'],
    propName: 'className',
    description: '버튼 외부에서 스타일을 확장할 수 있습니다.',
  },
  {
    type: ['string'],
    propName: 'onClick',
    options: ['onClickAlert', 'onClickAlert2', 'onClickAlert3'],
    description: '버튼 클릭 이벤트 핸들러입니다.',
  },
];

const playgroundSpecs = [
  { type: 'text', propName: 'children', label: 'button text' },
  { type: 'select', propName: 'variant', options: ['primary', 'secondary', 'outline', 'ghost', 'danger'] },
  { type: 'select', propName: 'size', options: ['xl', 'lg', 'md', 'sm', 'xs'] },
  { type: 'select', propName: 'round', options: ['rounded', 'circular', 'square'] },
  { type: 'boolean', propName: 'loading' },
  { type: 'boolean', propName: 'disabled' },
  { type: 'text', propName: 'className', label: 'className' },
  {
    type: 'handler',
    propName: 'onClick',
    options: ['onClickAlert', 'onClickAlert2', 'onClickAlert3'],
    label: 'onClick',
  },
] satisfies ReadonlyArray<Spec>;
