import MarkdownViewer from '@layouts/MarkdownViewer';

const markdown = `
# BUZZLE Design System

### 디자인 시스템 구성

BUZZLE의 디자인 시스템은 두 가지 주요 섹션으로 나뉩니다.  
1. **Foundation** : 색상, 타이포그래피, 아이콘 등 기본 스타일 요소  
2. **Component** : UI 컴포넌트 모음 

각 섹션에 따라 사이드바의 항목이 달라지며, 검색 기능을 통해 원하는 문서를 빠르게 찾을 수 있습니다.

---

### 문서 추가 방법

새로운 디자인 문서는 아래 명령어로 자동 생성할 수 있습니다.  
명령어 실행 시 컴포넌트 파일, 문서 템플릿, 라우트, 사이드바 링크가 자동으로 등록됩니다.
\`\`\`bash
pnpm generate-doc
\`\`\`

---

### 디자인 문서 템플릿

1. **제목 및 컴포넌트 설명** (필수) : \`MarkdownViewer\`를 활용하여 컴포넌트의 이름과 간단한 설명을 작성합니다.  

2. **Props 스펙 표** (Props가 있다면 필수) : \`PropsSpecTable\`을 활용하여 컴포넌트의 Props 타입과 설명을 문서화합니다.  

3. **실제 컴포넌트 예시** (선택) : 컴포넌트를 직접 개발하며 UI를 확인할 수 있는 공간입니다.  

4. **Playground 미리보기** (선택) : \`StatelessPlayground\` 또는 \`StatefulPlayground\`를 이용해 실시간 편집 및 프리뷰를 제공합니다.
  


---

# Templates

## 1) MarkdownViewer

\`MarkdownViewer\`는 마크다운 뷰어로, \`react-markdown\` + \`remark-gfm\` + \`rehype-highlight\`으로 구현되었습니다.  

### 사용 예시

\`\`\`
import MarkdownViewer from '@/layouts/MarkdownViewer';

const doc = \`
# Hello, BUZZLE!

- **bold**
- *italic*
- ~~strike~~
\`;

export default function Page() {
  return <MarkdownViewer content={doc} />;
}
\`\`\`

---

## 2) PropsSpecTable 

\`PropsSpecTable\`은 컴포넌트의 개별 Props을 소개하는 템플릿입니다.

| 필드          | 타입        | 설명                                                |
|---------------|-------------|---------------------------------------------------|
| \`propName\`    | \`string\`    | Prop 이름 (표의 Key)                              |
| \`type\`        | \`string[]\`  | 타입 목록(유니온/리터럴 포함)                     |
| \`description\` | \`string?\`   | 설명 (없으면 \`-\`)                                 |
| \`required\`    | \`boolean?\`  | 필수 여부 (\`true\`면 이름 오른쪽에 \`*\` 표시)        |
| \`defaultValue\`| \`string?\`   | 기본값 (없으면 \`-\`)                               |
| \`options\`     | \`string[]?\` | 선택 가능한 값 목록 (없으면 \`-\`)                  |

### 사용 예시
\`\`\`tsx
import PropsSpecTable from '@/layouts/PropsSpecTable';

const specs = [
  {
    propName: 'disabled',
    type: ['boolean'],
  },
  {
    propName: 'variant',
    type: ['"primary"', '"secondary"'],
    description: '버튼 스타일',
    required: true,
    defaultValue: '"primary"',
    options: ['"primary"', '"secondary"'],
  },
];

export default function ButtonDoc() {
  return <PropsSpecTable specs={specs} />;
}
\`\`\`

---

## 3) Playground 

\`react-live\`로 구현된 **Playground**는 컴포넌트를 실시간으로 실행하고 편집할 수 있는 기능입니다.  
- **제어형 컴포넌트** -> \`StatefulPlayground\`
- **비제어형 컴포넌트** -> \`StatelessPlayground\`

### 3-1) StatefulPlayground

- \`noInline\` 모드이므로 \`render(<Component />)\` 형식의 코드 실행을 지원합니다.  
- Playground에서 여러 개의 컴포넌트 조합을 넣거나 \`useState\`, \`useEffect\`와 같은 훅을 사용할 수 있습니다. 
- 기본적으로 \`React\`, \`useState\`, \`useEffect\`가 scope에 포함되며, 필요하면 \`extraScope\`로 추가적인 스코프를 넘길 수 있습니다.

\`\`\`tsx
import StatefulPlayground from '@/layouts/StatefulPlayground';
import Button from '@/components/Button';

const code = \`
function Demo() {
  const [count, setCount] = useState(0);
   useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);
   return (
    <Button onClick={() => setCount(count + 1)}>
      Count: {count}
    </Button>
  );
}
 render(<Demo />);
\`;

export default function ButtonDoc() {
  return <StatefulPlayground code={code} extraScope={{ Button }} />;
}
\`\`\`

### 3-2) StatelessPlayground

- \`specs\`를 기반으로 자동 생성된 **control form**을 통해 props 값을 실시간으로 편집할 수 있습니다. 
  - _\`specs\`은 식별 유니온 타입이기 때문에 아래 예시처럼 별도의 상수로 사용하는 경우 \`satisfies ReadonlyArray<Spec>\`으로 리터럴 타입을 유지시켜야 합니다._
- \`extraScope\`를 통해 외부에서 정의한 **이벤트 핸들러나 유틸 함수**를 주입하여 테스트할 수 있습니다.  
- 간단한 props 조합 테스트나 시각적 확인에 적합하며, 상태 관리가 필요하다면 \`StatefulPlayground\`를 사용해야 합니다.

\`\`\`tsx
import StatelessPlayground, { type Spec } from '@/layouts/StatelessPlayground';
import Button from '@/components/Button';

const specs = [
  { type: 'select',  propName: 'variant', options: ['primary', 'secondary'], label: 'Variant' },
  { type: 'boolean', propName: 'disabled', label: 'Disabled' },
  { type: 'text',    propName: 'children', label: 'Label' },
  { type: 'handler', propName: 'onClick',  options: ['handleClick'], label: 'onClick' },
] satisfies ReadonlyArray<Spec>;

function handleClick() { alert('clicked'); }

export default function ButtonDoc() {
  return (
    <StatelessPlayground
      component={Button}
      initialProps={{ variant: 'primary', children: 'Click me' }}
      specs={specs}
      extraScope={{ handleClick }}
    />
  );
}
\`\`\`
`;

export default function Introduction() {
  return <MarkdownViewer content={markdown} />;
}
