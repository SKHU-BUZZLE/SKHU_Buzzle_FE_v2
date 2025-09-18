import Avatar from '@components/Avatar';
import { BronzeMedalIcon, GoldMedalIcon, SilverMedalIcon } from '@components/icons';

interface MultiQuizRankingItemProps {
  rank: number;
  src?: string;
  name: string;
  correctCount: number;
}

/**
 * @component MultiQuizRankingItem
 * @description 멀티 퀴즈 결과 랭킹의 단일 항목을 표시하는 컴포넌트입니다.
 * - 순위에 따라 메달 아이콘 또는 숫자 랭킹을 표시합니다.
 * - 아바타(프로필 이미지 + 이름)와 맞힌 문제 수를 함께 보여줍니다.
 *
 * @param {number} props.rank 순위 (1~n). 1~3위는 메달 아이콘, 그 외는 숫자로 표시
 * @param {string} [props.src] 사용자 프로필 이미지 URL (선택)
 * @param {string} props.name 사용자 이름
 * @param {number} props.correctCount 맞힌 문제 수
 *
 * @example
 * ```tsx
 * <MultiQuizRankingItem
 *   rank={1}
 *   src="https://example.com/avatar.png"
 *   name="홍길동"
 *   correctCount={5}
 * />
 * ```
 */
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
