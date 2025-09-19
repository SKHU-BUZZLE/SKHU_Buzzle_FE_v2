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
  value: string;
  /** 값이 변경될 때 호출 */
  onChange: (next: string) => void;
}

const categories = [
  { value: 'ALL', icon: <BookIcon />, label: '전체' },
  { value: 'SOCIETY', icon: <EconomyIcon />, label: '경제/사회' },
  { value: 'SCIENCE', icon: <ScienceIcon />, label: '과학/기술' },
  { value: 'CULTURE', icon: <CultureIcon />, label: '문화/예술' },
  { value: 'SPORTS', icon: <SportsIcon />, label: '스포츠' },
  { value: 'HISTORY', icon: <HistoryIcon />, label: '역사' },
  { value: 'NATURE', icon: <NatureIcon />, label: '자연' },
  { value: 'MISC', icon: <TriviaIcon />, label: '잡학' },
];

export default function QuizCategory({ value, onChange }: QuizCategoryProps) {
  return (
    <Radio.Root mode='card' value={String(value)} onChange={onChange}>
      <Radio.Title>카테고리</Radio.Title>
      <Radio.Items className='grid grid-cols-4 gap-12'>
        {categories.map((category) => (
          <Radio.Card key={category.value} icon={category.icon} label={category.label} value={category.value} />
        ))}
      </Radio.Items>
    </Radio.Root>
  );
}
