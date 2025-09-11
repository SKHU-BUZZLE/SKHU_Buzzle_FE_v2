import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark';
  setLightMode: () => void;
  setDarkMode: () => void;
}

const getInitialTheme = (): 'light' | 'dark' => {
  // 로컬스토리지에 저장된 값 우선
  const storage = localStorage.getItem('theme');
  if (storage) {
    const parsed = JSON.parse(storage);
    const savedTheme = parsed?.state?.theme as 'light' | 'dark' | undefined;
    if (savedTheme) return savedTheme;
  }

  // 없으면 시스템 모드와 똑같게 설정
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
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
