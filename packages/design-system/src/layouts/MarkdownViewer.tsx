import 'highlight.js/styles/github-dark-dimmed.css';

import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <div className='prose text-black-300 mb-24 max-w-none min-w-0'>
      <Markdown rehypePlugins={[[rehypeHighlight, { detect: true, ignoreMissing: true }]]} remarkPlugins={[remarkGfm]}>
        {content}
      </Markdown>
    </div>
  );
}
