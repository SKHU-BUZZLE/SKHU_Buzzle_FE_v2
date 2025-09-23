import multiQuiz from '@assets/images/multi-quiz.webp';
import multiQuizGuide from '@assets/images/multi-quiz-guide.webp';
import { Avatar, Button, NoteIcon } from '@buzzle/design';
import { useRoomStore } from '@stores/room';
import { useUserStore } from '@stores/user';
import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';

type MultiRoomContext = {
  handleLeave: () => void;
  handleStartGame: () => void;
};

export default function MultiRoomLobby() {
  const { user } = useUserStore();
  const roomDetails = useRoomStore((s) => s.roomDetails);
  // const { handleLeave, handleStartGame } = useOutletContext<MultiRoomContext>();
  const { handleStartGame } = useOutletContext<MultiRoomContext>();

  // 방장 여부
  const isHost = useMemo(() => {
    if (!roomDetails) return false;
    const currentUser = roomDetails.players.find((p) => p.email === user?.email);
    return currentUser?.isHost;
  }, [user, roomDetails]);

  // console.log('🤚🏻 roomDetails:', roomDetails);

  return (
    <div className='relative flex min-h-0 flex-1 flex-col gap-36'>
      {/* 방 제목 */}
      <div className='flex items-center gap-32'>
        <img alt='멀티 대기방 아이콘' className='aspect-square size-92 object-cover' src={multiQuizGuide} />
        <div className='flex flex-1 flex-col gap-16'>
          <h1 className='ds-typ-title-1 ds-text-strong'>{roomDetails?.hostName}님의 멀티 퀴즈</h1>
          <div className='dark:divide-dm-black-600 flex divide-x divide-gray-200'>
            <div className='flex flex-1 flex-col gap-4'>
              <p className='ds-typ-body-3 ds-text-caption whitespace-nowrap'>참여 인원</p>
              <p className='ds-typ-body-2 ds-text-muted whitespace-nowrap'>{roomDetails?.maxPlayers}명</p>
            </div>
            <div className='flex flex-2 flex-col gap-4 pl-16'>
              <p className='ds-typ-body-3 ds-text-caption whitespace-nowrap'>카테고리</p>
              <p className='ds-typ-body-2 ds-text-muted whitespace-nowrap'>{roomDetails?.category}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 참여 코드 */}
      <div className='bg-white-100 dark:bg-dm-black-700 flex flex-col items-center gap-8 rounded-2xl py-20'>
        <img alt='참여 코드 대체 아이콘' className='h-auto w-60' src={multiQuiz} />
        <p className='ds-text-caption ds-typ-body-3'>같이할 친구에게 참여 코드를 보내주세요!</p>
        <div className='flex items-center gap-8'>
          <h2 className='ds-typ-heading-2 text-primary-500'>{roomDetails?.inviteCode}</h2>
          <Button
            iconOnly
            className='bg-white-100 dark:bg-dm-black-700 border-none'
            leftIcon={<NoteIcon className='ds-text-muted size-16' />}
            size='md'
            variant='outline'
            onClick={() => {
              if (!roomDetails?.inviteCode) return;
              navigator.clipboard.writeText(roomDetails.inviteCode).catch((err) => {
                console.error('복사 실패:', err);
              });
            }}
          />
        </div>
      </div>

      {/* 참여 중인 친구 */}
      <div className='flex flex-1 flex-col gap-16'>
        <div className='flex items-end gap-12'>
          <h3 className='ds-typ-title-2 ds-text-strong'>참여 중인 친구</h3>
          <p className='ds-text-caption ds-typ-body-2'>
            <span className='text-primary-500'>{roomDetails?.players.length}</span> / {roomDetails?.maxPlayers}명
          </p>
        </div>
        <div className='grid grid-cols-5 place-items-center gap-x-8 gap-y-12'>
          {roomDetails?.players.map((player) => (
            <Avatar key={player.email} alt={`${player.name}의 프로필 이미지`} name={player.name} src={player.picture} />
          ))}
        </div>
      </div>

      {/* 방장이라면 시작 버튼 or 참여자라면 나가기 버튼 */}
      {/* {isHost ? (
        <Button className='sticky bottom-16 w-full' disabled={!roomDetails?.canStartGame} onClick={handleStartGame}>
          퀴즈 시작하기
        </Button>
      ) : (
        <Button className='sticky bottom-16 w-full' variant='danger' onClick={handleLeave}>
          방 나가기
        </Button>
      )} */}
      {isHost && (
        <Button className='sticky bottom-16 w-full' disabled={!roomDetails?.canStartGame} onClick={handleStartGame}>
          퀴즈 시작하기
        </Button>
      )}
    </div>
  );
}
