import { getMyLife, getMyProfile } from '@apis/user';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
  picture: string;
  email: string;
  name: string;
  streak: number;
  createAt: string;
  daysSinceCreation: number;
  currentRanking: number;
}

interface UserState {
  user: User | null;
  life: number;

  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;

  setLife: (n: number) => void;
  fetchLife: () => Promise<number>;

  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      life: 0,

      setUser: (user) => set({ user }),
      setLife: (life) => set({ life }),

      fetchUser: async () => {
        const res = await getMyProfile();
        set({ user: res.data.data });
      },

      fetchLife: async () => {
        const res = await getMyLife();
        const life = res.data.data.life;
        set({ life });
        return life;
      },

      clearUser: () => set({ user: null, life: 0 }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        life: state.life,
      }),
    },
  ),
);
