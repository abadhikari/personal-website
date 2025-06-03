/**
 * Returns the base URL of the current environment.
 *
 * - In a browser environment, constructs the base URL using `window.location`.
 * - In non-browser environments (e.g. SSR or Node.js), falls back to a hardcoded default.
 *
 * @returns {string} The base URL, including protocol and host (e.g. "https://example.com").
 */
export default function getBaseUrl(): string {
  if (typeof window !== 'undefined' && window.location) {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return 'https://abhinnaadhikari.com';
}
