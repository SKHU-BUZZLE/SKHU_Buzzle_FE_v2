import { useAuthStore } from '@stores/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function RequireAuth() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate replace state={{ from: location }} to='/login' />;
  }
  return <Outlet />;
}

export function GuestOnly() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  if (isLoggedIn) return <Navigate replace to='/home' />;
  return <Outlet />;
}

export function IndexRedirect() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return <Navigate replace to={isLoggedIn ? '/home' : '/login'} />;
}
