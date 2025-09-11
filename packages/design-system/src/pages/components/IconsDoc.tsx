import * as Icons from '@components/icons';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import StatefulPlayground from '@layouts/StatefulPlayground';

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
            <span className='text-body-1'>{name}</span>
            <span className='text-body-3'>{className}</span>
          </li>
        ))}
      </ul>

      <StatefulPlayground code={code} extraScope={{ Icons }} />
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
- 일부 비율이 맞지 않는 아이콘은 여백을 추가하여 비율을 맞춰두었습니다.
- 단, **TextLogoIcon**은 고정된 크기(\`w-92\`)가 적용되어 있으며, \`w-*\` 유틸리티로 크기 변경이 **가능**합니다.

## 색상 (Color)
- \`fill="currentColor"\`로 동작하므로 Tailwind의 \`text-*\` 유틸리티로 색상을 제어합니다.  
  예: \`"text-gray-900"\`, \`"text-primary-600"\`.
- 단, **GoldMedalIcon, SilverMedalIcon, BronzeMedalIcon, TextLogoIcon**은 색상이 고정되어 있으며, \`text-*\` 유틸리티로 색상 변경이 **불가능**합니다.

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
    Component: Icons.HomeIcon,
    className: 'text-red-500 size-40',
    props: {
      onClick: () => alert('홈 클릭!'),
    },
  },
  {
    name: 'UserIcon',
    Component: Icons.UserIcon,
    className: 'text-blue-500 size-40',
    props: {
      onClick: () => alert('유저 클릭!'),
    },
  },
  {
    name: 'MultiUserIcon',
    Component: Icons.MultiUserIcon,
    className: 'text-green-500 size-40',
    props: {
      onClick: () => alert('멀티유저 클릭!'),
    },
  },
  {
    name: 'RankingIcon',
    Component: Icons.RankingIcon,
    className: 'text-yellow-500 size-40',
    props: {
      onClick: () => alert('랭킹 클릭!'),
    },
  },
  {
    name: 'NoteIcon',
    Component: Icons.NoteIcon,
    className: 'text-purple-500 size-40',
    props: {
      onClick: () => alert('노트 클릭!'),
    },
  },
  {
    name: 'MedalIcon',
    Component: Icons.MedalIcon,
    className: 'text-pink-500 size-40',
    props: {
      onClick: () => alert('메달 클릭!'),
    },
  },
  {
    name: 'CalendarIcon',
    Component: Icons.CalendarIcon,
    className: 'text-indigo-500 size-40',
    props: {
      onClick: () => alert('캘린더 클릭!'),
    },
  },
  {
    name: 'HeartIcon',
    Component: Icons.HeartIcon,
    className: 'text-red-400 size-40',
    props: {
      onClick: () => alert('하트 클릭!'),
    },
  },
  {
    name: 'MoonIcon',
    Component: Icons.MoonIcon,
    className: 'text-gray-500 size-40',
    props: {
      onClick: () => alert('문 클릭!'),
    },
  },
  {
    name: 'SunIcon',
    Component: Icons.SunIcon,
    className: 'text-yellow-400 size-40',
    props: {
      onClick: () => alert('선 클릭!'),
    },
  },
  {
    name: 'BookIcon',
    Component: Icons.BookIcon,
    className: 'text-green-400 size-40',
    props: {
      onClick: () => alert('북 클릭!'),
    },
  },
  {
    name: 'EconomyIcon',
    Component: Icons.EconomyIcon,
    className: 'text-blue-400 size-40',
    props: {
      onClick: () => alert('이코노미 클릭!'),
    },
  },
  {
    name: 'ScienceIcon',
    Component: Icons.ScienceIcon,
    className: 'text-purple-400 size-40',
    props: {
      onClick: () => alert('사이언스 클릭!'),
    },
  },
  {
    name: 'CultureIcon',
    Component: Icons.CultureIcon,
    className: 'text-pink-400 size-40',
    props: {
      onClick: () => alert('컬쳐 클릭!'),
    },
  },
  {
    name: 'SportsIcon',
    Component: Icons.SportsIcon,
    className: 'text-red-400 size-40',
    props: {
      onClick: () => alert('스포츠 클릭!'),
    },
  },
  {
    name: 'HistoryIcon',
    Component: Icons.HistoryIcon,
    className: 'text-gray-400 size-40',
    props: {
      onClick: () => alert('히스토리 클릭!'),
    },
  },
  {
    name: 'NatureIcon',
    Component: Icons.NatureIcon,
    className: 'text-green-400 size-40',
    props: {
      onClick: () => alert('네이처 클릭!'),
    },
  },
  {
    name: 'TriviaIcon',
    Component: Icons.TriviaIcon,
    className: 'text-yellow-400 size-40',
    props: {
      onClick: () => alert('트리비아 클릭!'),
    },
  },
  {
    name: 'SuccessIcon',
    Component: Icons.SuccessIcon,
    className: 'text-green-400 size-40',
    props: {
      onClick: () => alert('성공 클릭!'),
    },
  },
  {
    name: 'ErrorIcon',
    Component: Icons.ErrorIcon,
    className: 'text-red-400 size-40',
    props: {
      onClick: () => alert('에러 클릭!'),
    },
  },
  {
    name: 'MinusIcon',
    Component: Icons.MinusIcon,
    className: 'text-gray-400 size-40',
    props: {
      onClick: () => alert('마이너스 클릭!'),
    },
  },
  {
    name: 'PlusIcon',
    Component: Icons.PlusIcon,
    className: 'text-gray-400 size-40',
    props: {
      onClick: () => alert('플러스 클릭!'),
    },
  },
  {
    name: 'LogoutIcon',
    Component: Icons.LogoutIcon,
    className: 'text-gray-400 size-40',
    props: {
      onClick: () => alert('로그아웃 클릭!'),
    },
  },
  {
    name: 'ChevronIcon',
    Component: Icons.ChevronIcon,
    className: 'text-gray-400 size-40',
    props: {
      onClick: () => alert('체브론 클릭!'),
    },
  },
  {
    name: 'CrownIcon',
    Component: Icons.CrownIcon,
    className: 'text-yellow-400 size-40',
    props: {
      onClick: () => alert('크라운 클릭!'),
    },
  },
  {
    name: 'GoldMedalIcon',
    Component: Icons.GoldMedalIcon,
    className: 'size-40',
    props: {
      onClick: () => alert('골드메달 클릭!'),
    },
  },
  {
    name: 'SilverMedalIcon',
    Component: Icons.SilverMedalIcon,
    className: 'size-40',
    props: {
      onClick: () => alert('실버메달 클릭!'),
    },
  },
  {
    name: 'BronzeMedalIcon',
    Component: Icons.BronzeMedalIcon,
    className: 'size-40',
    props: {
      onClick: () => alert('브론즈메달 클릭!'),
    },
  },
  {
    name: 'DeleteIcon',
    Component: Icons.DeleteIcon,
    className: 'size-40',
    props: {
      onClick: () => alert('삭제 클릭!'),
    },
  },
  {
    name: 'TextLogoIcon',
    Component: Icons.TextLogoIcon,
    className: 'w-100',
    props: {
      onClick: () => alert('텍스트 로고 클릭!'),
    },
  },
];

const code = `
function IconDemo() {
  return (
    // import 가 * as Icons로 되어있어서 테스트 할때만 Icons. 접두사를 붙혀주세요..! (서비스일땐 X)
    <div className='flex flex-wrap gap-8'>
      <Icons.DeleteIcon className="text-red-500 size-40" onClick={() => alert('삭제 클릭!')} />
      <Icons.TextLogoIcon className="w-100" />
    </div>
  );
}
render(<IconDemo />);
`;
