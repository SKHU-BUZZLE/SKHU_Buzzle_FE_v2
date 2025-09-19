import multQuizQuide from '@assets/images/multi-quiz-guide.webp';
import { MoonIcon, QuizIntro } from '@buzzle/design';
import { Link } from 'react-router-dom';

export default function MultiPage() {
  return (
    <section className='space-y-8'>
      <QuizIntro
        guidelines={[
          '빠른 시작은 무작위 1:1 대결을 해요.',
          '방을 생성하고 친구를 초대해보세요.',
          '친구가 준 참여 코드로 함께 할 수 있어요.',
        ]}
        src={multQuizQuide}
        subtitle='7문제를 풀고, 나만의 기록을 만들어보세요'
        title='다같이 풀어보는 상식 퀴즈'
      />

      <div className='mt-48 flex flex-col gap-12'>
        <p className='ds-typ-body-1 ds-text-caption'>원하는 방식으로 시작하세요</p>

        <div className='flex gap-8'>
          <Link className='ds-theme-bg-muted flex-1 rounded-2xl p-16' to='/multi/random-matching'>
            <p className='ds-typ-body-2 ds-text-normal'>랜덤 매칭하기</p>
            <MoonIcon className='text-primary-500 mt-24 ml-auto size-60' />
          </Link>
          <Link className='ds-theme-bg-muted flex-1 rounded-2xl p-16' to='/multi/enter-room'>
            <p className='ds-typ-body-2 ds-text-normal'>방 입장하기</p>
            <MoonIcon className='text-primary-500 mt-24 ml-auto size-60' />
          </Link>
          <Link className='ds-theme-bg-muted flex-1 rounded-2xl p-16' to='/multi/create-room'>
            <p className='ds-typ-body-2 ds-text-normal'>방 만들기</p>
            <MoonIcon className='text-primary-500 mt-24 ml-auto size-60' />
          </Link>
        </div>
      </div>
    </section>
  );
}
