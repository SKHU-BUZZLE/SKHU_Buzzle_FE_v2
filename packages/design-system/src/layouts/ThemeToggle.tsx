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

  return (
    <button
      className='border-surface bg-white-200 dark:bg-dm-black-600 size-32 cursor-pointer rounded-full border hover:opacity-80'
      onClick={() => setIsDark(!isDark)}
    >
      <span className='text-body'>{isDark ? '🌙' : '☀️'}</span>
    </button>
  );
}
