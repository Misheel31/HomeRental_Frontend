import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/splash" />;
  }

  return children;
};

export default PrivateRoute;
