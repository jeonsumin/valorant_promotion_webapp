import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from 'utils/cookies';

export const ProtectedRoute = () => {
  const isCheckIn = getCookie("user");
  return isCheckIn ? <Outlet/> : <Navigate to={"/onboarding"} replace />;
}