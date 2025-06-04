import { getCurrentUser } from '@aws-amplify/auth';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AnimatedSpinner from './animations/AnimatedSpinner';

interface PrivateRouteProps {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    getCurrentUser()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) {
    return <AnimatedSpinner className="spinnerBlack" />;
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default PrivateRoute;
