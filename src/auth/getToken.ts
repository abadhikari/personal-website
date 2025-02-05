import { fetchAuthSession } from '@aws-amplify/auth';

/**
 * Retrieves the ID token from the current AWS Amplify authentication session.
 *
 * @returns {Promise<string | null>} The ID token as a string, or `null` if unavailable.
 * @throws {Error} If fetching the auth session fails.
 */
export default async function getToken() {
  const session = await fetchAuthSession();
  return session.tokens?.idToken?.toString();
}
