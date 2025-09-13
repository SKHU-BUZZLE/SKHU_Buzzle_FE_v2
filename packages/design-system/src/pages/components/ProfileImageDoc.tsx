import ProfileImage from '@components/ProfileImage';
import MarkdownViewer from '@layouts/MarkdownViewer';
import PropsSpecTable from '@layouts/PropsSpecTable';
import StatelessPlayground, { type Spec } from '@layouts/StatelessPlayground';
import { users } from '@mocks/user';

export default function ProfileImageDoc() {
  return (
    <div className='flex flex-col gap-20'>
      {/* 1️⃣ 제목 & 설명 */}
      <MarkdownViewer content={description} />

      {/* 2️⃣ Props 스펙 */}
      <PropsSpecTable specs={propsSpecs} />

      {/* 3️⃣ 실제 컴포넌트 예시 */}

      {/* 4️⃣ 미리보기 (선택) : StatelessPlayground / StatefulPlayground */}
      <StatelessPlayground
        component={ProfileImage}
        initialProps={{
          src: users[0].picture,
          alt: `${users[0].name} 프로필`,
        }}
        specs={playgroundSpecs}
      />
    </div>
  );
}

const description = `
# ProfileImage
사용자의 프로필 이미지를 표시하는 컴포넌트입니다.  

- \`src\`가 없거나 잘못된 경우 기본 아이콘(UserIcon)으로 대체됩니다.  
- \`className\`을 통해 크기(\`size-*\`) 및 스타일을 자유롭게 제어할 수 있습니다.  
- 기본 크기는 \`size-32\`(32px × 32px)로 설정되어 있으며, \`className\`을 부여하지 않으면 이 크기가 적용됩니다.  
- 접근성을 위해 \`alt\` 텍스트를 제공합니다.  
`;

const propsSpecs = [
  {
    propName: 'src',
    type: ['string', 'null'],
    description: '사용자 프로필 이미지 URL. 없거나 로딩 실패 시 기본 아이콘이 표시됩니다.',
    required: false,
    options: [],
  },
  {
    propName: 'alt',
    type: ['string'],
    description: `접근성용 대체 텍스트. (예시: alt: \`${users[0].name} 프로필\`)`,
    required: false,
    defaultValue: '"프로필 이미지"',
    options: [],
  },
  {
    propName: 'className',
    type: ['string'],
    description: 'Tailwind 유틸로 크기/테두리 등 외부 스타일을 제어합니다.',
    required: false,
    options: [],
  },
];

const playgroundSpecs = [
  { type: 'text', propName: 'src', label: 'src (image URL)' },
  { type: 'text', propName: 'alt', label: 'alt' },
  { type: 'text', propName: 'className', label: 'className' },
] satisfies ReadonlyArray<Spec>;
