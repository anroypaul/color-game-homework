import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../context/AuthContext';
import PropTypes from 'prop-types';

export default function RequireAuth({ children }) {
  const { authed } = useAuth();
  const location = useLocation();

  return authed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
};
