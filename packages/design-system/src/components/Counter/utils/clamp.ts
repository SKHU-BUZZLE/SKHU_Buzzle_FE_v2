/**
 * === Util ===
 */
export default function clamp(n: number, min?: number | null, max?: number | null) {
  if (min != null && n < min) return min;
  if (max != null && n > max) return max;
  return n;
}
