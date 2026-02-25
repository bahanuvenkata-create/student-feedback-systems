import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ 
  element, 
  isAuthenticated, 
  userRole, 
  requiredRole = null,
  redirectPath = '/'
}) => {
  // Not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check role if required
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return element;
};
