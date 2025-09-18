import MultiQuizRankingItem from '@components/MultiQuizRankingItem';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import StatelessPlayground, { type Spec } from '@layouts/StatelessPlayground';

export default function MultiQuizRankingItemDoc() {
  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}
      {/* <MultiQuizRankingItem
        correctCount={5}
        name='이지금'
        rank={1}
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRROpV69ucvcZspZGsc5LgWjS9TUCSn6hAzeQ&s'
      />
      <MultiQuizRankingItem
        correctCount={4}
        name='이지은'
        rank={2}
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqTY6qr_WD4z6mMBEisQVi9BWSNt9R6DXUfg&s'
      />
      <MultiQuizRankingItem
        correctCount={3}
        name='이지동'
        rank={3}
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMfu5OBb-SHgLe25OulqeMzrNk6ygNNHQxzA&s'
      />
      <MultiQuizRankingItem correctCount={2} name='홍길동' rank={4} /> */}

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
      <StatelessPlayground
        component={MultiQuizRankingItem}
        initialProps={{
          rank: 1,
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMfu5OBb-SHgLe25OulqeMzrNk6ygNNHQxzA&s',
          name: '이지금',
          correctCount: 10,
        }}
        specs={playgroundSpecs}
      />
    </div>
  );
}

const description = `
# MultiQuizRankingItem
멀티 퀴즈 종료 후 결과를 보여주는 MultiQuizRankingItem 컴포넌트입니다.  
1~3등의 등수는 메달 아이콘으로 표시됩니다.
`;

const propsSpecs = [
  {
    propName: 'rank',
    type: ['number'],
    description: '멀티 퀴즈 결과 등수입니다.',
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
    propName: 'correctCount',
    type: ['number'],
    description: '맞힌 퀴즈 개수입니다.',
    required: true,
  },
];

const playgroundSpecs = [
  { type: 'number', propName: 'rank', label: 'Rank' },
  { type: 'text', propName: 'src', label: 'Profile Image Src' },
  { type: 'text', propName: 'name', label: 'Name' },
  { type: 'number', propName: 'correctCount', label: 'Correct Count' },
] satisfies ReadonlyArray<Spec>;
