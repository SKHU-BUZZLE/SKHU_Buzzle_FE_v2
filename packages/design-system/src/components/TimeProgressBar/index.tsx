import { useCountdown } from '@components/hooks/useCountdown';
import { useEffect } from 'react';

export interface TimeProgressBarProps {
  /** 총 시간(초) */
  duration: number;
  /** true면 일시정지 (프레임 루프 중단, 남은 시간 유지) */
  isPaused?: boolean;
  /** 시간이 다 됐을 때 단 한 번 호출 (내부 onEnd) */
  onTimerEnd?: () => void;
  /**
   * 타이머 상태 변경 시 호출 (예: ended=true)
   * - 사용처에서 문제 종료 판정 등 비즈니스 로직을 이 신호로 처리할 수 있습니다.
   */
  onStateChange?: (state: { ended: boolean }) => void;
}

/**
 * TimeProgressBar
 * ------------------------------------------------------------------------
 * rAF 기반 카운트다운 훅(useCountdown)을 사용하여
 * 막대(progress bar) 형태로 **남은 시간 비율**만 시각화하는 컴포넌트입니다.
 *
 * - 초 텍스트는 렌더하지 않고, 진행바만 표시합니다.
 * - 동적 width는 Tailwind 클래스가 아닌 **inline style**로 적용합니다.
 * - 만료 시(onTimerEnd)와, 외부 사용을 위한 상태 통지(onStateChange: { ended })를 제공합니다.
 *
 * ⚠️ duration이 모든 문제에서 동일(예: 10초 고정)이고
 *    문제 전환 시 타이머를 반드시 초기화해야 한다면,
 *    **부모 컴포넌트에서 key={questionId}**를 변경하여 리마운트를 유도하세요.
 *
 * @example
 * <TimeProgressBar
 *   key={question.id}           // 문제 변경 시 초기화 강제
 *   duration={10}               // 고정 10초
 *   isPaused={paused}           // 보기 선택 시 true로 정지
 *   onTimerEnd={() => console.log('⏰ 타이머 종료')}
 *   onStateChange={({ ended }) => ended && goNext()}
 * />
 */
export default function TimeProgressBar({
  duration,
  isPaused = false,
  onTimerEnd,
  onStateChange,
}: TimeProgressBarProps) {
  // useCountdown 훅에서 비율(ratio)과 종료 여부(ended)만 가져옵니다.
  // - ratio: 0~1 (남은/총), width 계산에 사용
  // - ended: 시간이 0이 되면 true로 고정
  const { ratio, ended } = useCountdown(duration, {
    isPaused,
    onEnd: onTimerEnd, // 내부 만료 콜백: alert/토스트/다음 단계 등
  });

  // ended 변화가 있을 때 외부에 상태 통지
  useEffect(() => {
    onStateChange?.({ ended });
  }, [ended, onStateChange]);

  return (
    <div className='dark:bg-dm-black-600 bg-white-200 h-10 w-full rounded-full'>
      <div className='bg-black-300 dark:bg-white-300 h-full rounded-full' style={{ width: `${ratio * 100}%` }} />
    </div>
  );
}
