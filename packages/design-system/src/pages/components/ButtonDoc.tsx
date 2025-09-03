import Button from '@/components/Button';
import MarkdownViewer from '@/layouts/MarkdownViewer';
import PropsSpecTable from '@/layouts/PropsSpecTable';
import StatelessPlayground from '@/layouts/StatelessPlayground';

const content = `
테스트 버튼에 대한 디자인 문서입니다.  
이렇게 적어도 됩니다.
`;

export default function ButtonDoc() {
  // handler들을 extraScope로 넘겨서 handler select로 연결할 수 있게 함
  const handlers = {
    onClickAlert: () => alert('Clicked!'),
    onClickAlert2: () => alert('Clicked! 2'),
    onClickAlert3: () => alert('Clicked! 3'),
  };

  return (
    <div className='flex flex-col gap-12'>
      <p className='text-black-600 text-3xl font-bold'>Button</p>

      <p className='text-black-600 text-xl font-bold'>Description</p>
      <MarkdownViewer content={content} />

      <p className='text-black-600 text-xl font-bold'>Props</p>
      <PropsSpecTable
        specs={[
          {
            type: ['string', 'number', 'boolean'],
            propName: 'children',
            required: true,
            description: '버튼에 보여질 텍스트입니다.',
          },
          {
            type: ['string'],
            propName: 'variant',
            defaultValue: 'primary',
            options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
            description: '버튼의 색상을 선택합니다.',
            required: true,
          },
          {
            type: ['string'],
            propName: 'size',
            options: ['xl', 'lg', 'md', 'sm', 'xs'],
            defaultValue: 'md',
            description: '버튼의 크기를 선택합니다.',
            required: true,
          },
          {
            type: ['string'],
            propName: 'round',
            options: ['rounded', 'circular', 'square'],
            defaultValue: 'rounded',
            description: '버튼의 모서리 스타일을 선택합니다.',
          },
          {
            type: ['boolean'],
            propName: 'loading',
            defaultValue: 'false',
            description: '버튼 로딩 여부를 나타냅니다.',
          },
          {
            type: ['boolean'],
            propName: 'disabled',
            defaultValue: 'false',
            description: '버튼 비활성화 여부를 나타냅니다.',
          },
          {
            type: ['string'],
            propName: 'className',
            description: '버튼 외부에서 스타일을 확장할 수 있습니다.',
          },
          {
            type: ['string'],
            propName: 'onClick',
            options: ['onClickAlert', 'onClickAlert2', 'onClickAlert3'],
            description: '버튼 클릭 이벤트 핸들러입니다.',
          },
        ]}
      />

      <p className='text-black-600 text-xl font-bold'>Playground</p>
      <StatelessPlayground
        component={Button}
        extraScope={handlers}
        initialProps={{
          children: '버튼',
          variant: 'primary',
          size: 'md',
          round: 'rounded',
          loading: false,
          disabled: false,
        }}
        specs={[
          { type: 'text', propName: 'children', label: 'button text' },
          { type: 'select', propName: 'variant', options: ['primary', 'secondary', 'outline', 'ghost', 'danger'] },
          { type: 'select', propName: 'size', options: ['xl', 'lg', 'md', 'sm', 'xs'] },
          { type: 'select', propName: 'round', options: ['rounded', 'circular', 'square'] },
          { type: 'boolean', propName: 'loading' },
          { type: 'boolean', propName: 'disabled' },
          { type: 'text', propName: 'className', label: 'className' },
          {
            type: 'handler',
            propName: 'onClick',
            options: ['onClickAlert', 'onClickAlert2', 'onClickAlert3'],
            label: 'onClick',
          },
        ]}
      />
    </div>
  );
}
