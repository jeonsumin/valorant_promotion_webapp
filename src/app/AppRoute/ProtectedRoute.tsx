import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getCookie } from 'utils/cookies';

export const ProtectedRoute = () => {
  const location = useLocation();
  const fullPath = location.pathname + location.search;
  const isCheckIn = getCookie('user');

  return isCheckIn ? (
    <Outlet />
  ) : (
    <Navigate
      to={'/onboarding'}
      replace
      state={{ from: fullPath}}
    />
  );
};
