import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark';
  setLightMode: () => void;
  setDarkMode: () => void;
}

const getInitialTheme = (): 'light' | 'dark' => {
  // SSR, 프리렌더 환경 대비
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return 'light';

  try {
    // 로컬스토리지에 저장된 값 우선
    const storage = localStorage.getItem('theme');
    if (storage) {
      const saved = JSON.parse(storage)?.state?.theme as 'light' | 'dark' | undefined;
      if (saved === 'light' || saved === 'dark') return saved;
    }
  } catch {
    // 기본은 시스템 설정으로
  }

  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: getInitialTheme(),
      setLightMode: () => set({ theme: 'light' }),
      setDarkMode: () => set({ theme: 'dark' }),
    }),
    { name: 'theme', storage: createJSONStorage(() => localStorage) },
  ),
);

export default useTheme;
