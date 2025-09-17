import QuizIntro from '@components/QuizIntro';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import StatefulPlayground from '@layouts/StatefulPlayground';

export default function QuizIntroDoc() {
  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}
      {/* <QuizIntro
        guidelines={[
          '총 7문제가 주어져요.',
          '문제당 제한 시간은 10초예요.',
          '틀린 문제는 오답 노트에서 다시 확인할 수 있어요.',
        ]}
        src='https://cdn-icons-png.flaticon.com/512/2080/2080878.png'
        subtitle='7문제를 풀고, 나만의 기록을 세워보세요'
        title='혼자서 즐기는 상식 퀴즈'
      /> */}

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
      <StatefulPlayground code={code} extraScope={{ QuizIntro }} />
    </div>
  );
}

const description = `
# QuizIntro

디자인 시스템 공용 **QuizIntro** 컴포넌트입니다.  
퀴즈 시작 전에 보여줄 **인트로 섹션**을 렌더링합니다.

- \`src\`는 퀴즈 소개 이미지를 나타냅니다. (예: 정적 \`.webp\` 파일)
- \`title\`은 퀴즈의 **메인 제목**으로 \`<h1>\`에 표시됩니다.
- \`subtitle\`은 제목 하단의 **부제/설명**으로 \`<h2>\`에 표시됩니다.
- \`guidelines\`는 퀴즈 진행에 필요한 **규칙/안내 문구 리스트**를 나열합니다.
- 이미지의 \`alt\` 속성은 \`title\`을 기반으로 자동 생성되며, title이 없을 경우 기본 문구("퀴즈 안내 이미지")가 사용됩니다.
- 리스트 항목은 \`<ul><li>\` 구조로 렌더링되며, 불릿(\`list-disc\`)과 일정한 간격(\`gap-4\`)이 적용됩니다.

~~고정된 UI이므로 스타일 확장은 고려하지 않았습니다.~~
`;

const propsSpecs = [
  {
    propName: 'src',
    type: ['string'],
    description: '퀴즈 소개 이미지 경로입니다. 정적 파일(`.webp` 등)을 import 하여 전달합니다.',
    required: true,
  },
  {
    propName: 'title',
    type: ['string'],
    description: '퀴즈의 메인 제목입니다. `<h1>`로 표시됩니다.',
    required: true,
  },
  {
    propName: 'subtitle',
    type: ['string'],
    description: '퀴즈의 부제/설명입니다. 제목 아래 `<h2>`로 표시됩니다.',
    required: true,
  },
  {
    propName: 'guidelines',
    type: ['string[]'],
    description: '퀴즈 규칙이나 안내 문구 리스트입니다. 각 항목은 `<li>`로 렌더링됩니다.',
    required: false,
  },
];

const code = `
function QuizIntroExample() {
  return (
    <QuizIntro
      guidelines={[
        '총 7문제가 주어져요.',
        '문제당 제한 시간은 10초예요.',
        '틀린 문제는 오답 노트에서 다시 확인할 수 있어요.',
      ]}
      src='https://cdn-icons-png.flaticon.com/512/2080/2080878.png'
      subtitle='7문제를 풀고, 나만의 기록을 세워보세요'
      title='혼자서 즐기는 상식 퀴즈'
    />
  );
}
render(<QuizIntroExample />);
`;
