import Avatar from '@components/Avatar';
import { BronzeMedalIcon, CrownIcon, GoldMedalIcon, SilverMedalIcon } from '@components/icons';
import { twm } from '@components/utils/twm';
import { twMerge } from 'tailwind-merge';

interface RankedAvatarProps {
  /** 순위 (1, 2, 3) */
  rank: 1 | 2 | 3;
  /** 프로필 이미지 src */
  src?: string;
  /** 표시할 이름 */
  name: string;
  /** 점수 */
  score: number;
  /** 루트 컨테이너 스타일 확장용 className */
  className?: string;
}

/**
 * RankedAvatar 컴포넌트
 *
 * 상위 3명을 위한 랭킹 아바타 컴포넌트입니다.
 * 1등: 왕관 + 금메달, 2등: 은메달, 3등: 동메달을 표시합니다.
 * Avatar 컴포넌트를 기반으로 하여 variant='score', direction='vertical'로 설정됩니다.
 *
 * @param {(1 | 2 | 3)} props.rank   순위 값입니다. 1, 2, 3만 지원합니다.
 * @param {string}      [props.src]  프로필 이미지 경로입니다. 미지정 시 기본 아이콘이 표시됩니다.
 * @param {string}      props.name   사용자 이름입니다. 화면 텍스트 및 aria-label에 사용됩니다.
 * @param {number}      props.score  사용자 점수입니다. Avatar의 metaValue로 표기됩니다.
 * @param {string}      [props.className] 루트 컨테이너에 추가할 Tailwind 클래스입니다(간격/정렬/트랜스폼 확장 등).
 *
 * @example
 * <RankedAvatar
 *   rank={1}
 *   name="홍길동"
 *   score={100}
 *   src="/profile.png"
 * />
 */
export default function RankedAvatar({ rank, src, name, score, className }: RankedAvatarProps) {
  const aria = `${name}, ${rank}등, ${score}점`;

  return (
    // 아이콘 위치 기준 컨테이너
    <div aria-label={aria} className={twm('relative flex flex-col items-center', className)} role='img'>
      {/* 왕관: 상단 중앙 (1등만) */}
      {rank === 1 && (
        <CrownIcon aria-hidden='true' className='absolute -top-20 left-1/2 z-20 -translate-x-1/2 text-[#FFD554]' />
      )}

      {/* 메달: 좌측 상단 걸침 (1~3등) */}
      {rank === 1 && <GoldMedalIcon aria-hidden='true' className='absolute -top-2 -left-2 z-10' />}
      {rank === 2 && <SilverMedalIcon aria-hidden='true' className='absolute -top-6 -left-6 z-10' />}
      {rank === 3 && <BronzeMedalIcon aria-hidden='true' className='absolute -top-6 -left-6 z-10' />}

      {/* 아바타: 텍스트(이름/점수)는 Avatar가 렌더링 */}
      <Avatar
        direction='vertical'
        layoutClassName='gap-20'
        metaClassName='mt-2 text-white-700 dark:text-white-700'
        metaValue={score}
        name={name}
        nameClassName='ds-typ-title-2 text-black-900 dark:text-white-50'
        profileImageClassName={twMerge(rank === 1 ? 'size-100' : 'size-70')}
        src={src}
        variant='score'
      />
    </div>
  );
}
