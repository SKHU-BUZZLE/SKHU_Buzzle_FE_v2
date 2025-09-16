import {
  BookIcon,
  CultureIcon,
  EconomyIcon,
  HistoryIcon,
  NatureIcon,
  Radio,
  ScienceIcon,
  SportsIcon,
  TriviaIcon,
} from '@buzzle/design';

interface QuizCategoryProps {
  /** 선택된 카테고리 값 */
  value: string | number;
  /** 값이 변경될 때 호출 */
  onChange: (next: string | number) => void;
}

const categories = [
  { value: 'all', icon: <BookIcon />, label: '전체' },
  { value: 'economy', icon: <EconomyIcon />, label: '경제/사회' },
  { value: 'science', icon: <ScienceIcon />, label: '과학/기술' },
  { value: 'art', icon: <CultureIcon />, label: '문화/예술' },
  { value: 'sports', icon: <SportsIcon />, label: '스포츠' },
  { value: 'history', icon: <HistoryIcon />, label: '역사' },
  { value: 'nature', icon: <NatureIcon />, label: '자연' },
  { value: 'etc', icon: <TriviaIcon />, label: '잡학' },
];

export default function QuizCategory({ value, onChange }: QuizCategoryProps) {
  return (
    <Radio.Root mode='card' value={value} onChange={onChange}>
      <Radio.Title>카테고리</Radio.Title>
      <Radio.Items className='grid grid-cols-4 gap-12'>
        {categories.map((category) => (
          <Radio.Card key={category.value} icon={category.icon} label={category.label} value={category.value} />
        ))}
      </Radio.Items>
    </Radio.Root>
  );
}
