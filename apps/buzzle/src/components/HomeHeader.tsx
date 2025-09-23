import { LifeCounter, TextLogoIcon } from '@buzzle/design';
import ThemeToggleButton from '@components/ThemeToggleButton';
import { useLife } from '@hooks/useLife';

export default function HomeHeader() {
  const { data: life = 0 } = useLife();

  return (
    <header className='bg-white-200 dark:bg-dm-black-800 flex items-center justify-between gap-12 py-12'>
      <TextLogoIcon className='w-120' />
      <div className='flex items-center gap-12'>
        <LifeCounter life={life} />
        <ThemeToggleButton />
      </div>
    </header>
  );
}
