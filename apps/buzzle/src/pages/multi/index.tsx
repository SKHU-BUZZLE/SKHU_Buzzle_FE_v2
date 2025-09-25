import multiQuizGuide from '@assets/images/multi-quiz-guide.webp';
import { CreateRoomIcon, EnterRoomIcon, Modal, QuickMatchIcon, QuizIntro } from '@buzzle/design';
import { useLife } from '@hooks/useLife';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);
const cardMotion = {
  transition: { type: 'spring', stiffness: 300, damping: 20 },
  whileHover: { scale: 0.96 },
  whileTap: { scale: 0.92 },
} as const;

export default function MultiPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: life = 0 } = useLife();

  const handleGuardedClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // 한 문제당 -1 + 멀티 퀴즈는 한 라운드당 5문제 => 최소 점수 5점
    if (life < 5) {
      e.preventDefault(); // 링크 이동 막기
      setIsOpen(true); // 모달 열기
    }
  };

  return (
    <section className='space-y-8'>
      <QuizIntro
        guidelines={[
          '빠른 시작은 무작위 1:1 대결을 해요.',
          '방을 생성하고 친구를 초대해보세요.',
          '친구가 준 참여 코드로 함께 할 수 있어요.',
        ]}
        src={multiQuizGuide}
        subtitle='7문제를 풀고, 나만의 기록을 만들어보세요'
        title='다같이 풀어보는 상식 퀴즈'
      />

      <div className='mt-48 flex flex-col gap-12'>
        <p className='ds-typ-body-1 ds-text-caption'>원하는 방식으로 시작하세요</p>

        <div className='flex gap-8'>
          <MotionLink
            {...cardMotion}
            className='ds-theme-bg-muted flex-1 rounded-2xl p-16 hover:brightness-95 dark:hover:brightness-85'
            to='/multi/random-matching'
            onClick={handleGuardedClick}
          >
            <p className='ds-typ-body-2 ds-text-normal'>랜덤 매칭하기</p>
            <QuickMatchIcon className='text-primary-500 mt-24 ml-auto size-[16vw] h-auto max-w-90' />
          </MotionLink>
          <MotionLink
            {...cardMotion}
            className='ds-theme-bg-muted flex-1 rounded-2xl p-16 hover:brightness-95 dark:hover:brightness-85'
            to='/multi/enter-room'
            onClick={handleGuardedClick}
          >
            <p className='ds-typ-body-2 ds-text-normal'>방 입장하기</p>
            <EnterRoomIcon className='text-primary-500 mt-24 ml-auto size-[16vw] h-auto max-w-90' />
          </MotionLink>
          <MotionLink
            {...cardMotion}
            className='ds-theme-bg-muted flex-1 rounded-2xl p-16 hover:brightness-95 dark:hover:brightness-85'
            to='/multi/create-room'
            onClick={handleGuardedClick}
          >
            <p className='ds-typ-body-2 ds-text-normal'>방 만들기</p>
            <CreateRoomIcon className='text-primary-500 mt-24 ml-auto size-[16vw] h-auto max-w-90' />
          </MotionLink>
        </div>
      </div>

      <Modal.Root open={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Content className='max-w-360'>
          <Modal.Title>하트가 조금 모자라요</Modal.Title>
          <Modal.Description>참여하려면 최소 5개 이상의 하트가 필요해요</Modal.Description>

          <Modal.Footer>
            <Modal.ActionButton onClick={() => setIsOpen(false)}>확인</Modal.ActionButton>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </section>
  );
}
