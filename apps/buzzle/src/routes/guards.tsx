import { useAuthStore } from '@stores/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function RequireAuth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to='/login' />;
  }
  return <Outlet />;
}

export function GuestOnly() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated) return <Navigate replace to='/home' />;
  return <Outlet />;
}

export function IndexRedirect() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return <Navigate replace to={isAuthenticated ? '/home' : '/login'} />;
}
