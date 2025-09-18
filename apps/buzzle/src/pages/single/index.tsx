import QuizCategory from '@components/quizCategory';
import { useState } from 'react';

export default function SinglePage() {
  const [category, setCategory] = useState<string>('all');

  return (
    <section className='space-y-8'>
      <h1 className='ds-typ-heading-2 ds-text-strong'>싱글 퀴즈</h1>
      <p className='ds-text-normal'>임시 싱글 퀴즈 페이지입니다.</p>

      <QuizCategory value={category} onChange={setCategory} />

      <div className='mt-8'>
        <p className='ds-text-normal'>
          현재 선택된 카테고리: <strong>{category}</strong>
        </p>
      </div>
    </section>
  );
}
