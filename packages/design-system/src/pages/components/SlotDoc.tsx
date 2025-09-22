import { Slot, Slottable } from '@components/Slot';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import StatefulPlayground from '@layouts/StatefulPlayground';

export default function SlotDoc() {
  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
      <StatefulPlayground code={code} extraScope={{ Slot, Slottable }} />
    </div>
  );
}

const description = `
# Slot

\`Slot\`은 **asChild 패턴**을 구현하는 유틸리티입니다.  
부모에서 전달한 props를 별도의 래퍼 DOM 없이 **자식 ReactElement 그 자체**에 주입합니다.  
그 결과, 중첩된 버튼/링크 같은 **유효하지 않은 마크업**을 피하면서도, 이벤트/클래스/스타일/ARIA 등을 유연하게 제어할 수 있습니다.

## 언제 쓰나요?
- 이미 만들어진 \`<button>\`, \`<a>\`, \`<div role="button">\` 등에 **트리거/스타일/접근성 속성**을 "주입"하고 싶을 때
- \`PopoverTrigger\`, \`Modal.ActionButton\` 등 **트리거 컴포넌트**가 상황에 따라 다른 태그(버튼/링크)를 사용해야 할 때
- **중첩 인터랙티브 요소**(예: \`<button><a/></button>\`)를 만들지 않고, **한 개의 루트 요소만** 남기고 싶을 때

## 동작 원리 (요약)
- **타깃 선택**  
  - 기본: children 중 **첫 번째 유효한 ReactElement**를 자동 타깃으로 props를 병합합니다.  
  - 예외: 복잡한 트리에서 특정 요소만 타깃으로 삼고 싶다면 \`<Slottable>\`로 감싸 **명시적으로 타깃 지정**이 가능합니다.
- **이벤트 병합**  
  - 실행 순서: **child → slot** (자식의 의도를 우선)  
  - 자식에서 \`event.preventDefault()\`를 호출하면 **slot 핸들러는 생략**됩니다.
- **className / style / ref 병합**  
  - \`className\`: \`twJoin\` 후 \`twMerge\`로 Tailwind **중복/충돌 정리**  
  - \`style\`: \`slot → child\` 얕은 병합(최종적으로 **child 우선**)  
  - \`ref\`: 부모/자식 ref를 **mergeRefs**로 합쳐 **둘 다 보존**
- **렌더링**  
  - **래퍼 DOM을 만들지 않습니다.** 타깃 엘리먼트를 \`cloneElement\`로 치환하여, **원래 위치와 레이아웃을 그대로** 유지합니다.

## 주의/권장
- 기본 모드에서는 **유효 ReactElement 하나만** 두는 것을 권장합니다. 복잡한 레이아웃에서는 \`<Slottable>\`을 사용하세요.
- Fragment와 텍스트/숫자 등은 병합 타깃이 아닙니다. (타깃은 "요소"여야 합니다.)
- 접근성(ARIA/role)은 **타깃 엘리먼트의 시맨틱**을 따릅니다. 예: \`<a>\`를 타깃으로 쓰면 링크로 동작/낙하산됩니다.

---

## 예시 1) "button 안에 a 태그" 문제 해결

아래처럼 \`<button>\` 안에 \`<a>\`가 들어가면 **중첩 인터랙티브 요소**라서 잘못된 마크업입니다.

\`\`\`tsx
// ❌ 잘못된 예
<button className="btn">
  <a href="/docs">문서</a>
</button>
// 렌더 결과 그대로:
// <button class="btn">
//   <a href="/docs">문서</a>
// </button>
// → 중첩된 인터랙티브 요소로 접근성/시맨틱 오류
\`\`\`

**Slot**을 사용하면, **래퍼 없이** 트리거 속성을 \`<a>\` 자체에 주입하여 올바른 마크업을 만들 수 있습니다.

\`\`\`tsx
// ✅ 올바른 예 (자동 타깃: 첫 번째 유효 요소인 <a>에 props 병합)
<Slot onClick={() => console.log('slot click')} className="btn">
  <a href="/docs" onClick={(e) => console.log('child click')}>문서</a>
</Slot>

// 클릭 순서:
// 1) child click
// 2) slot click
// (child에서 e.preventDefault()를 호출하면 slot click은 생략)

// 렌더 결과(개념상):
// <a href="/docs" class="btn (...twMerge 결과)">
//   문서
// </a>
// → 래퍼 DOM 없음. <a>가 최종 루트로 남음.
\`\`\`

---

## 예시 2) Slottable로 명시적 타깃 지정

복잡한 트리에서는 \`<Slottable>\`로 타깃을 지정할 수 있습니다.

\`\`\`tsx
// ✅ Slottable 사용 예 (명시적 타깃)
<Slot className="btn" onClick={() => console.log('slot')}>
  <p className="text-muted">설명</p>
  <Slottable>
    <a href="/docs" onClick={(e) => e.preventDefault()}>문서</a>
  </Slottable>
</Slot>

// 클릭 시:
// 1) child(a) onClick 실행 → e.preventDefault() 호출
// 2) slot onClick은 생략

// 렌더 결과(개념상):
// <a href="/docs" class="btn (...twMerge 결과)">
//   문서
// </a>
// <p class="text-muted">설명</p>
// → Slottable 래퍼는 제거되고, a의 원래 children만 해당 위치에 남음(unwrap & hoist).
\`\`\`

---

## 예시 3) 모달에서 asChild 패턴 (중첩 버튼 방지)

\`\`\`tsx
// ❌ 안티 패턴: 중첩 버튼 발생
<Modal.ActionButton onClick={handleConfirm}>
  <button className="btn-primary">확인</button>
</Modal.ActionButton>
// 렌더 결과(개념상):
// <button class="btn-primary (ActionButton 기본 버튼도 존재)">
//   <button class="btn-primary">확인</button>
// </button>
// → 중첩 버튼 ⛔️

// ✅ 권장: asChild + Slot → 자식이 최종 태그 (중첩 없음)
<Modal.ActionButton asChild onClick={handleConfirm}>
  <button className="btn-primary">확인</button>
</Modal.ActionButton>

// ✅ 링크로도 가능 (자식 시맨틱/접근성 유지)
<Modal.ActionButton asChild onClick={handleConfirm}>
  <a href="/danger-zone" className="btn-primary">이동 후 확인</a>
</Modal.ActionButton>

// ✅ CloseButton도 동일 패턴
<Modal.CloseButton asChild onClick={onClose}>
  <button type="button" className="btn-ghost">아니요</button>
</Modal.CloseButton>

// 클릭 순서 & 동작 요약:
// - child → slot 순서로 이벤트 실행
// - child에서 e.preventDefault() 호출 시 slot 핸들러 생략
// - className은 twMerge로 충돌 정리, style은 child 우선, ref는 mergeRefs로 병합
\`\`\`
`;

const propsSpecs = [
  {
    propName: 'children',
    type: ['ReactNode'],
    description:
      'Slot이 감싸는 자식 노드입니다. 자동 모드에서는 첫 번째 유효한 ReactElement가 병합 타깃이 되며, Slottable로 감싸면 해당 요소가 타깃이 됩니다.',
    required: true,
  },
  {
    propName: 'ref',
    type: ['React.Ref<HTMLElement>'],
    description: '병합된 타깃 엘리먼트에 전달되는 ref입니다. React 19의 ref-as-prop 모델과 호환됩니다.',
    required: false,
  },
  {
    propName: 'className',
    type: ['string'],
    description:
      '추가할 CSS 클래스. 자식 엘리먼트의 className과 병합되며, Tailwind 유틸은 twMerge 규칙으로 정리됩니다.',
    required: false,
  },
  {
    propName: 'style',
    type: ['React.CSSProperties'],
    description: '추가할 인라인 스타일. 자식 엘리먼트의 style과 병합되며, 자식 스타일이 최종적으로 우선합니다.',
    required: false,
  },
  {
    propName: 'onClick',
    type: ['(event: React.MouseEvent) => void'],
    description: '클릭 이벤트 핸들러. 자식과 Slot 둘 다 핸들러가 있으면 child → slot 순서로 실행됩니다.',
    required: false,
  },
];

const code = `
/**
 * Slot Showcase
 * - 예시 A: 기본 Slot (자동 타깃, child → slot 순서)
 * - 예시 B: Slottable 사용 (명시적 타깃 지정, child에서 preventDefault()시 slot 생략)
 * - 예시 C: asChild 패턴 (중첩 버튼 방지, 자식이 최종 태그)
 *
 * 사용:
 * <StatefulPlayground code={code} extraScope={{ Slot, Slottable }} />
 */

function LogPanel({ logs, onClear }) {
  return (
    <div style={{border:'1px solid #ddd', borderRadius:8, padding:12, fontFamily:'monospace'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <strong>Log</strong>
        <button onClick={onClear} style={{padding:'4px 8px'}}>Clear</button>
      </div>
      <div style={{marginTop:8, maxHeight:160, overflow:'auto', whiteSpace:'pre-wrap'}}>
        {logs.length === 0 ? <span style={{opacity:0.6}}>(empty)</span> : logs.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section style={{display:'grid', gap:12}}>
      <h3 style={{fontWeight:700, fontSize:16}}>{title}</h3>
      {children}
      <hr style={{marginTop:12, border:'none', borderTop:'1px solid #eee'}} />
    </section>
  );
}

/** asChild 패턴 데모용 컴포넌트
 * - asChild=true면 Slot으로 자식을 감싸 props를 "주입" (래퍼 DOM 없음)
 * - asChild=false면 기본 <button>
 */
function ActionButtonLike({ asChild, className, onClick, children }) {
  const injected = { className: "px-3 py-2 rounded bg-indigo-600 text-white " + (className || ""), onClick };
  if (asChild) {
    return <Slot {...injected}>{children}</Slot>;
  }
  return <button {...injected}>{children}</button>;
}

function CodeBlock({ code, note }) {
  return (
    <details style={{marginTop:8}}>
      <summary style={{cursor:'pointer'}}>코드 보기</summary>
      {note && <div style={{margin:'8px 0', fontSize:12, color:'#555'}}>{note}</div>}
      <pre style={{background:'#0b1020', color:'#d6e7ff', padding:12, borderRadius:8, overflow:'auto'}}>
        <code>{code}</code>
      </pre>
    </details>
  );
}

function Demo() {
  const [logs, setLogs] = React.useState([]);
  const push = (m) => setLogs((prev) => [...prev, m]);
  const clear = () => setLogs([]);

  const aCode = \`
/** 예시 A: 기본 Slot (자동 타깃)
 * - 첫 번째 유효 ReactElement(<button>)이 타깃
 * - 클릭 순서: child → slot
 */
<Slot onClick={() => console.log('slot')}>
  <button onClick={() => console.log('child')}>버튼</button>
</Slot>\`;

  const bCode = \`
/** 예시 B: Slottable 사용 (명시적 타깃)
 * - <Slottable> 내부의 직계 자식이 타깃
 * - 자식에서 e.preventDefault() 호출 시 slot 핸들러 생략
 */
<Slot onClick={() => console.log('slot')}>
  <Slottable>
    <a href="/docs" onClick={(e) => { console.log('child'); e.preventDefault(); }}>
      문서
    </a>
  </Slottable>
</Slot>\`;

  const cCode = \`
/** 예시 C: asChild 패턴 (중첩 버튼 방지)
 * - asChild=true면 자식이 최종 태그
 * - 자식 <button>|<a>|<label> 등 시맨틱을 그대로 보존
 */
<ActionButtonLike asChild onClick={() => console.log('slot')}>
  <button onClick={() => console.log('child')}>확인(버튼)</button>
</ActionButtonLike>

// 링크도 가능
<ActionButtonLike asChild onClick={() => console.log('slot')}>
  <a href="/go" onClick={(e) => { console.log('child'); e.preventDefault(); }}>
    이동(링크)
  </a>
</ActionButtonLike>\`;

  return (
    <div style={{display:'grid', gap:24}}>
      <p>
        각 버튼을 클릭하면 <strong>Log</strong>에 실행 순서가 출력됩니다.  
        기본 규칙: <code>child → slot</code>, 그리고 child에서 <code>preventDefault()</code>를 호출하면 slot 핸들러는 생략됩니다.
      </p>

      <LogPanel logs={logs} onClear={clear} />

      {/* 예시 A */}
      <Section title="예시 A — 기본 Slot (자동 타깃, child → slot)">
        {/* 🔘 렌더된 버튼 */}
        <Slot onClick={() => push('[slot] A click')}>
          <button onClick={() => push('[child] A click')}>A: 자동 타깃 버튼</button>
        </Slot>

        {/* 📜 코드 + 설명 */}
        <div style={{fontSize:13, color:'#444'}}>
          <p>첫 번째 유효 ReactElement(<code>&lt;button&gt;</code>)가 자동 타깃이 됩니다. 클릭하면 <code>[child] → [slot]</code> 순서로 로그가 찍혀야 정상입니다.</p>
        </div>
        <CodeBlock code={aCode} />
      </Section>

      {/* 예시 B */}
      <Section title="예시 B — Slottable로 명시적 타깃 지정 (preventDefault로 slot 생략)">
        {/* 🔘 렌더된 버튼 */}
        <Slot onClick={() => push('[slot] B click')}>
          <Slottable>
            <a
              href="/docs"
              onClick={(e) => { push('[child] B click'); e.preventDefault(); }}
            >
              B: 링크(자식에서 preventDefault)
            </a>
          </Slottable>
        </Slot>

        {/* 📜 코드 + 설명 */}
        <div style={{fontSize:13, color:'#444'}}>
          <p>
            <code>&lt;Slottable&gt;</code> 내부의 <code>&lt;a&gt;</code>가 병합 타깃입니다. 자식이 <code>preventDefault()</code>를 호출했으므로
            클릭 시 Log에는 <code>[child]</code>만 찍히고, <code>[slot]</code>은 생략되어야 합니다.
          </p>
        </div>
        <CodeBlock code={bCode} />
      </Section>

      {/* 예시 C */}
      <Section title="예시 C — asChild 패턴 (중첩 버튼 방지, 자식이 최종 태그)">
        {/* 🔘 렌더된 버튼 1: 자식이 button */}
        <ActionButtonLike asChild onClick={() => push('[slot] C click (button)')}>
          <button onClick={() => push('[child] C click (button)')}>C1: asChild + button</button>
        </ActionButtonLike>

        {/* 🔘 렌더된 버튼 2: 자식이 a (preventDefault로 slot 생략 확인) */}
        <ActionButtonLike asChild onClick={() => push('[slot] C click (link)')}>
          <a href="/go" onClick={(e) => { push('[child] C click (link)'); e.preventDefault(); }}>C2: asChild + link</a>
        </ActionButtonLike>

        {/* 📜 코드 + 설명 */}
        <div style={{fontSize:13, color:'#444'}}>
          <p>
            <code>ActionButtonLike</code>는 asChild=true면 <code>Slot</code>을 사용해 자식에 props를 주입합니다(래퍼 DOM 없음).
            따라서 <code>&lt;button&gt;</code>을 자식으로 넣어도 중첩 버튼이 생기지 않고, <code>&lt;a&gt;</code>도 링크 시맨틱을 그대로 보존합니다.
            링크 예시에서는 자식이 <code>preventDefault()</code>를 호출하므로 slot 핸들러는 생략되어 <code>[child]</code>만 로그에 찍혀야 합니다.
          </p>
        </div>
        <CodeBlock code={cCode} />
      </Section>
    </div>
  );
}

render(<Demo />);
`;
