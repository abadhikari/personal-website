import getApiEndpoint from '../../../api/config';
import { MediaReadApiResponse } from '../types/mediaTypes';
import ApiError from '../../../errors/ApiError';

/**
 * Fetches photo stacks from the API with optional parameters for customization.
 *
 * @param {Object} params - The optional parameters for the API call.
 * @param {number} [params.stackLimit=10] - The maximum number of stacks to fetch.
 * @param {number} [params.startTimestamp=0] - The earliest timestamp to include.
 * @param {number} [params.endTimestamp=9999999999999] - The latest timestamp to include.
 * @param {string} [params.lastEvaluatedKey=null] - The pagination token for fetching the next batch of results.
 * @returns {Promise<MediaReadApiResponse>} resolving to ReadMediaApiResponse.
 */
export default async function fetchPhotos({
  stackLimit = 9,
  startTimestamp = 0,
  endTimestamp = 9999999999999,
  lastEvaluatedKey,
}: {
  stackLimit?: number;
  startTimestamp?: number;
  endTimestamp?: number;
  lastEvaluatedKey?: string;
} = {}): Promise<MediaReadApiResponse> {
  const search = new URLSearchParams({
    stackLimit: String(stackLimit),
    startTimestamp: String(startTimestamp),
    endTimestamp: String(endTimestamp),
    ...(lastEvaluatedKey ? { lastEvaluatedKey } : {}),
  }).toString();
  const endpoint = getApiEndpoint(`stacks?${search}`);
  const response = await fetch(endpoint, {
    headers: {
      Accept: 'application/json',
    },
  });

  const responseText = await response.text();
  if (!response.ok) {
    throw new ApiError(`GET stacks: ${response.status} ${response.statusText}`, response.status, responseText);
  }

  try {
    return JSON.parse(responseText);
  } catch (err) {
    throw new ApiError('GET stacks: failed to parse JSON response', response.status, responseText);
  }
}
