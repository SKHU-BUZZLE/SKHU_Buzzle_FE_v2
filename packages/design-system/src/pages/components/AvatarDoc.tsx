import Avatar from '@components/Avatar';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import StatelessPlayground, { type Spec } from '@layouts/StatelessPlayground';

export default function AvatarDoc() {
  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 */}
      {/* <Avatar
        direction='vertical'
        name='홍길동'
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqSh4pif1F3qmhHqoQqS4clVbu-SpdlIiE9g&s'
      />
      <Avatar direction='horizontal' metaValue={390} name='홍길동' variant='score' />
      <Avatar direction='horizontal' metaValue={98} name='홍길동' variant='rank' /> */}

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
      <StatelessPlayground
        component={Avatar}
        initialProps={{
          variant: 'default',
          direction: 'vertical',
          name: '홍길동',
          src: '',
          metaValue: 100,
        }}
        specs={specs}
      />
    </div>
  );
}

const description = `
# Avatar
Avatar 컴포넌트는 사용자나 참가자의 프로필 정보를 표시하는 UI 요소입니다.  
프로필 이미지를 기본으로 렌더링하며, 이름과 함께 점수(Score) 또는 등수(Rank)를 함께 보여줄 수 있습니다.  
variant에 따라 \`default\`, \`score\`, \`rank\` 모드를 지원하여 다양한 맥락(예: 순위표, 점수판)에서 활용 가능합니다.  
또한 direction 옵션을 통해 세로/가로 레이아웃을 손쉽게 전환할 수 있습니다.  
`;

const propsSpecs = [
  {
    propName: 'variant',
    type: ['default', 'score', 'rank'],
    description: 'Avatar의 표현 방식을 결정합니다. 기본, 점수 표시, 등수 표시 모드를 지원합니다.',
    required: false,
    defaultValue: 'default',
    options: ['default', 'score', 'rank'],
  },
  {
    propName: 'src',
    type: ['string'],
    description: '프로필 이미지의 경로(URL)입니다. 값이 없으면 기본 아바타 아이콘이 표시됩니다.',
    required: false,
  },
  {
    propName: 'alt',
    type: ['string'],
    description: '프로필 이미지의 대체 텍스트입니다. 값이 없으면 name 기반으로 생성됩니다.',
    required: false,
  },
  {
    propName: 'name',
    type: ['string'],
    description: '사용자 이름입니다.',
    required: true,
  },
  {
    propName: 'metaValue',
    type: ['number'],
    description: '점수(score)나 등수(rank) 값입니다. variant가 "score" 또는 "rank"일 때만 표시됩니다.',
    required: false,
  },
  {
    propName: 'direction',
    type: ['horizontal', 'vertical'],
    description: 'Avatar와 텍스트의 배치 방향을 설정합니다.',
    required: false,
    defaultValue: 'vertical',
    options: ['horizontal', 'vertical'],
  },
  {
    propName: 'layoutClassName',
    type: ['string'],
    description: 'Avatar의 전체 레이아웃 컨테이너에 추가할 사용자 정의 className입니다.',
    required: false,
  },
  {
    propName: 'profileImageClassName',
    type: ['string'],
    description: 'Avatar의 프로필 이미지에 추가할 사용자 정의 className입니다.',
    required: false,
  },
  {
    propName: 'nameClassName',
    type: ['string'],
    description: '이름 텍스트에 추가할 사용자 정의 className입니다.',
    required: false,
  },
  {
    propName: 'metaClassName',
    type: ['string'],
    description: '점수/등수 텍스트에 추가할 사용자 정의 className입니다.',
    required: false,
  },
];

const specs = [
  {
    type: 'select',
    propName: 'variant',
    options: ['default', 'score', 'rank'],
    label: 'Variant',
  },
  {
    type: 'select',
    propName: 'direction',
    options: ['vertical', 'horizontal'],
    label: 'Direction',
  },
  {
    type: 'text',
    propName: 'name',
    label: 'Name',
  },
  {
    type: 'text',
    propName: 'src',
    label: 'Image Src',
  },
  {
    type: 'text',
    propName: 'alt',
    label: 'Image Alt',
  },
  {
    type: 'number',
    propName: 'metaValue',
    label: 'Meta Value',
  },
  {
    type: 'text',
    propName: 'layoutClassName',
    label: 'Layout ClassName',
  },
  {
    type: 'text',
    propName: 'profileImageClassName',
    label: 'ProfileImage ClassName',
  },
  {
    type: 'text',
    propName: 'nameClassName',
    label: 'Name ClassName',
  },
  {
    type: 'text',
    propName: 'metaClassName',
    label: 'Meta ClassName',
  },
] satisfies ReadonlyArray<Spec>;
