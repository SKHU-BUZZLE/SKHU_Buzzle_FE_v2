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
        guidelines={[
          '총 7문제가 주어져요.',
          '문제당 제한 시간은 10초예요.',
          '맞힌 문제는 오답노트에서 자동으로 사라져요.',
        ]}
        src={ReviewQuizImage}
        subtitle='틀린 문제만 다시 풀어봐요'
        title='다시 도전하는 오답 퀴즈'
      />

      <div className='ds-layout-max-width ds-layout-padding fixed right-0 bottom-80 left-0 mx-auto'>
        <Button className='w-full rounded-2xl' onClick={handleStartQuiz}>
          오답 퀴즈 도전하기
        </Button>
      </div>
    </div>
  );
}
