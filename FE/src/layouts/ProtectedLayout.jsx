import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context';

const ProtectedLayout = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ next: location.pathname }} />
  );
};

export default ProtectedLayout;