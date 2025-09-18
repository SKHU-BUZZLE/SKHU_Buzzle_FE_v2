import Avatar from '@components/Avatar';
import { BronzeMedalIcon, GoldMedalIcon, SilverMedalIcon } from '@components/icons';

interface MultiQuizRankingItemProps {
  rank: number;
  src?: string;
  name: string;
  correctCount: number;
}

export default function MultiQuizRankingItem({ rank, src, name, correctCount }: MultiQuizRankingItemProps) {
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
    <div className='bg-white-100 dark:bg-dm-black-700 flex items-center gap-16 rounded-2xl px-36 py-16 md:gap-36'>
      {rankIcon}
      <Avatar
        direction='horizontal'
        layoutClassName='flex-1'
        name={name}
        nameClassName='ds-typ-title-2'
        profileImageClassName='size-36'
        src={src}
      />
      <p className='ds-text-caption ds-typ-body-2'>{correctCount} 문제</p>
    </div>
  );
}
