import QuizLoading from '@assets/images/quiz-creation.webp';
import { useRouteLeaveGuard } from '@hooks/useRouteLeaveGuard';
import { mockInstance } from '@mocks/mockInstance';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Intro 페이지에서 전달받는 state의 타입 정의
interface LoadingState {
  category: string;
  size: number;
}

export default function QuizLoadingPage() {
  const { state } = useLocation() as { state: LoadingState };
  const navigate = useNavigate();
  const [guardEnabled, setGuardEnabled] = useState(true);

  useRouteLeaveGuard(guardEnabled);

  useEffect(() => {
    // state가 없으면 single 페이지로 리다이렉트
    if (!state || !state.category || !state.size) {
      navigate('/single', { replace: true });
      return;
    }

    const fetchQuizData = async () => {
      try {
        const response = await mockInstance.post('/quiz/multiple', {
          category: state.category,
          size: state.size,
        });

        setGuardEnabled(false);

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
        console.error('퀴즈 생성 실패:', error);
        setGuardEnabled(false);
        // 에러 발생 시 single 페이지로 돌아가기
        navigate('/single', { replace: true });
      }
    };

    fetchQuizData();
  }, [state, navigate]);

  return (
    <section className='min-h-inherit flex flex-1 flex-col items-center justify-center gap-70 text-center'>
      <img alt='Quiz Loading' className='w-266' src={QuizLoading} />
      <div className='ds-typ-heading-2 text-black-600 dark:text-white-300 flex flex-col gap-8'>
        <h2>열심히 퀴즈를 만들고 있어요.</h2>
        <h2>잠시만 기다려주세요!</h2>
      </div>
    </section>
  );
}
