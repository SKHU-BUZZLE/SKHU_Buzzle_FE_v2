import Avatar from '@components/Avatar';
import { BronzeMedalIcon, GoldMedalIcon, SilverMedalIcon } from '@components/icons';

interface RankingItemProps {
  rank: number;
  src?: string;
  name: string;
  score: number;
}

/**
 * @component RankingItem
 * @description 랭킹 리스트의 단일 항목을 표시하는 컴포넌트입니다.
 * - 순위에 따라 메달 아이콘(1~3위) 또는 숫자를 보여줍니다.
 * - 아바타(프로필 이미지, 이름)와 점수를 함께 렌더링합니다.
 *
 * @param {number} props.rank 순위 (1~n). 1~3위는 메달 아이콘, 그 외는 숫자로 표시됩니다.
 * @param {string} [props.src] 사용자 프로필 이미지 URL (선택)
 * @param {string} props.name 사용자 이름
 * @param {number} props.score 점수 또는 맞힌 문제 수
 *
 * @example
 * ```tsx
 * <RankingItem
 *   rank={2}
 *   src="https://example.com/avatar.png"
 *   name="김철수"
 *   score={8}
 * />
 * ```
 */
export default function RankingItem({ rank, src, name, score }: RankingItemProps) {
  // 1~3등은 메달 아이콘. 그 외에는 text 등수
  let rankIcon;
  switch (rank) {
    case 1:
      rankIcon = <GoldMedalIcon className='size-32' />;
      break;
    case 2:
      rankIcon = <SilverMedalIcon className='size-32' />;
      break;
    case 3:
      rankIcon = <BronzeMedalIcon className='size-32' />;
      break;
    default:
      rankIcon = (
        <div className='flex size-32 items-center justify-center'>
          <p className='ds-typ-title-2'>{rank}</p>
        </div>
      );
  }

  return (
    <div className='flex items-center gap-16 rounded-2xl md:gap-24'>
      {rankIcon}
      <Avatar
        direction='horizontal'
        layoutClassName='flex-1'
        metaValue={score}
        name={name}
        profileImageClassName='size-48'
        src={src}
        variant='score'
      />
    </div>
  );
}
