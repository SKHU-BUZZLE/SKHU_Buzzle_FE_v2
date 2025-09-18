import { isValidElement, type JSXElementConstructor } from 'react';

export default function isValidButton(node: React.ReactNode) {
  if (!isValidElement(node)) return false;

  // html <button> 허용
  if (typeof node.type === 'string') {
    return node.type === 'button';
  }

  // 공통 컴포넌트 Button 허용
  const type = node.type as JSXElementConstructor<unknown> & { displayName?: string };
  const name = type.displayName ?? type.name;

  return typeof name === 'string' && name.includes('Button');
}
