import { createSingleQuiz } from '@apis/single';
import QuizLoading from '@assets/images/quiz-creation.webp';
import { useRouteLeaveGuard } from '@hooks/useRouteLeaveGuard';
import { bounceLoop } from '@utils/motionUtils';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';

// Intro 페이지에서 전달받는 state의 타입 정의
interface LoadingState {
  category: 'HISTORY' | 'SCIENCE' | 'SOCIETY' | 'CULTURE' | 'SPORTS' | 'NATURE' | 'MISC' | 'ALL';
  size: number;
}

export default function QuizLoadingPage() {
  const { state } = useLocation() as { state: LoadingState };
  const navigate = useNavigate();
  const [guardEnabled, setGuardEnabled] = useState(true);
  const cancelledRef = useRef(false);

  useRouteLeaveGuard(guardEnabled);

  useEffect(() => {
    // state가 없으면 single 페이지로 리다이렉트
    if (!state || !state.category || !state.size) {
      navigate('/single', { replace: true });
      return;
    }

    cancelledRef.current = false;

    const fetchQuizData = async () => {
      try {
        const response = await createSingleQuiz({
          category: state.category,
          size: state.size,
        });

        if (cancelledRef.current) return;

        // state 업데이트가 바로 반영되지않기 때문에 강제로 업데이트
        flushSync(() => setGuardEnabled(false));

        // 퀴즈 데이터를 받으면 play 페이지로 이동
        navigate('/single/play', {
          state: {
            quizzes: response.data.data.quizResDtos,
            totalQuestions: state.size,
            category: state.category,
          },
          replace: true,
        });
      } catch (error) {
        if (cancelledRef.current) return;
        console.error('퀴즈 생성 실패:', error);
        setGuardEnabled(false);
        // 에러 발생 시 single 페이지로 돌아가기
        navigate('/single', { replace: true });
      }
    };

    fetchQuizData();

    return () => {
      cancelledRef.current = true;
    };
  }, [state, navigate]);

  return (
    <section className='min-h-inherit flex flex-1 flex-col items-center justify-center gap-36 text-center'>
      <motion.img
        alt='Quiz Loading'
        animate='animate'
        className='size-200 object-contain'
        src={QuizLoading}
        variants={bounceLoop}
      />
      <div className='flex flex-col gap-12'>
        <h2 className='ds-typ-title-1'>두근두근, 퀴즈 준비 중...</h2>
        <h3 className='ds-typ-body-2 ds-text-caption'>곧 시작하니 잠시만 기다려주세요!</h3>
      </div>
    </section>
  );
}
