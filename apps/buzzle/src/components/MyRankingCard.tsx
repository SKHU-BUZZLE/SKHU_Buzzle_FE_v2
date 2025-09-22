import { ProfileImage } from '@buzzle/design';

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
        <div className='bg-white-50 dark:bg-dm-black-700 border-white-300 dark:border-dm-black-600 flex h-100 items-center gap-20 rounded-t-3xl border px-24 shadow-lg'>
          {/* 프로필 이미지 */}
          <ProfileImage alt={`${name} 프로필`} className='size-56 shrink-0' src={src} />

          {/* 사용자 정보 */}
          <div className='min-w-0 flex-1'>
            <p className='ds-typ-title-2 ds-text-strong mb-2 truncate'>{name}</p>
            <p className='ds-typ-body-2 ds-text-muted'>{rank}등</p>
          </div>

          {/* 점수 */}
          <div className='text-right'>
            <p className='ds-typ-title-1 text-primary-500 font-bold'>{score}점</p>
          </div>
        </div>
      </div>
    </div>
  );
}
