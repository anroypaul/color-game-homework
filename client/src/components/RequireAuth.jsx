import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../context/AuthContext';

export default function RequireAuth({ children }) {
  const { authed } = useAuth();
  const location = useLocation();
console.log(authed)
  return authed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}
