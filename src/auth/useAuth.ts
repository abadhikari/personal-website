import { useEffect, useState } from 'react';
import getToken from './getToken';

/**
 * Custom React hook for checking and tracking the current user's authentication status.
 *
 * It exposes:
 * - `isAuthenticated`: a boolean indicating whether the user is logged in
 * - `token`: the raw ID token string, or `null` if unauthenticated
 *
 * The check runs once on mount via `useEffect`, and handles fallback gracefully on failure.
 *
 * @returns An object containing the current auth state and token.
 */
export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authToken = await getToken();
        setIsAuthenticated(!!authToken);
        setToken(authToken ?? null);
      } catch {
        setIsAuthenticated(false);
        setToken(null);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, token };
}
