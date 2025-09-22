import { createMultiRoom } from '@apis/multi';
import { Button, Counter } from '@buzzle/design';
import QuizCategory from '@components/quizCategory';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateRoomPage() {
  const navigate = useNavigate();
  const [maxPlayers, setMaxPlayers] = useState<number>(2);
  const [category, setCategory] = useState<string>('all');

  return (
    // 전체 div가 Outlet 높이를 전부 차지하기 위해 => flex min-h-0 flex-1 flex-col
    <div className='flex min-h-0 flex-1 flex-col gap-36'>
      <h1 className='ds-typ-heading-3 ds-text-strong'>어떻게 방을 만들까요?</h1>

      <div className='flex flex-col gap-12'>
        <p className='ds-typ-title-2 ds-text-strong'>참여 인원</p>
        <div className='ds-theme-bg-muted w-full rounded-2xl p-24'>
          <Counter.Root count={maxPlayers} max={10} min={1} onChange={setMaxPlayers}>
            <div className='flex justify-between gap-12'>
              <Counter.Value className='text-primary-500 ds-typ-title-1' unit='명' />
              <div className='flex gap-8'>
                <Counter.Down className='text-black-200 dark:text-black-100 size-24' />
                <Counter.Up className='text-black-200 dark:text-black-100 size-24' />
              </div>
            </div>
          </Counter.Root>
          <p className='ds-typ-body-3 ds-text-caption mt-8'>최대 10명의 친구를 초대할 수 있어요</p>
        </div>
      </div>

      <QuizCategory value={category} onChange={setCategory} />

      <Button
        className='mt-auto w-full'
        onClick={async () => {
          try {
            const res = await createMultiRoom({ maxPlayers, category, quizCount: 3 });
            console.log('[방 생성 성공]', res.data);
            const room = res.data.data;
            // navigate(`/multi-room/${inviteCode}/lobby`);
            navigate(`/multi-room/${room.inviteCode}/lobby`, {
              state: { entry: 'invite', room },
              replace: true, // 뒤로가기 시 생성 페이지 안 보이게
            });
          } catch (err) {
            console.error('[방 생성 실패]', err);
          }
        }}
      >
        방 생성하기
      </Button>
    </div>
  );
}
