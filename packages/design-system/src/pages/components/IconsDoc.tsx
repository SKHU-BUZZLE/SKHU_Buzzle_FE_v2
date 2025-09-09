import { HomeIcon } from '@components/icons';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';

export default function IconsDoc() {
  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}
      <ul className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
        {ICON_ITEMS.map(({ name, Component, className, props: iconProps }) => (
          <li key={name} className='flex min-h-32 flex-col items-center justify-center gap-4 rounded-2xl border p-6'>
            <Component className={className} {...iconProps} />
            <span className='text-body font-mono'>{name}</span>
          </li>
        ))}
      </ul>

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
    </div>
  );
}

const description = `
# Icons
아이콘 컴포넌트입니다.  
SVG를 기반으로 하며 Tailwind 유틸리티를 활용해 크기와 색상을 제어할 수 있습니다.

## 크기 (Size)
- 기본 아이콘 크기를 size로 변환해 적용 해뒀습니다.
- 다른 크기가 필요하면 \`className\`으로 \`size-*\` 유틸리티를 덮어쓰세요. 예: \`"size-24"\`.

## 색상 (Color)
- \`fill="currentColor"\`로 동작하므로 Tailwind의 \`text-*\` 유틸리티로 색상을 제어합니다.  
  예: \`"text-gray-900"\`, \`"text-primary-600"\`.

## 접근성 (A11y)
- 장식용이면 \`aria-hidden\`을 전달하세요: \`<HomeIcon aria-hidden />\`
- 의미를 전달해야 하면 \`aria-label\`을 제공하세요: \`<HomeIcon aria-label="홈" />\`

### 추가 A11y 활용 팁
- **상호작용이 필요한 아이콘**: 버튼이나 토글 역할일 경우 \`role="button"\`과 \`tabIndex=0\`를 함께 지정해 키보드 접근성을 보장하세요.
- **툴팁 제공**: \`title\` 속성을 사용하면 마우스 오버 시 툴팁이 노출되고 스크린리더에서도 읽힐 수 있습니다.
- **의미 중복 방지**: 아이콘 옆에 동일한 텍스트 레이블이 있을 경우, 아이콘에는 \`aria-hidden\`을 주어 스크린리더에 중복되지 않게 하는 것이 좋습니다.
- **상태 전달**: 알림, 에러, 성공 등 상태를 나타내는 아이콘은 \`aria-label="성공"\`, \`aria-label="에러"\`처럼 의미 있는 값을 제공하세요.

`;

const propsSpecs = [
  {
    propName: 'className',
    type: ['string'],
    description: 'Tailwind 유틸리티로 크기/색상을 지정합니다. ',
    required: false,
    defaultValue: '아이콘 기본 크기',
  },
  {
    propName: '...props',
    type: ['SVGProps<SVGSVGElement>'],
    description: '표준 SVG/접근성 속성을 전달할 수 있습니다 — aria-hidden(장식용), aria-label(의미 전달) 등',
    required: false,
  },
];

const ICON_ITEMS = [
  {
    name: 'HomeIcon',
    Component: HomeIcon,
    className: 'text-red-500 size-40',
    props: {
      onClick: () => alert('홈 클릭!'),
    },
  },
];
