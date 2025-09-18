import Modal from '@components/Modal';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import StatefulPlayground from '@layouts/StatefulPlayground';

export default function ModalDoc() {
  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}
      {/* <Modal /> */}

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
      <StatefulPlayground code={code} extraScope={{ Modal }} />
    </div>
  );
}

const description = `
# Modal

\`Modal\`은 **합성 컴포넌트 패턴**으로 구성된 모달 UI입니다.  
\`Modal.Root\`를 루트로 두고 내부에 \`Content\`/ \`Title\`/ \`Description\`/ \`Footer\`/ \`CloseButton\`/ \`ActionButton\`을 조합해 사용합니다.

## 구조
- **Root**: 모달의 전역 상태(\`open\`)와 닫힘/확인 동작(\`onClose\`, \`onConfirm\`)을 관리합니다. ESC/외부 클릭/스크롤락 등 **행동 제어 훅**은 Root가 담당합니다.
- **Content**: \`Portal\` + \`Overlay\` + 모달 컨테이너를 렌더링합니다. 접근성 속성(\`role="dialog"\`, \`aria-labelledby\`, \`aria-describedby\`)을 자동 연결합니다.
- **Title/Description**: Root에서 자동 생성된 \`titleId / descriptionId\`에 연결되어 스크린리더가 올바르게 읽습니다.
- **Footer**: 버튼 영역 컨테이너입니다. 자식 수에 따라 \`w-full\`(1개) / \`w-1/2\`(2개)로 자동 분배되도록 설계할 수 있습니다(현재 구현 기준).
- **CloseButton**: **닫기 전용** 버튼입니다. 클릭 시 \`onClose()\`만 실행합니다.
- **ActionButton**: **확인/삭제 등 주요 액션** 버튼입니다. \`onClick → onConfirm\` 순서로 실행되며, \`asChild\`로 \`<a>\` 같은 요소를 래퍼 없이 사용할 수 있습니다.

## 접근성(A11y)
- \`Content\`는 \`role="dialog"\`와 \`aria-modal="true"\`를 가집니다.
- \`Title\`/ \`Description\`은 각각 \`aria-labelledby\`/ \`aria-describedby\`에 연결됩니다.
- 포커스 트랩/초점 이동은 필요 시 후속 훅으로 확장할 수 있습니다(현재는 미포함).

## 동작(기본 정책)
- **ESC로 닫기**: \`useEscToClose\` (Root에서 관리)
- **외부 클릭으로 닫기**: \`useClickOutside\` (Root에서 관리)
- **바디 스크롤 잠금**: \`useLockBodyScroll\` (Root에서 관리)
- **포탈 렌더링**: \`Portal\`로 \`document.body\`에 렌더
- **오버레이**: 독립 컴포넌트 \`Overlay\`를 \`Content\`에서 함께 렌더

## 예시
\`\`\`tsx
<Modal.Root open={isOpen} onClose={() => setIsOpen(false)} onConfirm={handleDelete}>
  <Modal.Content className="max-w-md">
    <Modal.Title>정말 삭제할까요?</Modal.Title>
    <Modal.Description>삭제 후에는 되돌릴 수 없습니다.</Modal.Description>

    <Modal.Footer>
      <Modal.CloseButton>취소</Modal.CloseButton>
      <Modal.ActionButton>삭제</Modal.ActionButton>
    </Modal.Footer>
  </Modal.Content>
</Modal.Root>
\`\`\`

## 팁
- \`ActionButton asChild\`로 \`<a>\`를 루트로 쓸 수 있어 **중첩 버튼/링크 문제**를 피할 수 있습니다.
`;

const propsSpecs = [
  // Root
  {
    propName: 'Root.children',
    type: ['ReactNode'],
    description: '모달 내부에 렌더링될 합성 컴포넌트들(Content/Title/Description/Footer 등).',
    required: true,
  },
  {
    propName: 'Root.open',
    type: ['boolean'],
    description: '모달의 열림/닫힘 상태.',
    required: true,
  },
  {
    propName: 'Root.onClose',
    type: ['() => void'],
    description: '모달을 닫을 때 호출되는 콜백. ESC/외부 클릭/닫기 버튼에서 공통 사용.',
    required: true,
  },
  {
    propName: 'Root.onConfirm',
    type: ['() => void'],
    description: '확인/삭제 등 주요 액션에서 호출되는 선택 콜백(Modal.ActionButton과 연동).',
    required: false,
  },

  // Content
  {
    propName: 'Content.children',
    type: ['ReactNode'],
    description: '모달 본문 요소(Title/Description/Section/Footer 등).',
    required: true,
  },
  {
    propName: 'Content.className',
    type: ['string'],
    description: '모달 컨테이너에 추가할 클래스. 크기/여백/그림자 등을 확장.',
    required: false,
  },

  // Title
  {
    propName: 'Title.children',
    type: ['ReactNode'],
    description: '모달 제목 텍스트/요소. \n스크린리더는 aria-labelledby로 이 영역을 제목으로 읽습니다.',
    required: true,
  },
  {
    propName: 'Title.className',
    type: ['string'],
    description: '제목 스타일 확장.',
    required: false,
  },

  // Description
  {
    propName: 'Description.children',
    type: ['ReactNode'],
    description: '모달 보조 설명 텍스트/요소. \n스크린리더는 aria-describedby로 이 영역을 본문으로 읽습니다.',
    required: true,
  },
  {
    propName: 'Description.className',
    type: ['string'],
    description: '설명 스타일 확장.',
    required: false,
  },

  // Footer
  {
    propName: 'Footer.children',
    type: ['ReactNode'],
    description:
      '버튼 영역 컨텐츠(보통 CloseButton/ActionButton). \n현재 구현은 자식 수에 따라 폭 분배(1개=꽉 채움, 2개=반반).',
    required: true,
  },
  {
    propName: 'Footer.className',
    type: ['string'],
    description: '버튼 컨테이너의 정렬/간격 등 레이아웃 확장.',
    required: false,
  },

  // CloseButton
  {
    propName: 'CloseButton.children',
    type: ['ReactNode'],
    description: '닫기 버튼의 콘텐츠(텍스트/아이콘). 클릭 시 항상 onClose() 실행.',
    required: true,
  },
  {
    propName: 'CloseButton.className',
    type: ['string'],
    description: '닫기 버튼 스타일 확장.',
    required: false,
  },
  {
    propName: 'CloseButton.disabled',
    type: ['boolean'],
    description: '닫기 버튼 비활성화.',
    required: false,
  },

  // ActionButton
  {
    propName: 'ActionButton.children',
    type: ['ReactNode'],
    description: '주요 액션 버튼의 콘텐츠(텍스트/아이콘).',
    required: true,
  },
  {
    propName: 'ActionButton.className',
    type: ['string'],
    description: '액션 버튼 스타일 확장.',
    required: false,
  },
  {
    propName: 'ActionButton.onClick',
    type: ['(e) => void'],
    description: '추가 클릭 핸들러. 실행 순서: onClick → (e.preventDefault()가 아니면) onConfirm().',
    required: false,
  },
  {
    propName: 'ActionButton.disabled',
    type: ['boolean'],
    description: '액션 버튼 비활성화.',
    required: false,
  },
  {
    propName: 'ActionButton.asChild',
    type: ['boolean'],
    description: 'Slot(asChild) 패턴 활성화. true면 자식 요소(<a> 등)를 래퍼 없이 루트로 사용하여 props 주입.',
    required: false,
    defaultValue: 'false',
    options: ['true', 'false'],
  },
];

const code = `
function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="px-16 py-8 bg-blue-500 text-white rounded-md"
      >
        모달 열기
      </button>

      <Modal.Root open={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Content>
          <Modal.Title>정말 삭제하시겠어요?</Modal.Title>
          <Modal.Description>
            삭제된 데이터는 복구할 수 없습니다.
          </Modal.Description>
          <Modal.Footer>
            <Modal.CloseButton>취소</Modal.CloseButton>
            <Modal.ActionButton>삭제</Modal.ActionButton>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}

render(<ModalDemo />);
`;
