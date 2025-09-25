import singleQuizGuide from '@assets/images/single-quiz-guide.webp';
import { Button, QuizIntro } from '@buzzle/design';
import QuestionCounter from '@components/QuestionCounter';
import QuizCategory from '@components/quizCategory';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SinglePage() {
  const [count, setCount] = useState(1);
  const [category, setCategory] = useState<string>('ALL');
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    // 선택된 카테고리와 문제수를 state로 전달하여 loading 페이지로 이동
    navigate('/single/loading', {
      state: {
        category,
        size: count,
      },
    });
  };

  return (
    <div className='relative flex min-h-full flex-col'>
      <div className='flex flex-col gap-36 pb-120'>
        <QuizIntro
          guidelines={[
            '문제당 제한 시간은 10초예요.',
            '틀린 문제는 오답 노트에서 다시 확인할 수 있어요.',
            '한 문제를 틀릴 때마다 하트가 2개 줄어들어요.',
          ]}
          src={singleQuizGuide}
          subtitle='혼자서 도전하며 기록을 세워보세요'
          title='혼자 풀어보는 상식 퀴즈'
        />

        <div className='flex flex-col gap-8'>
          <p className='ds-typ-title-2 ds-text-muted'>문제 수</p>
          <QuestionCounter count={count} setCount={setCount} />
        </div>

        <QuizCategory value={category} onChange={setCategory} />
      </div>
      <div className='ds-layout-max-width ds-layout-padding ds-theme-bg-base-gradient fixed right-0 bottom-63 left-0 mx-auto pt-30 pb-20'>
        <Button className='w-full rounded-2xl' onClick={handleStartQuiz}>
          퀴즈 시작하기
        </Button>
      </div>
    </div>
  );
}
