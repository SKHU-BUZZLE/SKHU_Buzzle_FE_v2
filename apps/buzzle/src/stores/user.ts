import { getMyProfile } from '@apis/user';
import { rankingQueryKeys } from '@hooks/useRanking';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { queryClient } from '../libs/queryProvider';

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

  // 랭킹 관련 메서드
  invalidateRankingQueries: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => {
        set({ user });
        // 사용자 정보가 업데이트되면 랭킹 쿼리도 무효화
        queryClient.invalidateQueries({ queryKey: rankingQueryKeys.all });
      },

      fetchUser: async () => {
        const res = await getMyProfile();
        set({ user: res.data.data });
        // 사용자 정보를 가져온 후 랭킹 쿼리 무효화
        queryClient.invalidateQueries({ queryKey: rankingQueryKeys.all });
      },

      clearUser: () => {
        set({ user: null });
        // 사용자 정보 삭제 시 랭킹 쿼리도 무효화
        queryClient.invalidateQueries({ queryKey: rankingQueryKeys.all });
      },

      invalidateRankingQueries: () => {
        queryClient.invalidateQueries({ queryKey: rankingQueryKeys.all });
      },
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
