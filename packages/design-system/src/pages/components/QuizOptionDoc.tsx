import QuizOption from '@components/QuizOption';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';

export default function QuizOptionDoc() {
  const handleClick = (idx: number) => {
    console.log('눌린 보기 번호:', idx);
  };

  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}
      {/* <QuizOption index={1} option='여름보다 겨울이 덥다' variant='default' onClick={handleClick} />
      <QuizOption index={2} option='여름보다 겨울이 덥다' variant='selected' onClick={handleClick} />
      <QuizOption index={3} option='여름보다 겨울이 덥다' variant='correct' onClick={handleClick} />
      <QuizOption index={4} option='여름보다 겨울이 덥다' variant='incorrect' onClick={handleClick} />
      <QuizOption disabled index={5} option='여름보다 겨울이 덥다' onClick={handleClick} /> */}

      <QuizOption isCorrect index={5} option='여름보다 겨울이 덥다' onClick={handleClick} />
      <QuizOption isIncorrect index={5} option='여름보다 겨울이 덥다' onClick={handleClick} />
      <QuizOption disabled index={5} option='여름보다 겨울이 덥다' onClick={handleClick} />
      <QuizOption isSelected index={5} option='여름보다 겨울이 덥다' onClick={handleClick} />
      <QuizOption index={5} option='여름보다 겨울이 덥다' onClick={handleClick} />

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
      {/* <StatelessPlayground
        component={QuizOption}
        extraScope={{ handleClick }}
        initialProps={{
          variant: 'default',
          option: '모든 별은 결국 블랙홀이 된다.',
          disabled: false,
          index: 1,
        }}
        specs={specs}
      /> */}
    </div>
  );
}

const description = `
# QuizOption
QuizOption 컴포넌트는 객관식 퀴즈에서 개별 선지(보기)를 표현하는 UI 요소입니다.  
상태에 따라 기본, 선택됨, 정답, 오답을 시각적으로 구분해주며, 정답과 오답 시 아이콘을 통해 직관적으로 표현됩니다.  
또한 비활성화 상태를 지원하여 선택 불가능한 보기임을 명확히 표시할 수 있습니다.  
`;

const propsSpecs = [
  {
    propName: 'option',
    type: ['string'],
    description: '보기(선택지)에 표시할 텍스트입니다.',
    required: true,
  },
  {
    propName: 'variant',
    type: ['string'],
    description: '선택지의 상태를 지정합니다. 기본, 선택됨, 정답, 오답 네 가지 상태를 지원합니다.',
    defaultValue: 'default',
    options: ['default', 'selected', 'correct', 'incorrect'],
  },
  {
    propName: 'disabled',
    type: ['boolean'],
    description: '선택지를 비활성화할지 여부입니다. 비활성화 시 클릭할 수 없고 흐리게 표시됩니다.',
    defaultValue: 'false',
  },
  {
    propName: 'index',
    type: ['number'],
    description: '선택지의 인덱스 값입니다. 클릭 이벤트와 함께 외부로 전달됩니다.',
  },
  {
    propName: 'onClick',
    type: ['function'],
    description: '선택지가 클릭되었을 때 호출되는 콜백 함수입니다. 현재 선택지의 인덱스를 인자로 전달합니다.',
  },
];

// const specs = [
//   {
//     type: 'select',
//     propName: 'variant',
//     options: ['default', 'selected', 'correct', 'incorrect'],
//     label: 'Variant',
//   },
//   {
//     type: 'boolean',
//     propName: 'disabled',
//     label: 'Disabled',
//   },
//   {
//     type: 'text',
//     propName: 'option',
//     label: 'Option',
//   },
//   {
//     type: 'number',
//     propName: 'index',
//     label: 'Index',
//   },
//   {
//     type: 'handler',
//     propName: 'onClick',
//     options: ['handleClick'],
//     label: 'OnClick',
//   },
// ] satisfies ReadonlyArray<Spec>;
