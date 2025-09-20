import { QuizOption } from '@buzzle/design';
import { useRoom } from '@stores/room';
import { useUserStore } from '@stores/user';
import { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

type MultiRoomContext = {
  handleAnswerSubmit: (answerIndex: number) => void;
};

const TOTAL_TIME = 10; // 10초라고 가정

export default function MultiRoomPlay() {
  const { user } = useUserStore();
  const { question, answerResult, remainingTime } = useRoom();
  const { handleAnswerSubmit } = useOutletContext<MultiRoomContext>();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [nextLoading, setNextLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<boolean>(false);
  // 오답 패널티 (3초간 클릭 금지)
  const [penalty, setPenalty] = useState<boolean>(false);
  const penaltyTimerRef = useRef<number | null>(null);
  const [penaltyRemaining, setPenaltyRemaining] = useState(0);
  const penaltyIntervalRef = useRef<number | null>(null);
  const showPenaltyBanner = penalty && !answerResult?.correct;

  // 새 문제 오면 선택 초기화
  useEffect(() => {
    if (question) {
      setCurrentUser(false);
      setSelectedIndex(null);
      setNextLoading(false);

      setPenalty(false);
      if (penaltyTimerRef.current) {
        clearTimeout(penaltyTimerRef.current);
        penaltyTimerRef.current = null;
      }
    }
  }, [question]);

  // 정답이면 선택 초기화 (다음 문제로 넘어가는 흐름 대비)
  useEffect(() => {
    const isMine = answerResult?.userEmail === user?.email;
    setCurrentUser(isMine);

    if (answerResult?.correct) {
      // 정답이면 다음 문제 이동 대비
      setSelectedIndex(null);
      setNextLoading(true);
      // 정답일 땐 페널티 없음
      setPenalty(false);
      if (penaltyTimerRef.current) {
        clearTimeout(penaltyTimerRef.current);
        penaltyTimerRef.current = null;
      }
    } else if (answerResult && isMine) {
      // 내 오답이면 3초간 패널티
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
  }, [answerResult, user?.email]);

  // 정답/오답 결과 들어왔을 때 3초간만 표시
  useEffect(() => {
    if (!answerResult) return;

    setShowResult(true);
    const timer = setTimeout(() => setShowResult(false), 3000);
    return () => clearTimeout(timer);
  }, [answerResult]);

  const handleClick = (idx: number) => {
    if (nextLoading || penalty) return;
    setSelectedIndex(idx);
    handleAnswerSubmit(idx); // 서버에 전송
  };

  // 퍼센트 계산
  if (!remainingTime) return;
  const progress = (remainingTime / TOTAL_TIME) * 100;

  // 색상 단계 (남은 시간 비율에 따라 색 바뀜)
  let color = 'bg-black-300 dark:bg-white-300';
  if (progress <= 30) {
    color = 'bg-error-red-500';
  }

  if (!question) return;
  const disabledAll = nextLoading || penalty;

  return (
    <div className='relative flex min-h-0 flex-1 flex-col gap-36'>
      <div className='dark:bg-dm-black-600 bg-white-200 relative h-10 w-full overflow-hidden rounded-full'>
        <div className={`h-full transition-all duration-1000 ease-linear ${color}`} style={{ width: `${progress}%` }} />
      </div>

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
            disabled={disabledAll}
            index={index}
            isCorrect={answerResult?.correct && Number(answerResult?.correctAnswer) === index}
            isIncorrect={!answerResult?.correct && selectedIndex === index}
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

        {/* 오답일 때 */}
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
