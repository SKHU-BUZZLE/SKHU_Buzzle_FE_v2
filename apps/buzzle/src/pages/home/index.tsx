import BuzzleCharacter from '@assets/images/buzzle-character.webp';
import MultiQuiz from '@assets/images/multi-quiz.webp';
import NoteQuiz from '@assets/images/note-quiz.webp';
import SingleQuiz from '@assets/images/single-quiz.webp';
import { Button, CalendarIcon, LogoutIcon, MedalIcon, ProfileImage, UserStatusBadge } from '@buzzle/design';
import { useLogout } from '@hooks/useLogout';
import { useUserStore } from '@stores/user';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);
const cardMotion = {
  transition: { type: 'spring', stiffness: 300, damping: 20 },
  whileHover: { scale: 0.96 },
  whileTap: { scale: 0.92 },
} as const;

export default function HomePage() {
  const { user } = useUserStore();
  const logout = useLogout();

  useEffect(() => {
    // 홈 화면에 들어오면 랭킹 쿼리만 invalidate
    useUserStore.getState().invalidateRankingQueries();
  }, []);

  return (
    <div className='flex min-h-0 flex-1 flex-col gap-16'>
      <div className='relative flex-1 px-12 py-24'>
        <div className='flex flex-col gap-8'>
          <p className='ds-typ-body-2 ds-text-caption'>안녕하세요!</p>
          <div className='flex items-center gap-12'>
            <ProfileImage alt={`${user?.name}의 프로필 이미지`} className='size-36' src={user?.picture} />
            <h1 className='ds-typ-heading-1 text-primary-500'>{user?.name} 님</h1>

            <Button
              iconOnly
              aria-label='로그아웃'
              className='bg-transparent hover:bg-transparent active:bg-transparent'
              leftIcon={<LogoutIcon className='ds-text-caption size-18' />}
              round='circular'
              size='sm'
              variant='ghost'
              onClick={logout}
            />
          </div>
          <p className='ds-typ-body-2 ds-text-caption'>{user?.email}</p>
        </div>

        <div className='mt-36 flex flex-col gap-12'>
          <UserStatusBadge icon={<MedalIcon />} label='현재 순위' value={user?.currentRanking ?? 0} valueSuffix='위' />
          <UserStatusBadge
            icon={<CalendarIcon />}
            label='버즐과 함께'
            value={user?.daysSinceCreation ?? 0}
            valueSuffix='일'
          />
        </div>

        <img className='absolute right-12 bottom-10 h-auto w-[28vw] max-w-160 min-w-120' src={BuzzleCharacter} />
      </div>

      <div className='grid gap-12 md:auto-rows-[minmax(0,1fr)] md:grid-cols-2'>
        <MotionLink
          {...cardMotion}
          className='bg-white-50 dark:bg-dm-black-600 rounded-2xl p-24 py-16 hover:brightness-90 dark:hover:brightness-80'
          to='/single'
        >
          <div className='flex flex-col gap-4'>
            <h2 className='text-primary-500 ds-typ-title-1'>싱글 퀴즈</h2>
            <p className='ds-text-caption ds-typ-body-3'>혼자서 도전해봐요</p>
          </div>
          <img className='mt-16 ml-auto h-auto w-[10vw] max-w-80 min-w-70' src={SingleQuiz} />
        </MotionLink>
        <MotionLink
          {...cardMotion}
          className='bg-white-50 dark:bg-dm-black-600 rounded-2xl p-24 py-16 hover:brightness-90 dark:hover:brightness-80'
          to='/multi'
        >
          <div className='flex flex-col gap-4'>
            <h2 className='text-primary-500 ds-typ-title-2'>멀티 퀴즈</h2>
            <p className='ds-text-caption ds-typ-body-3'>친구랑 대결해봐요</p>
          </div>
          <img className='mt-16 ml-auto h-auto w-[10vw] max-w-80 min-w-70' src={MultiQuiz} />
        </MotionLink>
        <MotionLink
          {...cardMotion}
          className='bg-white-50 dark:bg-dm-black-600 col-start-1 col-end-3 rounded-2xl p-24 py-16 hover:brightness-90 dark:hover:brightness-80'
          to='/review'
        >
          <div className='flex flex-col gap-4'>
            <h2 className='text-primary-500 ds-typ-title-2'>오답 노트</h2>
            <p className='ds-text-caption ds-typ-body-3'>틀린 문제로 다시 배워봐요</p>
          </div>
          <img className='ab mt-2 ml-auto h-auto w-[10vw] max-w-80 min-w-70' src={NoteQuiz} />
        </MotionLink>
      </div>
    </div>
  );
}
