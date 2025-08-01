import getApiEndpoint from '../../../../api/config';
import ApiError from '../../../../errors/ApiError';
import { Lookup, LookupType } from '../../types/uploadTypes';

/**
 * Fetches available lookup entries of a specific type, optionally filtered by query string.
 *
 * @param {LookupType} lookupType - The type of lookup to fetch (e.g., 'cuisine', 'dish').
 * @param {string} [query] - Optional query to filter results by name prefix.
 * @returns {Promise<LookupRow[]>} A list of lookup entries with `id` and `name`.
 * @throws {ApiError} If the server response is not OK or the payload is malformed.
 */
export default async function readLookups(
  lookupType: LookupType,
  query?: string,
  signal?: AbortSignal
): Promise<Lookup[]> {
  const endpoint = new URL(getApiEndpoint('lookups'), window.location.origin);
  endpoint.searchParams.append('lookupType', lookupType);

  if (query) {
    endpoint.searchParams.append('query', query);
  }

  const response = await fetch(endpoint.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    signal,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new ApiError(
      `GET lookups failed: ${response.status} ${response.statusText} - ${text}`,
      response.status,
      text
    );
  }

  const bodyText = await response.text();
  const parsed = JSON.parse(bodyText);
  const { results } = parsed;

  if (!results || !Array.isArray(results)) {
    throw new ApiError(
      `Invalid response format: ${bodyText}`,
      response.status,
      bodyText
    );
  }

  return results;
}
