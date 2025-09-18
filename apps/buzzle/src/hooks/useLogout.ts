import { useAuthStore } from '@stores/auth';
import { useUserStore } from '@stores/user';

export function useLogout() {
  const clearTokens = useAuthStore((state) => state.clearTokens);
  const clearUser = useUserStore((state) => state.clearUser);

  return () => {
    clearTokens();
    clearUser();
  };
}
