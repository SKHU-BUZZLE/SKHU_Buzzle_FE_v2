import { MoonIcon, SunIcon } from '@buzzle/design';
import useTheme from '@stores/theme';
import { useEffect } from 'react';

export default function ThemeToggleButton() {
  const theme = useTheme((s) => s.theme);
  const setLightMode = useTheme((s) => s.setLightMode);
  const setDarkMode = useTheme((s) => s.setDarkMode);

  const toggleTheme = () => {
    if (theme === 'dark') setLightMode();
    else setDarkMode();
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <button
      className='bg-white-400 dark:bg-dm-black-600 size-31 cursor-pointer rounded-full hover:opacity-80'
      onClick={toggleTheme}
    >
      <span className='flex items-center justify-center'>
        {theme === 'dark' ? <MoonIcon className='text-black-100' /> : <SunIcon className='text-black-200' />}
      </span>
    </button>
  );
}
