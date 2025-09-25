import NoteQuizResult from '@assets/images/note-quiz-result.webp';
import { Button } from '@buzzle/design';
import { fadeRiseIn, listStagger } from '@utils/motionUtils';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ResultState {
  result?: {
    totalQuestions: number;
    correctAnswers: number;
    removedFromWrongNotes: number;
    results: Array<{
      quizResultId: number;
      question: string;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
      removedFromWrongNotes: boolean;
    }>;
  };
}

export default function ReviewQuizResultPage() {
  const { state } = useLocation() as { state: ResultState };
  const navigate = useNavigate();

  const result = state?.result;
  const totalQuestions = result?.totalQuestions ?? 0;
  const correctAnswers = result?.correctAnswers ?? 0;

  useEffect(() => {
    if (!state || !result) {
      navigate('/review-quiz', { replace: true });
    }
  }, [state, result, navigate]);

  const handleRetry = () => {
    navigate('/review-quiz', { replace: true });
  };

  return (
    <div className='relative flex min-h-0 flex-1 flex-col'>
      <div className='flex flex-1 flex-col items-center justify-center space-y-70 pb-100 text-center'>
        <img alt='퀴즈 결과' className='w-200' src={NoteQuizResult} />

        <div className='flex flex-col gap-16'>
          <motion.h2
            animate='animate'
            className='ds-typ-heading-2 text-black-600 dark:text-white-300'
            initial='initial'
            variants={fadeRiseIn}
          >
            <span>{totalQuestions}</span>개 중 <span className='text-primary-500'>{correctAnswers}</span>개 맞혔어요!
          </motion.h2>
          <motion.div
            animate='animate'
            className='ds-typ-body-2 ds-text-caption flex flex-col items-center gap-4'
            initial='initial'
            variants={listStagger}
          >
            <motion.p variants={fadeRiseIn}>실력이 점점 늘고있어요</motion.p>
            <motion.p variants={fadeRiseIn}>다시 도전하면서 새로운 문제도 만나보세요</motion.p>
          </motion.div>
        </div>
      </div>

      <div className='ds-layout-max-width ds-layout-padding ds-theme-bg-base-gradient fixed right-0 bottom-63 left-0 mx-auto pt-30 pb-20'>
        <Button className='w-full rounded-2xl' onClick={handleRetry}>
          다시 도전하기
        </Button>
      </div>
    </div>
  );
}
