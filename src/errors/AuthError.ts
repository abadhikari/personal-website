/**
 * Custom error class for handling authentication-related failures.
 *
 * Designed to provide additional context for debugging and error handling,
 * such as reasons for failure (e.g., "expired", "malformed", "missing token")
 * or relevant metadata (e.g., token expiration time, user session state).
 */
export default class AuthError extends Error {
  constructor(
    public message: string,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AuthError';
  }
}
