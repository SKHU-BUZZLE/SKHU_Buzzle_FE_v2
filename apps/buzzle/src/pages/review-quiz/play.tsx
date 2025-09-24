import { QuizOption, TimeProgressBar } from '@buzzle/design';
import { useChallengeQuiz, useSubmitChallengeAnswers } from '@hooks/useReview';
import { useRouteLeaveGuard } from '@hooks/useRouteLeaveGuard';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';

const NEXT_QUESTION_DELAY = 3000;

export default function ReviewQuizPlayPage() {
  const navigate = useNavigate();

  // 퀴즈 데이터 조회
  const { data: quizData, isLoading, error } = useChallengeQuiz();

  // 답안 제출 뮤테이션
  const submitAnswersMutation = useSubmitChallengeAnswers();

  // 상태 관리
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [questionKey, setQuestionKey] = useState(0); // 타이머 리셋용
  const [guardEnabled, setGuardEnabled] = useState(true);

  // 모든 답안 저장용
  const answersRef = useRef<{ quizResultId: number; userAnswerNumber: string }[]>([]);

  useRouteLeaveGuard(guardEnabled);

  // 데이터가 없으면 intro 페이지로 리다이렉트
  useEffect(() => {
    if (error || (quizData && quizData.quizzes.length === 0)) {
      navigate('/review-quiz', { replace: true });
    }
  }, [quizData, error, navigate]);

  if (isLoading) {
    return (
      <div className='flex min-h-full items-center justify-center'>
        <p className='ds-text-muted text-center'>문제를 불러오는 중...</p>
      </div>
    );
  }

  if (!quizData || quizData.quizzes.length === 0) {
    return null;
  }

  const currentQuiz = quizData.quizzes[currentQuestionIndex];
  const options = [currentQuiz.option1, currentQuiz.option2, currentQuiz.option3, currentQuiz.option4];

  // 답안 선택 핸들러
  const handleOptionClick = (optionIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    setIsTimerPaused(true); // 타이머 정지

    // 답안 저장 (1-based index)
    answersRef.current.push({
      quizResultId: currentQuiz.quizResultId,
      userAnswerNumber: String(optionIndex + 1),
    });

    setShowResult(true);

    // 3초 후 다음 문제로 이동
    setTimeout(() => {
      goToNextQuestion();
    }, NEXT_QUESTION_DELAY);
  };

  // 타이머 종료 시 호출 (10초 타임아웃)
  const handleTimerEnd = () => {
    if (isAnswered) return;

    setIsAnswered(true);
    setIsTimerPaused(true);

    // 타임아웃 답안 저장 (timeout으로 저장)
    answersRef.current.push({
      quizResultId: currentQuiz.quizResultId,
      userAnswerNumber: 'timeout',
    });

    setShowResult(true);

    // 3초 후 다음 문제로 이동
    setTimeout(() => {
      goToNextQuestion();
    }, NEXT_QUESTION_DELAY);
  };

  // 다음 문제로 이동
  const goToNextQuestion = () => {
    if (currentQuestionIndex + 1 >= quizData.quizzes.length) {
      // 가드를 먼저 '즉시' 끕니다
      flushSync(() => setGuardEnabled(false));

      // 모든 문제 완료 - 답안 제출
      submitAnswersMutation.mutate(answersRef.current);
    } else {
      // 다음 문제로
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowResult(false);
      setIsTimerPaused(false);
      setQuestionKey((prev) => prev + 1); // 타이머 리셋
    }
  };

  return (
    <div className='flex min-h-full flex-col'>
      <TimeProgressBar key={questionKey} duration={10} isPaused={isTimerPaused} onTimerEnd={handleTimerEnd} />

      {/* 상단 문제 번호 */}
      <div className='pt-90'>
        <span className='ds-typ-body-3 text-white-700'>
          <span className='text-primary-500 font-bold'>Q.{currentQuestionIndex + 1}</span> / {quizData.quizzes.length}
        </span>
      </div>

      {/* 문제 영역 */}
      <div className='flex-1'>
        <h1 className='ds-typ-heading-1 text-black-600 dark:text-white-500 mb-90'>{currentQuiz.question}</h1>

        {/* 선택지 */}
        <div className='space-y-16'>
          {options.map((option, index) => (
            <QuizOption
              key={`quiz-${currentQuestionIndex}-option-${option}`}
              disabled={isAnswered}
              index={index}
              isSelected={selectedAnswer === index}
              option={option}
              onClick={handleOptionClick}
            />
          ))}
        </div>

        {/* 결과 메시지 */}
        {showResult && (
          <div className='ds-text-normal pt-100 text-center text-4xl font-bold'>
            {selectedAnswer !== null ? (
              <p>답안이 제출되었습니다!</p>
            ) : (
              <p className='text-error-red-500'>시간 초과입니다!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
