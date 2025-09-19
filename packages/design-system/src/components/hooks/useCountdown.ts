import { useEffect, useRef, useState } from 'react';

/**
 * useCountdown
 * -----------------------------
 * 고정된 duration(초)을 기준으로 카운트다운을 수행하는 커스텀 훅입니다.
 * setInterval의 누적 지연(드리프트) 문제를 피하기 위해 requestAnimationFrame(rAF)과
 * "기준 시각(baseline) + 누적 일시정지 시간(accumulatedPause)" 보정 방식을 사용합니다.
 *
 * 설계 포인트
 * - rAF 기반: 화면 리프레시 타이밍에 맞춰 부드럽게 갱신되며, 백그라운드에서 자동 튜닝됩니다.
 * - pause/resume: 일시정지 시점과 누적 정지 시간을 보정하여 정확한 남은 시간을 유지합니다.
 * - ended: 시간이 0이 되었을 때 단 한 번 true로 전환되며, onEnd 콜백도 1회만 호출됩니다.
 * - ESLint(react-hooks/exhaustive-deps): 의도적으로 의존성 체크를 비활성화한 이펙트가 있습니다.
 *   (tick/cancel을 의존성에 넣으면 불필요한 재시작·재설정이 발생하므로, 실무적 선택입니다.)
 *
 * 사용 시 유의
 * - 모든 문제에서 duration이 동일(예: 10초)하고 문제 전환 시 타이머를 리셋해야 한다면
 *   부모에서 <YourTimer key={questionId} .../>처럼 key를 변경해 리마운트를 유도하세요.
 *
 * @param duration  총 카운트다운 시간(초). 음수여도 내부에서 0으로 보정됩니다.
 * @param options   부가 옵션
 * @param options.isPaused  true면 일시정지(프레임 루프 중단, 남은 시간 유지)
 * @param options.onEnd     남은 시간이 0이 되는 순간 단 한 번 호출되는 콜백
 *
 * @returns 상태 및 제어자
 * @property leftMs   남은 시간(ms)
 * @property leftSec  남은 시간(초, 올림: 1001ms → 2초)
 * @property ratio    진행률(0~1, 남은/총)
 * @property ended    종료 여부(시간이 0에 도달하면 true로 고정)
 * @property cancel   프레임 루프 강제 종료(클린업 용도)
 */
export function useCountdown(
  duration: number,
  options?: {
    isPaused?: boolean;
    onEnd?: () => void;
  },
) {
  /** 총 시간(ms) — 음수/소수 입력을 안전하게 보정 */
  const totalMs = Math.max(0, Math.round(duration * 1000));
  /** 옵션 분해 — 일시정지 여부와 종료 콜백 */
  const { isPaused = false, onEnd } = options ?? {};
  /** UI 바인딩용 남은 시간(ms) — 매 프레임 갱신 */
  const [leftMs, setLeftMs] = useState(totalMs);
  /** 외부로 노출할 종료 상태(state) — true가 되면 유지(1회성) */
  const [endedState, setEndedState] = useState(false);
  /** rAF id 보관 — 루프 중단/재개 제어 */
  const rafId = useRef<number | null>(null);
  /** 타이머 시작 기준 시각(ms, performance.now) — 최초 tick에서 설정 */
  const startedAt = useRef<number | null>(null);
  /** 일시정지에 들어간 시각 — resume 시 누적 정지 시간 계산에 사용 */
  const pausedAt = useRef<number | null>(null);
  /** 누적 정지 시간(ms) — 경과 시간에서 제외하여 정확도 유지 */
  const accumulatedPause = useRef(0);
  /** onEnd 중복 호출 방지용 플래그(Ref) — state와 별개로 즉시성 보장 */
  const endedRef = useRef(false);

  /**
   * rAF 루프 중단기 — 현재 예약된 프레임이 있으면 취소
   */
  const cancel = () => {
    if (rafId.current != null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  /**
   * 프레임 루프
   * - 기준 시각(startedAt)과 누적 정지 시간(accumulatedPause)을 이용해
   *   정확한 경과 시간(elapsed)을 계산하고, 남은 시간(left)을 도출합니다.
   * - 남은 시간이 16ms 이하일 때는 0으로 스냅하여(플리커 방지) UI 떨림을 제거합니다.
   * - 남은 시간이 0이 되면 onEnd를 1회 호출하고 루프를 종료합니다.
   */
  const tick = () => {
    const now = performance.now();
    // 최초 호출 시 기준 시각 설정
    if (startedAt.current == null) startedAt.current = now;
    // 경과 = 현재 - 시작 - (누적 일시정지)
    const elapsed = now - startedAt.current - accumulatedPause.current;
    // 남은 시간을 0~totalMs로 클램프하여 overshoot 방지
    const rawRemain = totalMs - elapsed; // 경과 반영 전 원시 남은 시간
    const clampedRemain = Math.min(totalMs, Math.max(0, rawRemain));
    // 16ms(한 프레임 내) 이하면 0으로 스냅해 미세 떨림 제거
    const nextLeft = clampedRemain <= 16 ? 0 : clampedRemain;
    setLeftMs(nextLeft);

    // 종료 처리: 콜백 1회 보장 + 루프 중단
    if (nextLeft === 0) {
      cancel();
      if (!endedRef.current) {
        endedRef.current = true; // 콜백 중복 방지
        setEndedState(true); // 외부에서 구독 가능한 종료 state
        onEnd?.(); // 종료 콜백(선택)
      }
      return;
    }

    // 다음 프레임 예약
    rafId.current = requestAnimationFrame(tick);
  };

  /**
   * 초기화 이펙트
   * - duration(totalMs)이 바뀔 때만 모든 내부 상태를 리셋합니다.
   * - isPaused에 의존하지 않는 이유:
   *   pause 토글 시 타이머를 '리셋'하면 안 되고 단순 정지/재개만 해야 하므로
   *   초기화와 일시정지를 별도 이펙트로 분리합니다.
   */
  useEffect(() => {
    // 혹시 돌고 있던 rAF가 있으면 중단
    cancel();

    // 기준/일시정지/누적/종료 플래그 모두 초기화
    startedAt.current = null;
    pausedAt.current = null;
    accumulatedPause.current = 0;
    endedRef.current = false;
    setEndedState(false);

    // 남은 시간도 초기값으로 세팅
    setLeftMs(totalMs);

    // 처음 상태가 일시정지가 아니라면 루프 시작
    if (!isPaused) {
      rafId.current = requestAnimationFrame(tick);
    }

    // 언마운트/리마운트 시 루프 정리
    return cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalMs]);

  /**
   * 일시정지/재개 이펙트
   * - pause: 현재 시각을 기록하고 rAF를 중단합니다.
   * - resume: (지금 - pausedAt)을 누적 정지 시간에 더해 보정 후 rAF 재개합니다.
   * - 이미 종료된 상태라면(endedRef) 동작하지 않습니다.
   */
  useEffect(() => {
    // 이미 종료되었다면 추가 동작 없음
    if (endedRef.current) return;

    if (isPaused) {
      // 시작 전에는 pausedAt 기록하지 않음(overshoot 방지)
      // startedAt.current가 null이면 아직 타이머가 '출발'하지 않은 상태
      if (startedAt.current !== null && pausedAt.current == null) {
        pausedAt.current = performance.now();
      }
      cancel(); // 프레임 루프 중단(남은 시간은 유지)
      return;
    }

    // 재개 — 누적 정지 시간 보정 후 플래그 해제
    if (pausedAt.current != null) {
      accumulatedPause.current += performance.now() - pausedAt.current;
      pausedAt.current = null;
    }

    // 루프가 멈춰있다면 재개
    if (rafId.current == null) {
      rafId.current = requestAnimationFrame(tick);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  return {
    /** 남은 시간(ms) — UI 텍스트·접근성 안내 등에 활용 */
    leftMs,
    /** 남은 시간(초, 올림) — 예: 1001ms → 2초 */
    leftSec: Math.ceil(leftMs / 1000),
    /** 진행률(0~1) — 남은/총. width 계산 등에 사용 0~1로 강제 */
    ratio: totalMs === 0 ? 0 : Math.min(1, Math.max(0, leftMs / totalMs)),
    /** 종료 여부 — 시간이 0에 도달하면 true로 고정 */
    ended: endedState,
    /** 프레임 루프 강제 종료 — 언마운트/에러 처리 등 클린업에 사용 */
    cancel,
  };
}
