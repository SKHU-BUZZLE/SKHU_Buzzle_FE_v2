import { useAuthStore } from '@stores/auth';
import { useUserStore } from '@stores/user';

export function logout() {
  useAuthStore.getState().clearTokens();
  useUserStore.getState().clearUser();
}

export function useLogout() {
  return logout;
}
