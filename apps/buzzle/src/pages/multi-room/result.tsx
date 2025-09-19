import { MultiQuizRankingItem } from '@buzzle/design';
import { useRoom } from '@stores/room';

export default function MultiRoomResult() {
  const { leaderBoard, quizResult } = useRoom();

  if (!leaderBoard || !quizResult) return;
  // ! 서버에서 leaderBoard에는 유저 정보도 다 넣어서 보내주면 좋을듯
  const sortedScores = Object.entries(leaderBoard.scores)
    .map(([name, score]) => ({ name, score }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className='relative flex min-h-0 flex-1 flex-col justify-evenly gap-36'>
      <div className='flex flex-col gap-8 pb-240'>
        {sortedScores.map(({ name, score }, index) => (
          <MultiQuizRankingItem
            key={name}
            correctCount={score}
            name={name}
            rank={index + 1}
            // src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMfu5OBb-SHgLe25OulqeMzrNk6ygNNHQxzA&s'
          />
        ))}
      </div>
      <div className='to-white-50/0 dark:to-dm-black-800/0 via-white-50/90 dark:via-dm-black-800/90 from-white-50 dark:from-dm-black-800 fixed inset-x-0 bottom-0 flex flex-col items-center gap-4 bg-gradient-to-t py-120'>
        <h1 className='ds-typ-heading-2 ds-text-muted'>축하합니다!</h1>
        <h1 className='ds-typ-heading-2 ds-text-muted'>
          <span className='text-primary-500'>{quizResult.winner}</span>님이 우승했어요 🎉
        </h1>
      </div>
    </div>
  );
}
