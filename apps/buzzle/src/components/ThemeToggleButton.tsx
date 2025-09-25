import { Button, MoonIcon, SunIcon } from '@buzzle/design';
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

  return theme === 'dark' ? (
    <Button
      iconOnly
      aria-label='라이트 모드로 전환'
      className='bg-white-400 dark:bg-dm-black-600 p-10'
      leftIcon={<MoonIcon />}
      round='circular'
      size='md'
      variant='outline'
      onClick={toggleTheme}
    />
  ) : (
    <Button
      iconOnly
      aria-label='다크 모드로 전환'
      className='bg-white-400 dark:bg-dm-black-600 p-10'
      leftIcon={<SunIcon />}
      round='circular'
      size='md'
      variant='outline'
      onClick={toggleTheme}
    />
  );
}
