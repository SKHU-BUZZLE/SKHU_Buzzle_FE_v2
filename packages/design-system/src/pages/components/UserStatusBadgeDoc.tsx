import * as Icons from '@components/icons';
import UserStatusBadge from '@components/UserStatusBadge';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import StatefulPlayground from '@layouts/StatefulPlayground';
import { users } from '@mocks/user';
import { toDaysSinceToday } from '@utils/toDaysSinceToday';

export default function UserStatusBadgeDoc() {
  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
      <StatefulPlayground code={code} extraScope={{ Icons, UserStatusBadge, users, toDaysSinceToday }} />
    </div>
  );
}

const description = `
# UserStatusBadge
좌측 **아이콘(선택)** · 중앙 **라벨(필수)** · 우측 **강조 값(필수, 선택 접미사 포함)** 으로 구성된 상태 뱃지 컴포넌트입니다.

- **접근성**: 컨테이너에 \`aria-label\`이 자동 생성되어 *"라벨 + 값(+접미사)"* 를 하나의 문장으로 스크린리더가 읽습니다.
- **레이아웃**: \`inline-flex\`, \`gap-8\`, \`px-12 py-8\`, \`h-32\`, \`w-fit\` 기본값을 사용합니다.
- **말줄임 처리**:
  - 라벨은 \`truncate\` 처리 (컨테이너 폭이 제한될 때 한 줄로 말줄임).
  - 값은 \`max-w-[10ch] + truncate\`로 너무 긴 숫자/문자열을 \`…\`로 축약합니다.
- **다크 모드**: \`dark:bg-dm-black-700\` 토큰으로 배경이 전환됩니다.
- **스타일 오버라이드**: \`className\`으로 배경/테두리/여백/폰트 등을 자유롭게 재정의하세요.

> 💡 \`w-fit\`이 기본이라 내용 길이에 맞춰 폭이 잡힙니다.  
> 컨테이너 폭을 고정하고 싶다면 사용처에서 \`w-64\`, \`w-full\` 등으로 지정하세요. 긴 값은 기본 \`max-w-[10ch]\` 때문에 자동으로 말줄임됩니다  
> (필요 시 \`className\`으로 조절).
`;

const propsSpecs = [
  {
    propName: 'icon',
    type: ['React.ReactNode'],
    description: '왼쪽에 표시할 아이콘. 없으면 렌더링되지 않습니다.',
    required: false,
    options: [],
  },
  {
    propName: 'label',
    type: ['string'],
    description: '중앙에 표시되는 문구.',
    required: true,
    options: [],
  },
  {
    propName: 'value',
    type: ['number', 'string'],
    description: '오른쪽에 강조되는 값.',
    required: true,
    options: [],
  },
  {
    propName: 'valueSuffix',
    type: ['string'],
    description: '값 뒤에 붙는 접미사/단위 (예: "위", "일").',
    required: false,
    options: [],
  },
  {
    propName: 'className',
    type: ['string'],
    description: '루트 컨테이너에 추가할 Tailwind 클래스. (배경/여백/테두리 등 오버라이드)',
    required: false,
    options: [],
  },
];

const code = `
function UserStatusBadgeDemo() {
  return (
    // import 가 * as Icons로 되어있어서 테스트 할때만 Icons. 접두사를 붙혀주세요..! (서비스일땐 X)
    <div className='flex flex-col gap-12'>
        <UserStatusBadge icon={<Icons.MedalIcon />} label='현재 순위' value={users[0].streak} valueSuffix='위' />
        <UserStatusBadge
          icon={<Icons.CalendarIcon />}
          label='버즐과 함께'
          value={toDaysSinceToday(users[0].createdAt)}
          valueSuffix='일'
        />
        <UserStatusBadge
          icon={<Icons.CalendarIcon />}
          label='버즐과 함께'
          value='100000000000000000000'
          valueSuffix='일'
        />
      </div>
  );
}
render(<UserStatusBadgeDemo />);
`;
