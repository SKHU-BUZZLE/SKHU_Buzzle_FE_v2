import { QuizOption } from '@buzzle/design';
import { useRoom } from '@stores/room';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

type MultiRoomContext = {
  handleAnswerSubmit: (answerIndex: number) => void;
};

export default function MultiRoomPlay() {
  const { question, answerResult } = useRoom();
  const { handleAnswerSubmit } = useOutletContext<MultiRoomContext>();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [nextLoading, setNextLoading] = useState<boolean>(false);

  // 새 문제 오면 선택 초기화
  useEffect(() => {
    if (question) {
      setSelectedIndex(null);
      setNextLoading(false);
    }
  }, [question, question?.questionIndex]);

  // 정답이면 선택 초기화 (다음 문제로 넘어가는 흐름 대비)
  useEffect(() => {
    if (answerResult?.correct) {
      setSelectedIndex(null);
      setNextLoading(true);
    }
  }, [answerResult, answerResult?.correct]);

  // 정답/오답 결과 들어왔을 때 3초간만 표시
  useEffect(() => {
    if (!answerResult) return;

    setShowResult(true);
    const timer = setTimeout(() => setShowResult(false), 3000);

    return () => clearTimeout(timer);
  }, [answerResult]);

  const handleClick = (idx: number) => {
    setSelectedIndex(idx);
    handleAnswerSubmit(idx); // 서버에 전송
  };

  if (!question) return;

  return (
    <div className='relative flex min-h-0 flex-1 flex-col gap-36'>
      <div className='flex flex-col gap-4'>
        <p className='ds-typ-body-2 ds-text-caption'>
          <span className='text-primary-500'>Q. {question?.questionIndex + 1}</span> / 3
        </p>
        <h1 className='ds-typ-heading-2 ds-text-strong'>{question?.question}</h1>
      </div>

      <div className='flex flex-col gap-12'>
        {question?.options.map((option, index) => (
          <QuizOption
            key={option}
            disabled={nextLoading}
            index={index}
            isCorrect={answerResult?.correct && Number(answerResult?.correctAnswer) === index}
            isIncorrect={!answerResult?.correct && selectedIndex === index}
            isSelected={selectedIndex === index}
            option={option}
            onClick={handleClick}
          />
        ))}
      </div>

      {showResult &&
        (answerResult?.correct ? (
          <h1 className='ds-typ-heading-2 text-primary-500 mt-auto w-full text-center'>{answerResult.message}</h1>
        ) : (
          <h1 className='ds-typ-heading-2 ds-text-muted mt-auto w-full text-center'>
            {answerResult?.message} <span className='text-error-red-500'>3초</span> 뒤에 다시 시도해주세요.
          </h1>
        ))}
    </div>
  );
}
