import SingleQuizResult from '@assets/images/single-quiz-result.webp';
import { Button } from '@buzzle/design';
import { useNavigate } from 'react-router-dom';

interface SingleResultPageProps {
  total?: number;
  correct?: number;
}

export default function SingleResultPage({ total = 0, correct = 0 }: SingleResultPageProps) {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/single', { replace: true });
  };

  return (
    <div className='relative flex min-h-0 flex-1 flex-col'>
      <div className='flex flex-1 flex-col items-center justify-center space-y-70 pb-100 text-center'>
        <img alt='퀴즈 결과' className='w-280' src={SingleQuizResult} />

        <div className='flex flex-col gap-14'>
          <h2 className='ds-typ-heading-2 text-black-600 dark:text-white-300'>
            <span>{total}</span>개 중 <span className='text-primary-500'>{correct}</span>개 맞혔어요!
          </h2>
          <div className='ds-typ-body-2 text-white-800 dark:text-white-300'>
            <p>멋져요! 좋은 기록을 세웠네요</p>
            <p>계속 도전해서 더 높은 점수를 만들어보세요</p>
          </div>
        </div>
      </div>

      <div className='ds-layout-max-width ds-layout-padding fixed right-0 bottom-80 left-0 mx-auto'>
        <Button className='w-full rounded-2xl' onClick={handleRetry}>
          다시 도전하기
        </Button>
      </div>
    </div>
  );
}
