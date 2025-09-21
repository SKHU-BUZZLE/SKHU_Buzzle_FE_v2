import { getMyProfile } from '@apis/user';
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

  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;

  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      fetchUser: async () => {
        const res = await getMyProfile();
        set({ user: res.data.data });
      },

      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
);
