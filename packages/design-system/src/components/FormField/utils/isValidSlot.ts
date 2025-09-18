import isValidButton from '@components/utils/isValidButton';
import isValidIcon from '@components/utils/isValidIcon';

/**
 * @function isValidSlot
 * - 주어진 ReactNode가 슬롯으로 허용 가능한지 검증합니다.
 * - `isValidIcon(node)` 또는 `isValidButton(node)` 중 하나라도 true이면 true를 반환합니다.
 *
 * @param {React.ReactNode} node 검사할 React 노드
 * @returns {boolean} 유효한 아이콘 또는 버튼이면 true, 그렇지 않으면 false
 *
 * @example
 * ```tsx
 * isValidSlot(<SearchIcon />); // true
 * isValidSlot(<button>클릭</button>); // true
 * isValidSlot("text"); // false
 * isValidSlot(<div />); // false
 * ```
 */
export default function isValidSlot(node: React.ReactNode) {
  if (isValidIcon(node) || isValidButton(node)) return true;
  return false;
}
