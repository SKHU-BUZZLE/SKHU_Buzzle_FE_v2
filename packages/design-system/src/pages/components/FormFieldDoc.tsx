import Button from '@components/Button';
import FormField from '@components/FormField';
import { KeyboardIcon, MoonIcon } from '@components/icons';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import { useRef, useState } from 'react';

export default function FormFieldDoc() {
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
### Uncontrolled FormField
서비스에서 사용할 참여코드 FormField와 동일합니다. `}
      />
      <FormField
        ref={inputRef}
        errorMessage='올바른 참여 코드를 입력해주세요'
        inputClassName='ds-typ-title-1 text-primary-500'
        inputWrapperClassName='py-20 px-24 ds-theme-bg-muted rounded-2xl gap-12'
        label='참여 코드'
        labelClassName='ds-typ-body-3'
        minLength={0}
        name='code'
        placeholder='ABCD12'
        rightSlot={<KeyboardIcon className='text-white-600 dark:text-white-900 size-24' />}
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
      <FormField
        errorMessage='error'
        label='label'
        leftSlot={<MoonIcon />}
        minLength={2}
        name='inputName'
        placeholder='text'
        rightSlot={<KeyboardIcon className='text-white-600 dark:text-white-900 size-16' />}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>현재 값: {value}</p>

      <MarkdownViewer content={exampleCode2} />
    </div>
  );
}

const description = `
# FormField

기본 Input 컴포넌트에 label, errorMessage 등으로 확장한 **FormField** 컴포넌트입니다.  
페이지에서 각 도메인과 연결하여 사용할 수 있습니다.  

- \`label\`, \`input\`, \`errorMessage\`를 하나의 패턴으로 묶어 일관된 폼 필드를 제공합니다.  
- 내부에는 공용 **Input** 컴포넌트를 사용하며, 기본적으로 controlled(\`value\` + \`onChange\`)와 uncontrolled(\`defaultValue\`) 방식을 모두 지원합니다.  
- \`leftSlot\`, \`rightSlot\`을 통해 입력창의 좌우에 아이콘이나 버튼을 배치할 수 있습니다. (검색 아이콘, 비밀번호 토글 버튼 등)  
  - 각 slot에는 \`icon\`과 \`html의 button\`, 공통 컴포넌트의 \`Button\`만 허용합니다.
- \`inputWrapperClassName\`에서 \`focus-within\`을 활용해야 내부 Input에 포커스 상태를 반영하는 스타일링이 가능합니다.  
- 접근성을 위해 \`label\`이 주어지면 자동으로 \`htmlFor\`와 \`id\`를 연결합니다.    
- \`errorMessage\`가 존재하면 Input 하단에 에러 텍스트를 출력합니다.  
- 스타일 확장은 \`fieldClassName\`, \`labelClassName\`, \`errorClassName\`, \`inputClassName\`, \`inputWrapperClassName\`을 통해 가능합니다.
  - \`fieldClassName\` : FormField 컴포넌트의 전체 레이아웃 스타일링
  - \`labelClassName\` : label 스타일링
  - \`errorClassName\` : errorMessage 스타일링
  - \`inputClassName\` : 내부 input 스타일링 (\`<Input>\` 컴포넌트)
  - \`inputWrapperClassName\` : Slot과 Input을 포함한 Wrapper 스타일링

`;

const propsSpecs = [
  {
    propName: 'type',
    type: ['string'],
    options: ['text', 'password', 'email', 'search', 'tel', 'url'],
    defaultValue: 'text',
    description: '입력 필드의 타입을 지정합니다.',
    required: false,
  },
  {
    propName: 'name',
    type: ['string'],
    description: '입력 필드의 고유 name/id. label의 htmlFor와 연결됩니다.',
    required: true,
  },
  {
    propName: 'value',
    type: ['string'],
    description: 'Controlled 값. 컴포넌트 외부 상태와 연결할 때 사용합니다.',
    required: false,
  },
  {
    propName: 'defaultValue',
    type: ['string'],
    description: 'Uncontrolled 초기값. Controlled 모드에서는 사용하지 않습니다.',
    required: false,
  },
  {
    propName: 'onChange',
    type: ['handler'],
    description: '값이 변경될 때 호출되는 이벤트 핸들러입니다. (e: ChangeEvent<HTMLInputElement>)',
  },
  {
    propName: 'onFocus',
    type: ['handler'],
    description: 'Input이 focus될 때 호출되는 이벤트 핸들러입니다.',
    required: false,
  },
  {
    propName: 'onBlur',
    type: ['handler'],
    description: 'Input이 blur될 때 호출되는 이벤트 핸들러입니다.',
    required: false,
  },
  {
    propName: 'fieldClassName',
    type: ['string'],
    description: 'FormField 전체 wrapper(`div`)에 적용할 클래스입니다.',
    required: false,
  },
  {
    propName: 'label',
    type: ['string'],
    description: '입력 필드 상단에 표시되는 라벨 텍스트입니다.',
    required: false,
  },
  {
    propName: 'labelClassName',
    type: ['string'],
    description: '라벨에 적용할 커스텀 클래스입니다.',
    required: false,
  },
  {
    propName: 'errorMessage',
    type: ['string'],
    description: '에러 메시지 텍스트로 입력창 하단에 표시됩니다.',
    required: false,
  },
  {
    propName: 'errorClassName',
    type: ['string'],
    description: '에러 메시지에 적용할 커스텀 클래스입니다.',
    required: false,
  },
  {
    propName: 'inputClassName',
    type: ['string'],
    description: '내부 `<input>` 엘리먼트에 적용할 커스텀 클래스입니다.',
    required: false,
  },
  {
    propName: 'inputWrapperClassName',
    type: ['string'],
    description: '`input + leftSlot + rightSlot`을 감싸는 wrapper에 적용할 커스텀 클래스입니다.',
    required: false,
  },
  {
    propName: 'leftSlot',
    type: ['ReactNode'],
    description: '입력창 왼쪽에 표시할 아이콘 또는 버튼입니다.',
    required: false,
  },
  {
    propName: 'rightSlot',
    type: ['ReactNode'],
    description: '입력창 오른쪽에 표시할 아이콘 또는 버튼입니다.',
    required: false,
  },
];

const exampleCode1 = `
\`\`\`
<FormField
  ref={inputRef}
  errorMessage='올바른 참여 코드를 입력해주세요'
  inputClassName='ds-typ-title-1 text-primary-500'
  inputWrapperClassName='py-20 px-24 ds-theme-bg-muted rounded-2xl gap-12'
  label='참여 코드'
  labelClassName='ds-typ-body-3'
  minLength={0}
  name='code'
  placeholder='ABCD12'
  rightSlot={<KeyboardIcon className='text-white-600 dark:text-white-900 size-24' />}
/>
\`\`\`
`;

const exampleCode2 = `
\`\`\`
<FormField
  errorMessage='error'
  label='label'
  leftSlot={<MoonIcon />}
  minLength={2}
  name='inputName'
  placeholder='text'
  rightSlot={<KeyboardIcon className='text-white-600 dark:text-white-900 size-16' />}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
\`\`\`
`;
