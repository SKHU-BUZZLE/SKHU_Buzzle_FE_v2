import Portal from '@components/Portal';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import StatefulPlayground from '@layouts/StatefulPlayground';

export default function PortalDoc() {
  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
      <StatefulPlayground code={code} extraScope={{ Portal }} />
    </div>
  );
}

const description = `
# Portal

\`Portal\` 컴포넌트는 React 요소를 현재 DOM 트리 바깥의 지정된 노드(\`document.body\` 등)에 렌더링할 수 있도록 도와줍니다.  
주로 **모달, 드롭다운, 툴팁, 토스트**처럼 부모 레이아웃의 \`overflow\`/\`z-index\` 영향을 받지 않고  
독립적으로 떠야 하는 UI를 구현할 때 사용합니다.

- 기본적으로 \`document.body\`에 렌더링됩니다.
- \`container\` 속성을 지정하면 특정 DOM 노드에 렌더링할 수 있습니다.
- SSR 환경에서도 안전하게 동작하도록, 클라이언트 마운트 이후에만 포탈이 생성됩니다.
`;

const propsSpecs = [
  {
    propName: 'container',
    type: ['Element', 'DocumentFragment', 'null'],
    description: '포탈이 렌더링될 대상 DOM 노드. 지정하지 않으면 기본적으로 `document.body`가 사용됩니다.',
    required: false,
  },
  {
    propName: 'children',
    type: ['ReactNode'],
    description: '포탈로 렌더링할 React 요소입니다.',
    required: true,
  },
];

const code = `
function Demo() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        onClick={() => setOpen(true)}
      >
        Open Portal
      </button>

      {open && (
        <Portal>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold">Portal Demo</h3>
              <p className="mt-2 text-sm text-gray-600">
                이 콘텐츠는 document.body에 렌더링됩니다.
              </p>
              <button
                className="mt-4 rounded bg-gray-200 px-3 py-1 text-sm"
                onClick={() => setOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}

render(<Demo />);
`;
