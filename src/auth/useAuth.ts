import { useEffect, useState } from 'react';
import { decodeJWT } from '@aws-amplify/auth';

import getToken from './getToken';

/**
 * Custom React hook for accessing the current user's authentication state.
 *
 * It provides:
 * - `token`: the raw ID token string (or `null` if unauthenticated or expired)
 * - `isAuthenticated()`: a function that returns `true` if the token is present and unexpired
 *
 * @returns An object containing the current token and a function to check authentication status.
 */
export default function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authToken = await getToken();
        setToken(authToken ?? null);
      } catch {
        setToken(null);
      }
    };

    checkAuth();
  }, []);

  const isAuthenticated = () => {
    if (!token) {
      return false;
    }

    try {
      const { payload } = decodeJWT(token);
      const { exp } = payload;

      if (typeof exp !== 'number') {
        return false;
      }

      return Date.now() < exp * 1000;
    } catch {
      return false;
    }
  };

  return { isAuthenticated, token };
}
