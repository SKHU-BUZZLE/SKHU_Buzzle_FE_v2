import ReviewQuizImage from '@assets/images/note-quiz-guide.webp';
import { Button, QuizIntro } from '@buzzle/design';
import { useNavigate } from 'react-router-dom';

export default function ReviewQuizIntroPage() {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/review-quiz/play');
  };

  return (
    <div className='relative flex min-h-0 flex-1 flex-col'>
      <QuizIntro
        guidelines={['틀린 문제만 다시 풀 수 있어요.', '총 7문제가 주어져요.', '문제당 제한 시간은 10초예요.']}
        src={ReviewQuizImage}
        subtitle='틀린 문제를 복습하고, 더 좋은 기록에 도전해보세요'
        title='다시 도전하는 오답 퀴즈'
      />

      <div className='ds-layout-max-width ds-layout-padding ds-theme-bg-base-gradient fixed right-0 bottom-63 left-0 mx-auto pt-30 pb-20'>
        <Button className='w-full rounded-2xl' onClick={handleStartQuiz}>
          오답 퀴즈 도전하기
        </Button>
      </div>
    </div>
  );
}
