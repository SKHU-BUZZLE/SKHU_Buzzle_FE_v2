import RankedAvatar from '@components/RankedAvatar';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';

export default function RankedAvatarDoc() {
  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}
      <div className='flex items-center gap-24 p-30'>
        <RankedAvatar name='김코딩' rank={1} score={120} src='https://via.placeholder.com/100' />
        <RankedAvatar name='박디자인' rank={2} score={110} src='https://via.placeholder.com/100' />
        <RankedAvatar name='이개발' rank={3} score={105} src='https://via.placeholder.com/100' />
      </div>

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
    </div>
  );
}

const description = `
# RankedAvatar

**상위 3명**을 시각적으로 표시하기 위한 아바타 컴포넌트입니다. 내부적으로 \`Avatar\`를 사용하며 항상 **\`variant="score"\` + \`direction="vertical"\`** 로 렌더링되어 **이름과 점수**를 함께 보여줍니다.

## 표시 규칙
- **1등**: 상단 중앙에 **왕관**, 프로필 좌상단에 **금메달**, **더 큰 프로필 이미지**(기본 \`size-100\`).
- **2등**: 프로필 좌상단에 **은메달**, 기본 이미지 크기(기본 \`size-70\`).
- **3등**: 프로필 좌상단에 **동메달**, 기본 이미지 크기(기본 \`size-70\`).

아이콘(왕관/메달)은 **장식 요소**로 간주되어 \`aria-hidden="true"\`가 적용되며, 실제 정보(이름/등수/점수)는 화면 텍스트와 루트 요소의 \`aria-label\`(예: “홍길동, 1등, 100점”)로 제공됩니다.

## 레이아웃 & 위치
- **오버레이 기준**: \`RankedAvatar\`의 루트 컨테이너를 기준으로 **절대 배치**됩니다.
  - 1등 왕관: \`-top-20 left-1/2 -translate-x-1/2\` (상단 중앙 고정)
  - 1등 메달: \`-top-2 -left-2\` (좌상단 살짝 걸침)
  - 2·3등 메달: \`-top-6 -left-6\` (좌상단 걸침)
- **프로필 이미지 크기**: 1등은 \`size-100\`, 2·3등은 \`size-70\`를 기본 사용합니다(디자인 토큰/프로젝트 스케일에 맞춰 조정 가능).

## 사용 예시
\`\`\`tsx
<div className="flex items-center gap-24">
  <RankedAvatar rank={1} name="김코딩"  score={120} src="https://via.placeholder.com/100" />
  <RankedAvatar rank={2} name="박디자인" score={110} src="https://via.placeholder.com/100" />
  <RankedAvatar rank={3} name="이개발"  score={105} src="https://via.placeholder.com/100" />
</div>
\`\`\`

## 접근성
- 루트 요소에 \`role="img"\`와 합성된 \`aria-label\`을 제공해 스크린리더가 **이름/등수/점수**를 한번에 읽을 수 있도록 합니다.
- 왕관/메달은 시각적 장식이므로 \`aria-hidden="true"\` 처리됩니다.
`;

const propsSpecs = [
  {
    propName: 'rank',
    type: ['1', '2', '3'],
    description: '순위 값 (1, 2, 3만 지원). 1등은 왕관+금메달, 2등은 은메달, 3등은 동메달이 표시됩니다.',
    required: true,
    defaultValue: '-',
    options: ['1', '2', '3'],
  },
  {
    propName: 'src',
    type: ['string'],
    description: '프로필 이미지 경로 (없으면 기본 아바타 아이콘 표시).',
    required: false,
    defaultValue: '-',
  },
  {
    propName: 'name',
    type: ['string'],
    description: '사용자 이름. 아바타 하단에 표시됩니다.',
    required: true,
    defaultValue: '-',
  },
  {
    propName: 'score',
    type: ['number'],
    description: '사용자의 점수. 이름 아래에 표시됩니다.',
    required: true,
    defaultValue: '-',
  },
  {
    propName: 'className',
    type: ['string'],
    description: '루트 컨테이너에 추가할 Tailwind 클래스. (예: 1등만 크게 보이도록 확장).',
    required: false,
    defaultValue: '-',
  },
];
