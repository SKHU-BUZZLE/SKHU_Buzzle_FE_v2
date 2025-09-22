import VictoryStand from '@components/VictoryStand';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import { rankingMock } from '@mocks/ranking';

export default function VictoryStandDoc() {
  const rankings = rankingMock.data.rankings;

  // 목데이터에서 Top3 가공
  const [first, second, third] = ([1, 2, 3] as const).map((rank) => {
    const r = rankings.find((it) => it.currentRanking === rank)!;
    return { rank, name: r.name, score: r.streak, src: r.picture };
  }) as [
    { rank: 1; name: string; score: number; src?: string },
    { rank: 2; name: string; score: number; src?: string },
    { rank: 3; name: string; score: number; src?: string },
  ];

  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}
      <VictoryStand first={first} second={second} third={third} />

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
    </div>
  );
}

const description = `
# VictoryStand

**Top3 유저**를 시각적으로 시상대 형태(2등–1등–3등)로 배치하는 컴포넌트입니다.  

내부적으로 \`RankedAvatar\`를 사용하여 **프로필 이미지, 이름, 점수, 아이콘(왕관/메달)** 을 표시합니다.  
VictoryStand 자체는 **UI 배치만 담당**하며, 데이터 정제(Top3 추출)는 페이지 레벨에서 처리하는 것을 권장합니다.

## 접근성
- 각 아바타는 내부적으로 \`role="img"\`과 \`aria-label\`을 제공해 스크린리더가 **이름/등수/점수**를 읽습니다.  
- 왕관/메달은 장식 요소로 \`aria-hidden="true"\` 처리됩니다.  
`;

const propsSpecs = [
  {
    propName: 'first',
    type: ['{ rank: 1; name: string; score: number; src?: string }'],
    description: '1등 유저 데이터. 중앙에 가장 크게 표시되며 왕관과 금메달이 함께 렌더링됩니다.',
    required: true,
    defaultValue: '-',
  },
  {
    propName: 'second',
    type: ['{ rank: 2; name: string; score: number; src?: string }'],
    description: '2등 유저 데이터. 왼쪽에 표시되며 은메달이 렌더링됩니다.',
    required: true,
    defaultValue: '-',
  },
  {
    propName: 'third',
    type: ['{ rank: 3; name: string; score: number; src?: string }'],
    description: '3등 유저 데이터. 오른쪽에 표시되며 동메달이 렌더링됩니다.',
    required: true,
    defaultValue: '-',
  },
  {
    propName: 'className',
    type: ['string'],
    description: 'VictoryStand 루트 컨테이너에 추가할 Tailwind 클래스. (예: 여백, 정렬 확장)',
    required: false,
    defaultValue: '-',
  },
];
