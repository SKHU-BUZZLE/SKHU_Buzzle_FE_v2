import Overlay from '@components/Overlay';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import StatefulPlayground from '@layouts/StatefulPlayground';

export default function OverlayDoc() {
  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
      <StatefulPlayground code={code} extraScope={{ Overlay }} />
    </div>
  );
}

const description = `
# Overlay

\`Overlay\`는 화면 전체를 덮는 **반투명 배경 레이어**입니다.  
주로 **Modal, Drawer, Popover** 같은 레이어드 UI에서 뒤 배경과의 인터랙션을 차단하고,  
사용자의 시각적 포커스를 컨텐츠에 집중시키는 역할을 합니다.  

- 기본 스타일: \`fixed inset-0 z-65 bg-black/50\`  
  → 전체 화면 덮기 + 높은 z-index + 검정 50% 투명도  
- 접근성: 정보성 역할이 없으므로 기본 \`aria-hidden="true"\`가 설정됩니다.  
- 필요 시 \`className\`, \`style\`, \`data-state\` 등을 통해 색상, 블러, 애니메이션을 자유롭게 커스터마이즈할 수 있습니다.  
- 클릭 이벤트를 받아 보통 \`onClick={onClose}\` 형태로 닫기 동작과 연결합니다.  

## 언제 쓰나요?
- 모달을 띄울 때 배경 클릭으로 닫히도록 하고 싶을 때  
- 드로어나 팝오버가 열렸을 때 **뒤 배경과의 상호작용을 막고 싶을 때**  
- 토스트/다이얼로그 등에서 **사용자의 시각적 주의 분리**가 필요할 때  

`;

const propsSpecs = [
  {
    propName: 'className',
    type: ['string'],
    description:
      '추가 스타일을 적용할 때 사용합니다. 기본값(`fixed inset-0 z-65 bg-black-900/50`)과 병합되며, Tailwind 중복/충돌은 twMerge 규칙으로 정리됩니다.',
    required: false,
  },
  {
    propName: 'ref',
    type: ['React.Ref<HTMLDivElement>'],
    description: '외부에서 Overlay의 DOM 노드를 직접 참조할 때 사용합니다.',
    required: false,
  },
  {
    propName: 'onClick',
    type: ['(event: React.MouseEvent<HTMLDivElement>) => void'],
    description:
      'Overlay 클릭 시 실행할 핸들러입니다. 일반적으로 `onClose`를 연결하여 배경 클릭으로 모달이 닫히도록 합니다.',
    required: false,
  },
  {
    propName: 'aria-hidden',
    type: ['boolean'],
    description:
      '접근성 속성입니다. 기본값은 `true`이며, 스크린 리더에서 Overlay는 읽히지 않습니다. 필요 시 props로 오버라이드할 수 있습니다.',
    required: false,
  },
];

const code = `
/**
 * Overlay 데모 (Stateful)
 * - "Open Overlay" 버튼을 누르면 전체 화면 오버레이가 뜹니다.
 * - 오버레이를 클릭하거나 Close 버튼을 누르면 닫힙니다.
 */

function Demo() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded bg-indigo-600 text-white"
      >
        Open Overlay
      </button>

      {open && (
        <>
          {/* 배경 오버레이 */}
          <Overlay
            onClick={() => setOpen(false)}
            data-state={open ? 'open' : 'closed'}
            className="transition-opacity duration-200 data-[state=open]:opacity-100 data-[state=closed]:opacity-0"
          />

          {/* 중앙 Close 버튼 (오버레이 위 레이어) */}
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-70 grid place-items-center"
            onClick={(e) => e.stopPropagation()} /* 내부 클릭 시 오버레이로 전파 방지 */
          >
            <button
              onClick={() => setOpen(false)}
              className="px-5 py-3 rounded-xl bg-white shadow-xl border text-gray-900"
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}

render(<Demo />);
`;
