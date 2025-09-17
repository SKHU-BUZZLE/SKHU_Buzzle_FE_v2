import Button from '@components/Button';
import Input from '@components/Input';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import { useRef, useState } from 'react';

export default function InputDoc() {
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocusClick = () => {
    inputRef.current?.focus();
  };

  const handleLogValueClick = () => {
    console.log('현재 값:', inputRef.current?.value);
  };

  const handleResetClick = () => {
    const el = inputRef.current;
    if (!el) return;
    el.value = '';
  };

  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}
      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
      <MarkdownViewer
        content={`
      --- 
### Uncontrolled FormField`}
      />
      <Input
        ref={inputRef}
        className='ds-theme-bg-muted w-300'
        defaultValue='입력!'
        maxLength={10}
        minLength={2}
        placeholder='입력하세요'
      />
      <div className='flex gap-24'>
        <Button size='sm' variant='secondary' onClick={handleFocusClick}>
          ref 인풋에 포커스 주기
        </Button>
        <Button size='sm' onClick={handleLogValueClick}>
          ref 인풋 값 콘솔에 찍기
        </Button>
        <Button size='sm' variant='danger' onClick={handleResetClick}>
          ref 인풋 값 초기화
        </Button>
      </div>
      <MarkdownViewer content={exampleCode1} />

      <MarkdownViewer
        content={`
---
### Controlled FormField`}
      />
      <Input className='ds-theme-bg-muted' value={value} onChange={(e) => setValue(e.target.value)} />
      <p>현재 값: {value}</p>

      <MarkdownViewer content={exampleCode2} />
    </div>
  );
}

const description = `
# Input

기본 **Input** 컴포넌트입니다.

- \`text / password / email / search / tel / url\` 타입만 지원합니다.  
- Controlled(\`value\` + \`onChange\`)와 Uncontrolled(\`defaultValue\`) 방식을 모두 사용할 수 있습니다.  
- 네이티브 \`<input>\` 속성을 확장했기 때문에 \`ref\`를 포함한, \`id\`, \`placeholder\`, \`autoComplete\`, \`required\` 등도 그대로 전달 가능합니다.  
- \`disabled\` 상태에서는 입력할 수 없으며, 시각적으로 비활성화 스타일이 적용됩니다.  
- 기본 스타일은 TailwindCSS 기반으로 적용되어 있으며, \`className\`을 통해 확장할 수 있습니다.  
- 단독 사용보다는 \`FormField\`와 함께 사용하여 \`label\`, \`errorMessage\`, \`아이콘/버튼 슬롯\`을 조합하는 것을 권장합니다. 
`;

const propsSpecs = [
  {
    propName: 'type',
    type: ['string'],
    options: ['text', 'password', 'email', 'search', 'tel', 'url'],
    defaultValue: 'text',
    description: '입력 필드의 타입을 지정합니다.',
  },
  {
    propName: 'value',
    type: ['string'],
    description: 'Controlled 값. 컴포넌트 외부 상태와 연결할 때 사용합니다.',
  },
  {
    propName: 'defaultValue',
    type: ['string'],
    description: 'Uncontrolled 초기값. Controlled 모드에서는 사용하지 않습니다.',
  },
  {
    propName: 'minLength',
    type: ['number'],
    description: '입력 가능한 최소 글자 수입니다.',
  },
  {
    propName: 'maxLength',
    type: ['number'],
    description: '입력 가능한 최대 글자 수입니다.',
  },
  {
    propName: 'onChange',
    type: ['handler'],
    description: '값이 변경될 때 호출되는 이벤트 핸들러입니다. (e: ChangeEvent<HTMLInputElement>)',
  },
  {
    propName: 'onBlur',
    type: ['handler'],
    description: 'Input이 blur될 때 호출되는 이벤트 핸들러입니다.',
  },
  {
    propName: 'onFocus',
    type: ['handler'],
    description: 'Input이 focus될 때 호출되는 이벤트 핸들러입니다.',
  },
  {
    propName: 'className',
    type: ['string'],
    description: '외부 스타일을 확장할 수 있는 TailwindCSS 클래스입니다.',
  },
];

const exampleCode1 = `
\`\`\`
      <Input
        ref={inputRef}
        className='ds-theme-bg-muted w-300'
        defaultValue='입력!'
        maxLength={10}
        minLength={2}
        placeholder='입력하세요'
      />
\`\`\`
`;

const exampleCode2 = `
\`\`\`
<Input className='ds-theme-bg-muted' value={value} onChange={(e) => setValue(e.target.value)} />
\`\`\`
`;
