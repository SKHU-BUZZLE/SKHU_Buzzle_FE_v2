/**
 * 특정 시각(isoString)을 "오늘(now) 기준으로 경과한 일수"로 변환합니다.
 *
 * - "당일 = 1일"로 계산합니다. (inclusive)
 * - 날짜 단위만 비교하기 위해 '로컬 달력 날짜'를 UTC epoch(자정) 값으로 정규화하여 DST/타임존에 따른 오프바이원 문제를 줄입니다.
 * - isoString이 없거나 잘못된 값이면 0을 반환합니다.
 * - isoString이 미래라도 최소 1을 반환합니다. (당일 포함 규칙)
 *
 * @param isoString ISO-8601 날짜/시간 문자열 (예: "2025-09-01T15:23:10.123456Z")
 * @param now 기준 시각. 기본값은 현재 시각(new Date())
 * @returns 경과 일수 (가입 당일은 1일)
 *
 * @example
 * // 오늘 가입 → 1일
 * toDaysSinceToday('2025-09-01T08:00:00Z', new Date('2025-09-01T12:00:00Z'))
 * // → 1
 *
 * @example
 * // 어제 가입 → 2일
 * toDaysSinceToday('2025-08-31T10:00:00Z', new Date('2025-09-01T09:00:00Z'))
 * // → 2
 *
 * @example
 * // 잘못된 입력 → 0
 * toDaysSinceToday('invalid')
 * // → 0
 */
export function toDaysSinceToday(isoString: string | null | undefined, now = new Date()): number {
  if (!isoString) return 0;
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return 0;

  // 날짜만 비교 (UTC 자정 기준 → 오프바이원 방지)
  const fromUTC = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  const toUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  const msPerDay = 86_400_000; // 24*60*60*1000
  const diff = Math.floor((toUTC - fromUTC) / msPerDay);

  // 가입 당일을 1일로 계산 (미래여도 최소 1)
  return Math.max(1, diff + 1);
}
