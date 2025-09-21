import QuizLoading from '@assets/images/quiz-creation.webp';

export default function QuizLoadingPage() {
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
