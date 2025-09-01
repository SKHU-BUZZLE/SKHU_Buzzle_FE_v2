import 'highlight.js/styles/github-dark-dimmed.css';

import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import { Test1, Test2, Test3 } from '@/components';

export default function TestPage() {
  const markdown = `
# React Markdown 테스트

## 텍스트 스타일
- **굵게**
- *이탤릭*
- ~~취소선~~

## 리스트
1. 첫 번째 아이템
2. 두 번째 아이템
3. 세 번째 아이템

- 불릿 1
- 불릿 2
- 불릿 3

## 링크 & 이미지
[구글](https://google.com)


## 인라인 코드
\`const x = 10;\`

## 코드 블록
\`\`\`js
function greet(name) {
  console.log(\`Hello, ${name}!\`);
}
greet("Pluto");
`;

  return (
    <>
      <h1>Test Page</h1>
      <Test1 />
      <Test2 />
      <Test3 />

      <div className='prose mb-24 max-w-none min-w-0 text-gray-600'>
        <Markdown
          rehypePlugins={[[rehypeHighlight, { detect: true, ignoreMissing: true }]]}
          remarkPlugins={[remarkGfm]}
        >
          {markdown}
        </Markdown>
      </div>
    </>
  );
}
