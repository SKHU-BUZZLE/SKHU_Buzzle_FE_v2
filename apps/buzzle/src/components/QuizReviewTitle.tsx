import { ChevronIcon } from '@buzzle/design';
import { Link } from 'react-router-dom';

export default function QuizReviewTitle({ title, quizId }: { title: string; quizId: number }) {
  return (
    <Link
      className='flex items-center justify-between py-12 hover:opacity-80 active:brightness-80'
      to={`/review/${quizId}`}
    >
      <div className='flex items-center gap-16'>
        <p
          aria-hidden='true'
          className='bg-primary-alpha-10 dark:bg-primary-alpha-20 text-primary-500 flex size-26 items-center justify-center rounded-full text-sm'
        >
          Q
        </p>
        <h3 className='ds-text-normal ds-typ-body-1'>{title}</h3>
      </div>

      <ChevronIcon className='ds-text-caption size-20 rotate-180' />
    </Link>
  );
}
