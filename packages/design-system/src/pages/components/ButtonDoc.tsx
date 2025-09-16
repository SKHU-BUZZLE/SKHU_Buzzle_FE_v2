import Button from '@components/Button';
import { MoonIcon, SunIcon } from '@components/icons';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import StatelessPlayground, { type Spec } from '@layouts/StatelessPlayground';

export default function ButtonDoc() {
  // extraScope로 넘겨서 handler 및 icon을 select로 연결할 수 있게 함
  const extraScope = {
    onClickAlert: () => alert('Clicked!'),
    onClickAlert2: () => alert('Clicked! 2'),
    onClickAlert3: () => alert('Clicked! 3'),
    SunIcon,
    MoonIcon,
  };

  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}
      {/* 화면 꽉차게 */}
      <MarkdownViewer content={full} />
      <Button className='w-full' onClick={() => {}}>
        꽉 채운 버튼
      </Button>

      {/* 1:1 비율 */}
      <MarkdownViewer content={half} />
      <div className='flex gap-8'>
        <Button className='flex-1' variant='secondary' onClick={() => {}}>
          버튼 1
        </Button>
        <Button className='flex-1' onClick={() => {}}>
          버튼 2
        </Button>
      </div>

      {/* 아이콘만 */}
      <MarkdownViewer content={iconOnly} />
      <Button
        iconOnly
        leftIcon={<MoonIcon className='size-20 text-yellow-500' />}
        size='md'
        variant='outline'
        onClick={() => {}}
      />

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
      <MarkdownViewer content={note} />
      <StatelessPlayground
        component={Button}
        extraScope={extraScope}
        initialProps={{
          children: '버튼',
          variant: 'primary',
          size: 'lg',
          round: 'rounded',
          loading: false,
          disabled: false,
          iconOnly: false,
        }}
        specs={playgroundSpecs}
      />
    </div>
  );
}

const description = `
# Button

디자인 시스템 공용 **Button** 컴포넌트입니다.

- \`variant / size / round\`을 조합하여 스타일할 수 있습니다.
- \`loading\` 상태에선 로딩 스피너가 회전하고 버튼이 비활성화 됩니다.
- \`disabled\` 상태에선 클릭이 금지됩니다.
- 버튼의 연타 방지를 위해 내부적으로 **0.5초 쿨다운**을 제공합니다.
- \`children\`은 **문자열 / \`<span>\` / \`<p>\`** 만 유효하며 그 외에는 필터링됩니다. 
- \`leftIcon / rightIcon\`을 통해 아이콘을 정해진 위치에 배치할 수 있습니다.
- 기본적으로 아이콘의 색은 버튼 내부 글자 색과 동일하며, **아이콘 컴포넌트 자체를 props로 전달하기 때문에 버튼에서 따로 아이콘 스타일을 확장하지 않습니다.**  
- \`iconOnly\`으로 아이콘만 보여지는 버튼을 사용할 수 있습니다.
`;

const full = `
## 추가 팁!

화면을 버튼으로 꽉 채우고 싶다면 \`w-full\`을 사용해주세요.
\`\`\`
<Button className='w-full' onClick={() => {}}>
  꽉 채운 버튼
</Button>
\`\`\`
`;

const half = `
버튼 내부는 flex로 되어 있습니다.  
만약 화면을 일정 비율(ex. 1:1, 1:2...)로 채우고 싶다면 \`flex-n\`을 사용해주세요.  
아래 예시는 1:1 비율입니다.
\`\`\`
<div className='flex gap-8'>
  <Button className='flex-1' variant='secondary' onClick={() => {}}>
    버튼 1
  </Button>
  <Button className='flex-1' onClick={() => {}}>
    버튼 2
  </Button>
</div>
\`\`\`
`;

const iconOnly = `
\`iconOnly\`가 \`true\`일 때는 텍스트가 있더라도 아이콘만 보여집니다.  
또한 \`size\`를 통해 아이콘 전용 버튼의 크기를 조정할 수 있습니다.  
(\`iconOnly\`를 사용하지 않고 \`className\`의 확장만으로도 가능합니다.)
\`\`\`
<Button
  iconOnly
  leftIcon={<MoonIcon className='size-20 text-yellow-500' />}
  size="md"
  variant='outline'
  onClick={() => {}}
/>
\`\`\`
`;

const note = `
실제로 사용할 때 아이콘의 스타일 변경은 props에 전달할 때 적용합니다.  
따라서 playground에서 사용할 때는 아이콘을 추가 후 className을 수정하실 수 있습니다.
`;

const propsSpecs = [
  {
    propName: 'children',
    type: ['ReactNode'],
    required: false,
    description: '버튼에 표시할 콘텐츠 (문자열, <span>, <p> 만 유효)',
  },
  {
    propName: 'onClick',
    type: ['handler'],
    options: ['onClickAlert', 'onClickAlert2', 'onClickAlert3'],
    required: true,
    description: '버튼 클릭 이벤트 핸들러로, 로딩/비활성/쿨다운 시 실행되지 않음',
  },
  {
    propName: 'variant',
    type: ['string'],
    options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    defaultValue: 'primary',
    description: '버튼 스타일',
  },
  {
    propName: 'type',
    type: ['string'],
    options: ['button', 'submit', 'reset'],
    defaultValue: 'button',
    description: '버튼 타입',
  },
  {
    propName: 'ref',
    type: ['Ref<HTMLButtonElement>'],
    defaultValue: '',
    description: '버튼 DOM에 접근하기 위한 ref',
  },
  {
    propName: 'size',
    type: ['string'],
    options: ['lg', 'md', 'sm'],
    defaultValue: 'lg',
    description: '버튼 크기',
  },
  {
    propName: 'round',
    type: ['string'],
    options: ['rounded', 'circular', 'square'],
    defaultValue: 'rounded',
    description: '모서리 형태',
  },
  {
    propName: 'loading',
    type: ['boolean'],
    defaultValue: 'false',
    description: '로딩 상태로, 스피너 표시 및 클릭 차단',
  },
  {
    propName: 'disabled',
    type: ['boolean'],
    defaultValue: 'false',
    description: '비활성화 상태로, 시각적 디밍 및 클릭 차단',
  },
  {
    propName: 'leftIcon',
    type: ['ReactNode'],
    description: '왼쪽 아이콘 (아이콘 컴포넌트만 유효)',
  },
  {
    propName: 'rightIcon',
    type: ['ReactNode'],
    description: '오른쪽 아이콘 (아이콘 컴포넌트만 유효)',
  },
  {
    propName: 'className',
    type: ['string'],
    description: '외부 스타일 클래스 확장',
  },
  {
    propName: 'iconOnly',
    type: ['boolean'],
    description: '아이콘 전용 버튼 여부로, true라면 텍스트는 숨김',
  },
];

const playgroundSpecs = [
  { type: 'text', propName: 'children', label: 'button text' },
  { type: 'boolean', propName: 'loading', label: 'loading' },
  { type: 'boolean', propName: 'disabled', label: 'disabled' },
  { type: 'select', propName: 'variant', options: ['primary', 'secondary', 'outline', 'ghost', 'danger'] },
  { type: 'select', propName: 'size', options: ['lg', 'md', 'sm'] },
  { type: 'select', propName: 'round', options: ['rounded', 'circular', 'square'] },
  { type: 'text', propName: 'className', label: 'className' },
  { type: 'boolean', propName: 'iconOnly', label: 'icon only' },
  { type: 'node', propName: 'leftIcon', options: ['MoonIcon', 'SunIcon'], label: 'left icon' },
  { type: 'node', propName: 'rightIcon', options: ['MoonIcon', 'SunIcon'], label: 'right icon' },
  {
    type: 'handler',
    propName: 'onClick',
    options: ['onClickAlert', 'onClickAlert2', 'onClickAlert3'],
    label: 'onClick',
  },
] satisfies ReadonlyArray<Spec>;
