import 'highlight.js/styles/github-dark-dimmed.css';

import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

/**
 * MarkdownViewer
 *
 * `react-markdown` + `remark-gfm` + `rehype-highlight` 기반의 마크다운 렌더링 컴포넌트입니다.
 * - GitHub Flavored Markdown(GFM) 확장 지원: 표, 체크리스트, 취소선, 각주 등
 * - 코드 블록 자동 하이라이트 지원 (highlight.js)
 *
 * @param props.content - 렌더링할 마크다운 문자열
 *
 * @example
 * ```tsx
 * import MarkdownViewer from '@/layouts/MarkdownViewer';
 *
 * const markdown = `
 * # Hello BUZZLE
 *
 * - **bold**
 * - *italic*
 * - ~~strikethrough~~
 *
 * \`\`\`tsx
 * export default function Hello() {
 *   return <div>Hello Markdown!</div>;
 * }
 * \`\`\`
 * `;
 *
 * export default function Page() {
 *   return <MarkdownViewer content={markdown} />;
 * }
 * ```
 */
export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <div className='prose text-black-300 max-w-none min-w-0'>
      <Markdown rehypePlugins={[[rehypeHighlight, { detect: true, ignoreMissing: true }]]} remarkPlugins={[remarkGfm]}>
        {content.trim()}
      </Markdown>
    </div>
  );
}
