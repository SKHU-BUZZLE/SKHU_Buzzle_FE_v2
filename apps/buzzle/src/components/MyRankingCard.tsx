import { Avatar } from '@buzzle/design';

interface MyRankingCardProps {
  src: string;
  name: string;
  rank: number;
  score: number;
}

/**
 * 하단 고정 내 랭킹 카드
 * - 바깥: fixed + 풀폭
 * - 안쪽: ds-layout-max-width로 중앙 정렬, flex 행 배치
 * - 안전영역(safe-area) 패딩 적용
 */
export default function MyRankingCard({ src, name, rank, score }: MyRankingCardProps) {
  return (
    <div className='fixed inset-x-0 bottom-0 z-50'>
      {/* 안전영역 + 바깥 여백 */}
      <div className='ds-layout-max-width mx-auto'>
        {/* 카드 본체 */}
        <div className='bg-white-50 dark:bg-dm-black-700 border-white-100 dark:border-dm-black-500 flex h-100 items-center justify-between rounded-t-4xl border px-24 shadow-[0_-4px_10px_0_rgba(0,0,0,0.08)] shadow-lg'>
          {/* 좌측: Avatar 컴포넌트 */}
          <Avatar direction='horizontal' metaValue={rank} name={name} src={src} variant='rank' />

          {/* 우측: 점수 표시 */}
          <div className='bg-white-200 dark:bg-dm-black-600 rounded-xl px-12 py-8'>
            <p className='ds-typ-body-2 ds-text-normal'>{score}점</p>
          </div>
        </div>
      </div>
    </div>
  );
}
