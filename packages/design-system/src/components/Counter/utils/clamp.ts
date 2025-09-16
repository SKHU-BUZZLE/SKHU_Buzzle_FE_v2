/**
 * @function clamp
 * 지정한 범위(min ~ max) 안에서 숫자를 제한합니다.
 *
 * @param {number} n - 제한을 적용할 숫자
 * @param {number | null} [min=null] - 허용되는 최소값 (null 또는 undefined일 경우 최소 제한 없음)
 * @param {number | null} [max=null] - 허용되는 최대값 (null 또는 undefined일 경우 최대 제한 없음)
 * @returns {number} 주어진 범위 내로 제한된 숫자
 *
 * @example
 * clamp(5, 1, 10); // 5
 * clamp(-3, 0, 10); // 0
 * clamp(15, 0, 10); // 10
 * clamp(7); // 7 (min/max 없으면 그대로 반환)
 */
export default function clamp(n: number, min?: number | null, max?: number | null) {
  if (min != null && n < min) return min;
  if (max != null && n > max) return max;
  return n;
}
