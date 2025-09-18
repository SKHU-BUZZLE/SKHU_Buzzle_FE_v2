import RankingItem from '@components/RankingItem';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import StatelessPlayground, { type Spec } from '@layouts/StatelessPlayground';

export default function RankingItemDoc() {
  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}
      {/* <RankingItem
        name='이지금'
        rank={1}
        score={300}
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRROpV69ucvcZspZGsc5LgWjS9TUCSn6hAzeQ&s'
      />
      <RankingItem
        name='이지은'
        rank={2}
        score={200}
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqTY6qr_WD4z6mMBEisQVi9BWSNt9R6DXUfg&s'
      />
      <RankingItem
        name='이지동'
        rank={3}
        score={100}
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMfu5OBb-SHgLe25OulqeMzrNk6ygNNHQxzA&s'
      />
      <RankingItem name='철수' rank={4} score={50} />
      <RankingItem name='짱구' rank={5} score={10} /> */}

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
      <StatelessPlayground
        component={RankingItem}
        initialProps={{
          rank: 1,
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMfu5OBb-SHgLe25OulqeMzrNk6ygNNHQxzA&s',
          name: '이지금',
          score: 100,
        }}
        specs={playgroundSpecs}
      />
    </div>
  );
}

const description = `
# RankingItem
랭킹 페이지의 단일 RankingItem 컴포넌트입니다.  
1~3등의 등수는 메달 아이콘으로 표시됩니다.
`;

const propsSpecs = [
  {
    propName: 'rank',
    type: ['number'],
    description: '버즐 등수입니다.',
    required: true,
  },
  {
    propName: 'src',
    type: ['string'],
    description: '사용자 프로필 사진 src입니다.',
  },
  {
    propName: 'name',
    type: ['string'],
    description: '사용자 이름입니다.',
    required: true,
  },
  {
    propName: 'score',
    type: ['number'],
    description: '버즐 점수입니다.',
    required: true,
  },
];

const playgroundSpecs = [
  { type: 'number', propName: 'rank', label: 'Rank' },
  { type: 'text', propName: 'src', label: 'Profile Image Src' },
  { type: 'text', propName: 'name', label: 'Name' },
  { type: 'number', propName: 'score', label: 'Score' },
] satisfies ReadonlyArray<Spec>;
