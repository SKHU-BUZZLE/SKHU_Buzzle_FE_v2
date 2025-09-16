import * as Icons from '@components/icons';
import Radio from '@components/RadioGroup';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import StatefulPlayground from '@layouts/StatefulPlayground';

export default function RadioGroupDoc() {
  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
      <StatefulPlayground code={CardCode} extraScope={{ Radio, Icons }} />
      <StatefulPlayground code={OptionCode} extraScope={{ Radio, Icons }} />
    </div>
  );
}

const description = `
# Radio (Composite)

한 그룹 내에서 하나만 선택할 수 있는 라디오 컴포넌트를 합성 패턴으로 제공합니다.  
\`Radio.Root\`가 상태/접근성 컨텍스트를 제공하고, \`Radio.Title\`, \`Radio.Items\`, \`Radio.Option\`, \`Radio.Card\`를 조합해 UI를 구성합니다.  

- 두 가지 모드: \`mode="option"\`(점형), \`mode="card"\`(카드형)  
- Option과 Card는 혼용할 수 없습니다.  
- 그룹 레이아웃(세로, 그리드 등)은 \`Radio.Items\`의 \`className\`으로 제어합니다.  
- 개별 카드/옵션 스타일은 각 \`className\`으로 확장합니다.  

## 접근성(A11y)  
- 그룹 레벨: \`Radio.Root\`는 \`role="radiogroup"\`를 가집니다.  
  - \`ariaLabel\`이 있으면 \`aria-label\` 속성을 사용합니다.  
  - \`ariaLabel\`이 없으면 \`aria-labelledby\`로 \`<Radio.Title>\`을 참조합니다.  
- 항목 레벨: \`<label>\`로 감싸져 라벨 텍스트가 자동으로 라디오의 접근성 이름이 됩니다.  
- 키보드: 기본 라디오 키보드 조작(↑/↓/←/→)을 지원합니다.  

## 주의사항  
- Option/Card 혼용 금지: \`mode="option"\` → \`<Radio.Option>\`만, \`mode="card"\` → \`<Radio.Card>\`만 사용하세요.  
- \`name\`을 지정하지 않으면 자동 생성되지만, 폼 전송이나 폼 라이브러리 연동 시엔 의미 있는 값을 지정하는 것이 좋습니다.  
`;

const propsSpecs = [
  // Root
  { propName: 'value (Root)', type: ['string', 'number'], description: '현재 선택된 값', required: true },
  {
    propName: 'onChange (Root)',
    type: ['(next: string | number) => void'],
    description: '선택 변경 시 호출되는 콜백 함수',
    required: true,
  },
  {
    propName: 'mode (Root)',
    type: ['"option"', '"card"'],
    description: '라디오 UI 모드 (option=점형, card=카드형). 혼용 불가',
    required: true,
    options: ['option', 'card'],
  },
  {
    propName: 'name (Root)',
    type: ['string'],
    description: '같은 그룹을 식별하는 radio name. 지정하지 않으면 자동 생성',
    required: false,
    defaultValue: 'auto',
  },
  { propName: 'className (Root)', type: ['string'], description: 'radiogroup 컨테이너 클래스', required: false },
  { propName: 'ariaLabel (Root)', type: ['string'], description: '제목이 없을 때 그룹의 접근성 이름', required: false },
  {
    propName: 'children (Root)',
    type: ['ReactNode'],
    description: '내부에 렌더링될 Title / Items / Option / Card',
    required: true,
  },

  // Title
  { propName: 'children (Title)', type: ['ReactNode'], description: '그룹 제목 텍스트 또는 노드', required: false },
  { propName: 'className (Title)', type: ['string'], description: '제목 요소의 클래스', required: false },

  // Items
  {
    propName: 'children (Items)',
    type: ['ReactNode'],
    description: 'Option 또는 Card들을 감싸는 컨테이너',
    required: true,
  },
  {
    propName: 'className (Items)',
    type: ['string'],
    description: '레이아웃 제어 (세로/그리드/간격 등)',
    required: false,
    defaultValue: 'flex flex-col gap-12',
  },

  // Option
  { propName: 'value (Option)', type: ['string', 'number'], description: '옵션 값', required: true },
  { propName: 'children (Option)', type: ['ReactNode'], description: '라벨/아이콘 등 자유 구성', required: false },
  { propName: 'className (Option)', type: ['string'], description: '옵션 래퍼(label) 클래스', required: false },
  {
    propName: 'inputClassName (Option)',
    type: ['string'],
    description: '네이티브 input에 적용할 클래스 (크기/색: accent-*, size-*)',
    required: false,
  },
  {
    propName: 'disabled (Option)',
    type: ['boolean'],
    description: '비활성화 여부',
    required: false,
    defaultValue: 'false',
  },

  // Card
  { propName: 'value (Card)', type: ['string', 'number'], description: '옵션 값', required: true },
  { propName: 'icon (Card)', type: ['ReactNode'], description: '아이콘 노드 (없으면 미표시)', required: false },
  { propName: 'label (Card)', type: ['ReactNode'], description: '텍스트 라벨 (없으면 미표시)', required: false },
  {
    propName: 'className (Card)',
    type: ['string'],
    description: '카드 컨테이너 클래스 (배경/라운드/색상 확장)',
    required: false,
  },
  {
    propName: 'disabled (Card)',
    type: ['boolean'],
    description: '비활성화 여부',
    required: false,
    defaultValue: 'false',
  },
];

const OptionCode = `
function RadioOptionDemo() {
  const [value, setValue] = React.useState('default');

  return (
    <div className="p-20 rounded-16 bg-white-50 dark:bg-dm-black-700">
      <Radio.Root value={value} onChange={setValue} mode="option" className="w-full" ariaLabel="밀도 선택">
        <Radio.Title className="mb-8 text-16 font-semibold">밀도</Radio.Title>

        <Radio.Items className="flex flex-col gap-12">
          <Radio.Option value="default" className="inline-flex items-center gap-8">기본</Radio.Option>
          <Radio.Option value="comfortable" className="inline-flex items-center gap-8">보통</Radio.Option>
          <Radio.Option value="compact" className="inline-flex items-center gap-8">촘촘</Radio.Option>
        </Radio.Items>
      </Radio.Root>
    </div>
  );
}
render(<RadioOptionDemo />);
`;

const CardCode = `
function RadioCardDemo() {
  const [cat, setCat] = React.useState('all');

  const categories = [
    { value: 'all',     icon: <Icons.BookIcon />, label: '전체' },
    { value: 'economy', icon: <Icons.EconomyIcon />, label: '경제/사회' },
    { value: 'science', icon: <Icons.ScienceIcon />, label: '과학/기술' },
    { value: 'art',     icon: <Icons.CultureIcon />, label: '문화/예술' },
    { value: 'sports',  icon: <Icons.SportsIcon />, label: '스포츠' },
    { value: 'history', icon: <Icons.HistoryIcon />, label: '역사' },
    { value: 'nature',  icon: <Icons.NatureIcon />, label: '자연' },
    { value: 'etc',     icon: <Icons.TriviaIcon />, label: '잡학' },
  ];

  return (
    <Radio.Root value={cat} onChange={setCat} mode="card" className="w-full">
      <Radio.Title>카테고리</Radio.Title>

      <Radio.Items className="grid grid-cols-4 gap-8">
        {categories.map(c => (
          <Radio.Card key={c.value} value={c.value} icon={c.icon} label={c.label} />
        ))}
      </Radio.Items>
    </Radio.Root>
  );
}
render(<RadioCardDemo />);
`;
