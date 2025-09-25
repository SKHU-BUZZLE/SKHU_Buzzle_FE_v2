import QuizLoading from '@assets/images/quiz-creation.webp';
import { QuizOption, TimeProgressBar } from '@buzzle/design';
import { useChallengeQuiz, useSubmitChallengeAnswers } from '@hooks/useReview';
import { useRouteLeaveGuard } from '@hooks/useRouteLeaveGuard';
import { bounceLoop, fadeRiseIn } from '@utils/motionUtils';
import { motion } from 'motion/react';
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

  // 마지막 문제 인덱스 확인
  const isLastQuestion = currentQuestionIndex === quizData?.quizzes.length - 1;
  let resultMessage: string;
  if (selectedAnswer !== null) {
    resultMessage = isLastQuestion ? '결과를 확인해보세요 🎉' : '다음 문제로 넘어갑니다!';
  } else {
    resultMessage = '시간이 다 되었어요 ⏰';
  }

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
      <div
        aria-busy='true'
        aria-live='polite'
        className='ds-theme-bg-backdrop fixed inset-0 z-10 flex h-screen w-screen items-center justify-center'
      >
        <div className='ds-theme-bg-base flex h-full w-full max-w-480 min-w-320 items-center justify-center'>
          <div className='flex flex-col items-center justify-center gap-12'>
            <motion.img
              alt='Quiz Loading'
              animate='animate'
              className='mb-20 size-200 object-contain'
              src={QuizLoading}
              variants={bounceLoop}
            />
            <h1 className='ds-typ-title-1'>두근두근, 퀴즈 준비 중...</h1>
            <p className='ds-typ-body-2 ds-text-caption'>곧 시작하니 잠시만 기다려주세요!</p>
          </div>
        </div>
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
    <div className='relative flex min-h-0 flex-1 flex-col gap-36'>
      <TimeProgressBar key={questionKey} duration={10} isPaused={isTimerPaused} onTimerEnd={handleTimerEnd} />

      <div className='flex flex-col gap-4'>
        {/* 상단 문제 번호 */}
        <p className='ds-typ-body-2 ds-text-caption'>
          <span className='text-primary-500'>Q. {currentQuestionIndex + 1}</span> / {quizData.quizzes.length}
        </p>

        {/* 문제 영역 */}
        <h1 className='ds-typ-heading-2 ds-text-strong'>{currentQuiz.question}</h1>
      </div>

      {/* 선택지 */}
      <div className='flex flex-col gap-12'>
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
        <motion.div
          {...fadeRiseIn}
          className='ds-typ-heading-3 ds-text-muted mt-auto flex w-full flex-col items-center gap-4 pb-120'
        >
          <p>{resultMessage}</p>
        </motion.div>
      )}
    </div>
  );
}
