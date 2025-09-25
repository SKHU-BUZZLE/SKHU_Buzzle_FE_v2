import { QuizOption, TimeProgressBar } from '@buzzle/design';
import { useSubmitSingleAnswer } from '@hooks/useLife';
import { useRouteLeaveGuard } from '@hooks/useRouteLeaveGuard';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';

interface QuizItem {
  answer: string;
  nowTime: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  question: string;
}

interface PlayState {
  quizzes: QuizItem[];
  totalQuestions: number;
  category: 'HISTORY' | 'SCIENCE' | 'SOCIETY' | 'CULTURE' | 'SPORTS' | 'NATURE' | 'MISC' | 'ALL';
}

const NEXT_QUESTION_DELAY = 3000;

export default function SinglePlayPage() {
  const { state } = useLocation() as { state: PlayState };
  const navigate = useNavigate();

  // 라이프 관리 뮤테이션
  const submitAnswerMutation = useSubmitSingleAnswer();

  // 상태 관리
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [questionKey, setQuestionKey] = useState(0); // 타이머 리셋용
  const [guardEnabled, setGuardEnabled] = useState(true);

  // 정답 개수 추적 (클로저 문제 없는 ref 사용)
  const correctAnswersRef = useRef(0);

  useRouteLeaveGuard(guardEnabled);

  // state가 없으면 single 페이지로 리다이렉트
  useEffect(() => {
    if (!state || !state.quizzes || state.quizzes.length === 0) {
      navigate('/single', { replace: true });
    }
  }, [state, navigate]);

  if (!state || !state.quizzes || state.quizzes.length === 0) {
    return null;
  }

  const currentQuiz = state.quizzes[currentQuestionIndex];
  const options = [currentQuiz.option1, currentQuiz.option2, currentQuiz.option3, currentQuiz.option4];

  // 답안 선택 핸들러
  const handleOptionClick = async (optionIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    setIsTimerPaused(true); // 타이머 정지

    try {
      // 정답 제출 뮤테이션 실행 (라이프 자동 업데이트 포함)
      const response = await submitAnswerMutation.mutateAsync({
        question: currentQuiz.question,
        option1: currentQuiz.option1,
        option2: currentQuiz.option2,
        option3: currentQuiz.option3,
        option4: currentQuiz.option4,
        correctAnswerNumber: currentQuiz.answer as '1' | '2' | '3' | '4',
        userAnswerNumber: String(optionIndex + 1) as '1' | '2' | '3' | '4',
        category: state.category,
      });

      // 백엔드 응답 기반으로 정답 카운트
      if (response.data.data) {
        correctAnswersRef.current += 1;
      }
    } catch (error) {
      console.error('정답 제출 실패:', error);
      // 네트워크 에러 시: 프론트엔드에서 임시로 정답 검증 (fallback)
      const correctAnswerIndex = parseInt(currentQuiz.answer) - 1;
      const isCorrectAnswer = optionIndex === correctAnswerIndex;
      if (isCorrectAnswer) {
        correctAnswersRef.current += 1;
      }
    }

    setShowResult(true);

    // 3초 후 다음 문제로 이동
    setTimeout(() => {
      goToNextQuestion();
    }, NEXT_QUESTION_DELAY);
  };

  // 타이머 종료 시 호출 (10초 타임아웃)
  const handleTimerEnd = async () => {
    if (isAnswered) return;

    setIsAnswered(true);
    setIsTimerPaused(true);

    // 타임아웃은 무조건 오답이므로 정답 카운트 증가 없음

    try {
      // 타임아웃으로 정답 제출 뮤테이션 실행 (라이프 자동 업데이트 포함)
      await submitAnswerMutation.mutateAsync({
        question: currentQuiz.question,
        option1: currentQuiz.option1,
        option2: currentQuiz.option2,
        option3: currentQuiz.option3,
        option4: currentQuiz.option4,
        correctAnswerNumber: currentQuiz.answer as '1' | '2' | '3' | '4',
        userAnswerNumber: 'timeout',
        category: state.category,
      });
    } catch (error) {
      console.error('타임아웃 처리 실패:', error);
      // 네트워크 에러 시에도 정답 카운트는 증가하지 않음 (타임아웃이므로)
    }

    setShowResult(true);

    // 3초 후 다음 문제로 이동
    setTimeout(() => {
      goToNextQuestion();
    }, NEXT_QUESTION_DELAY);
  };

  // 다음 문제로 이동
  const goToNextQuestion = () => {
    if (currentQuestionIndex + 1 >= state.quizzes.length) {
      // 가드를 먼저 '즉시' 끕니다
      flushSync(() => setGuardEnabled(false));
      // 모든 문제 완료 - 결과 페이지로 이동
      navigate('/single/result', {
        state: {
          total: state.quizzes.length,
          correct: correctAnswersRef.current, // ref 값 사용으로 최신 정답 개수 보장
        },
        replace: true,
      });
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
          <span className='text-primary-500'>Q. {currentQuestionIndex + 1}</span> / {state.quizzes.length}
        </p>

        {/* 문제 영역 */}
        <h1 className='ds-typ-heading-2 ds-text-strong'>{currentQuiz.question}</h1>
      </div>

      {/* 선택지 */}
      <div className='flex flex-col gap-12'>
        {options.map((option, index) => {
          const correctIndex = parseInt(currentQuiz.answer) - 1;
          return (
            <QuizOption
              key={`quiz-${currentQuestionIndex}-option-${option}`}
              disabled={isAnswered}
              index={index}
              isCorrect={showResult && index === correctIndex}
              isIncorrect={showResult && selectedAnswer === index && index !== correctIndex}
              isSelected={!showResult && selectedAnswer === index}
              option={option}
              onClick={handleOptionClick}
            />
          );
        })}
      </div>

      {/* 결과 메시지 */}
      {showResult && (
        <div className='ds-typ-heading-3 ds-text-muted mt-auto flex w-full flex-col items-center gap-4 pb-120'>
          {selectedAnswer !== null ? (
            <p>{selectedAnswer === parseInt(currentQuiz.answer) - 1 ? '정답입니다' : '아쉽지만 오답이네요'}</p>
          ) : (
            <p>시간 초과입니다</p>
          )}
        </div>
      )}
    </div>
  );
}
