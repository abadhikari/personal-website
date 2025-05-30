import { isProd } from '../utils/env';

/**
 * Returns the base API URL depending on the current environment.
 *
 * - In production (`process.env.STAGE === 'prod'`), it uses the full absolute URL from
 *   the `API_BASE_ENDPOINT` environment variable (e.g., "https://api.abhinnaadhikari.com/v1").
 *   If this env var is missing, an error is thrown to prevent misconfigured deployments.
 *
 * - In development, it returns "/api" so that requests can be proxied through the
 *   webpack dev server to the appropriate target.
 *
 * @returns {string} The base API URL.
 * @throws {Error} If in production and `API_BASE_ENDPOINT` is not defined.
 */
function getApiBaseUrl(): string {
  if (isProd()) {
    const apiBaseEndpoint = process.env.API_BASE_ENDPOINT;
    if (!apiBaseEndpoint) {
      throw new Error('Missing API_BASE_ENDPOINT in .env');
    }
    return apiBaseEndpoint;
  }

  // goes through dev server proxy
  return '/api';
}

/**
 * Constructs a full API endpoint by appending the given path to the base API URL.
 *
 * - Automatically handles whether the path begins with a leading slash.
 * - Respects the current environment (dev or prod) via `getApiBaseUrl()`.
 *
 * @param {string} path - The relative API path (e.g., "/media", "auth/login").
 * @returns {string} A fully qualified API URL for use in fetch requests.
 *
 * @example
 *   getApiEndpoint('media') // → "/api/media" in dev, "https://.../media" in prod
 *   getApiEndpoint('/media/stack') // → "/api/media/stack" or "https://.../media/stack"
 */
export default function getApiEndpoint(path: string): string {
  return `${getApiBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`;
}
