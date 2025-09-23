import { QuizOption } from '@buzzle/design';
import { useRefreshLife } from '@hooks/useLife';
import { useRoomStore } from '@stores/room';
import { useUserStore } from '@stores/user';
import { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

type MultiRoomContext = {
  handleAnswerSubmit: (answerIndex: number) => void;
};

const TOTAL_TIME = 10; // 10초라고 가정

export default function MultiRoomPlay() {
  const { user } = useUserStore();
  const refreshLife = useRefreshLife();
  const question = useRoomStore((s) => s.question);
  const answerResult = useRoomStore((s) => s.answerResult);
  const remainingTime = useRoomStore((s) => s.remainingTime);
  const { handleAnswerSubmit } = useOutletContext<MultiRoomContext>();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [nextLoading, setNextLoading] = useState<boolean>(false);

  // 오답 패널티 (3초간 클릭 금지)
  const [penalty, setPenalty] = useState<boolean>(false);
  const [penaltyRemaining, setPenaltyRemaining] = useState(0);
  const penaltyTimerRef = useRef<number | null>(null);
  const penaltyIntervalRef = useRef<number | null>(null);

  // 내 오답일 때만 패널티 배너
  const showPenaltyBanner = penalty && answerResult?.userEmail === user?.email && !answerResult?.correct;

  // 새 문제 오면 선택/상태 초기화
  useEffect(() => {
    if (!question) return;

    // setCurrentUser(false);
    setSelectedIndex(null);
    setNextLoading(false);

    setPenalty(false);
    setPenaltyRemaining(0);
    if (penaltyTimerRef.current) {
      clearTimeout(penaltyTimerRef.current);
      penaltyTimerRef.current = null;
    }
    if (penaltyIntervalRef.current) {
      clearInterval(penaltyIntervalRef.current);
      penaltyIntervalRef.current = null;
    }
  }, [question]);

  // 정답/오답 결과 처리
  useEffect(() => {
    if (!answerResult) return;

    const isMine = answerResult.userEmail === user?.email;

    // 결과 배너 3초 표시
    setShowResult(true);
    const resultTimer = window.setTimeout(() => setShowResult(false), 3000);

    if (answerResult.correct) {
      // 정답 → 다음 문제 이동 대비
      setSelectedIndex(null);
      setNextLoading(true);
      // 패널티 초기화
      setPenalty(false);
      setPenaltyRemaining(0);
      if (penaltyTimerRef.current) {
        clearTimeout(penaltyTimerRef.current);
        penaltyTimerRef.current = null;
      }
      if (penaltyIntervalRef.current) {
        clearInterval(penaltyIntervalRef.current);
        penaltyIntervalRef.current = null;
      }
    } else if (isMine) {
      // life 최신화
      refreshLife();

      // 내 오답 → 3초 패널티
      setPenalty(true);
      setPenaltyRemaining(3);

      if (penaltyTimerRef.current) clearTimeout(penaltyTimerRef.current);
      if (penaltyIntervalRef.current) clearInterval(penaltyIntervalRef.current);

      penaltyTimerRef.current = window.setTimeout(() => {
        setPenalty(false);
        setPenaltyRemaining(0);
        setSelectedIndex(null);
        penaltyTimerRef.current = null;
      }, 3000);

      penaltyIntervalRef.current = window.setInterval(() => {
        setPenaltyRemaining((prev) => (prev > 1 ? prev - 1 : 1));
      }, 1000);
    }

    return () => clearTimeout(resultTimer);
  }, [answerResult, user?.email]);

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (penaltyTimerRef.current) clearTimeout(penaltyTimerRef.current);
      if (penaltyIntervalRef.current) clearInterval(penaltyIntervalRef.current);
    };
  }, []);

  const handleClick = (idx: number) => {
    if (nextLoading || penalty) return;
    setSelectedIndex(idx);
    handleAnswerSubmit(idx); // 서버에 전송
  };

  // 진행 퍼센트 (0~100 clamp, 0도 유효)
  const progress =
    remainingTime == null ? 100 : Math.max(0, Math.min(100, (remainingTime / Math.max(1, TOTAL_TIME)) * 100));

  // 색상 단계
  let color = 'bg-black-300 dark:bg-white-300';
  if (progress <= 30) color = 'bg-error-red-500';

  if (!question) return null;

  const disabledAll = nextLoading || penalty;

  return (
    <div className='relative flex min-h-0 flex-1 flex-col gap-36'>
      <div className='dark:bg-dm-black-600 bg-white-200 relative h-10 w-full overflow-hidden rounded-full'>
        <div className={`h-full transition-all duration-1000 ease-linear ${color}`} style={{ width: `${progress}%` }} />
      </div>

      <div className='flex flex-col gap-4'>
        <p className='ds-typ-body-2 ds-text-caption'>
          <span className='text-primary-500'>Q. {question.questionIndex + 1}</span> / 5
        </p>
        <h1 className='ds-typ-heading-2 ds-text-strong'>{question.question}</h1>
      </div>

      <div className='flex flex-col gap-12'>
        {question.options.map((option, index) => (
          <QuizOption
            key={`${option}`}
            disabled={disabledAll}
            index={index}
            isCorrect={Boolean(answerResult?.correct) && Number(answerResult?.correctAnswer) === index}
            isIncorrect={Boolean(answerResult && !answerResult.correct && selectedIndex === index)}
            isSelected={selectedIndex === index}
            option={option}
            onClick={handleClick}
          />
        ))}
      </div>

      <div className='ds-typ-heading-3 ds-text-muted mt-auto flex w-full flex-col items-center gap-4 pb-120'>
        {/* 정답일 때 */}
        {showResult && answerResult?.correct && (
          <>
            <h1>축하합니다!</h1>
            <h1>
              <span className='text-primary-500'>{answerResult.userName}</span>님이 정답을 맞혔어요
            </h1>
          </>
        )}

        {/* 오답일 때 (내 오답 + 패널티 중) */}
        {showPenaltyBanner && (
          <>
            <h1>아쉽지만 오답이에요</h1>
            <h1>
              <span className='text-error-red-500'>{penaltyRemaining}초</span> 뒤에 다시 시도해주세요
            </h1>
          </>
        )}
      </div>
    </div>
  );
}
