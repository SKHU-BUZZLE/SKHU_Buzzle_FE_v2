import Button from '@components/Button';
import { MoonIcon, SunIcon } from '@components/icons';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // HTML 태그에 dark class를 토글
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return isDark ? (
    <Button
      iconOnly
      aria-label='라이트 모드로 전환'
      leftIcon={<MoonIcon />}
      round='circular'
      size='md'
      variant='outline'
      onClick={() => setIsDark((v) => !v)}
    />
  ) : (
    <Button
      iconOnly
      aria-label='다크 모드로 전환'
      leftIcon={<SunIcon />}
      round='circular'
      size='md'
      variant='outline'
      onClick={() => setIsDark((v) => !v)}
    />
  );
}
