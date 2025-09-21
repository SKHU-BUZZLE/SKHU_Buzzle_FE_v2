import singleQuizQuide from '@assets/images/single-quiz-guide.webp';
import { Button, QuizIntro } from '@buzzle/design';
import QuestionCounter from '@components/QuestionCounter';
import QuizCategory from '@components/quizCategory';
import { useState } from 'react';

export default function SinglePage() {
  const [count, setCount] = useState(1);
  const [category, setCategory] = useState<string>('ALL');

  return (
    <div className='relative flex min-h-full flex-col'>
      {/* 메인 콘텐츠 영역 - 버튼 높이만큼 아래 패딩 추가 */}
      <div className='flex-1 space-y-20 pb-100'>
        <QuizIntro
          guidelines={[
            '문제당 제한 시간은 10초예요.',
            '틀린 문제는 오답 노트에서 다시 확인할 수 있어요.',
            '보유한 하트보다 많은 문제는 선택할 수 없어요.',
          ]}
          src={singleQuizQuide}
          subtitle='문제를 풀고, 나만의 기록을 만들어보세요'
          title='혼자서 즐기는 상식 퀴즈'
        />

        <QuestionCounter count={count} setCount={setCount} />

        <QuizCategory value={category} onChange={setCategory} />
      </div>

      {/* 바닥에 고정된 버튼 - 네비게이션 바 위 30px */}
      <div className='ds-layout-max-width ds-layout-padding fixed right-0 bottom-80 left-0 mx-auto'>
        <Button className='w-full rounded-2xl'>퀴즈 생성</Button>
      </div>
    </div>
  );
}
