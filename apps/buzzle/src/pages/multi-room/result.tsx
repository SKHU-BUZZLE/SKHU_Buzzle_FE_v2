import { MultiQuizRankingItem } from '@buzzle/design';
import { useRoomStore } from '@stores/room';
import { fadeRiseIn, listStagger } from '@utils/motionUtils';
import { motion } from 'motion/react';

export default function MultiRoomResult() {
  const leaderBoard = useRoomStore((s) => s.leaderBoard);
  const quizResult = useRoomStore((s) => s.quizResult);

  if (!leaderBoard || !quizResult) return null;

  const winners = quizResult.rankings.filter((u) => u.isWinner);
  const hasMultipleWinners = (winners?.length ?? 0) > 1;

  return (
    <div className='relative flex min-h-0 flex-1 flex-col justify-evenly gap-36'>
      <motion.ul
        animate='animate'
        className='flex flex-col gap-8 pb-240'
        initial='initial'
        style={{ willChange: 'transform' }}
        variants={listStagger}
      >
        {quizResult.rankings.map((rank) => (
          <motion.li key={rank.email} variants={fadeRiseIn}>
            <MultiQuizRankingItem
              key={rank.email}
              correctCount={rank.score ?? 0}
              name={rank.name}
              rank={rank.rank ?? 0}
              src={rank.picture}
            />
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        {...fadeRiseIn}
        className='to-white-50/0 dark:to-dm-black-800/0 via-white-50/90 dark:via-dm-black-800/90 from-white-50 dark:from-dm-black-800 absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 bg-gradient-to-t py-120'
      >
        <h1 className='ds-typ-heading-3 ds-text-muted'>축하합니다!</h1>
        <h1 className='ds-typ-heading-3 ds-text-muted'>
          <div className={`flex ${hasMultipleWinners ? 'gap-2' : ''}`}>
            {winners.map((player, index) => (
              <span key={player.email} className='text-primary-500'>
                {player.name}
                {index < winners.length - 1 && ','}
              </span>
            ))}
            &nbsp;님이 우승했어요 🎉
          </div>
        </h1>
      </motion.div>
    </div>
  );
}
