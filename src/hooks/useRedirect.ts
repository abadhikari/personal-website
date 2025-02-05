import { useLocation, useNavigate } from 'react-router-dom';

/**
 * A custom hook for managing navigation redirects in a React Router app.
 *
 * @returns {object} - An object containing:
 *   - `navigate`: A function to programmatically navigate to a new route.
 *   - `from`: The pathname to redirect to, defaulting to '/' if no `from` value is specified.
 */
export default function useRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  return { navigate, from };
}
