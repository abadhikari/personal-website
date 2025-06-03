import getApiEndpoint from '../../../api/config';
import { MediaStack } from '../types/mediaTypes';

/**
 * Fetches a single stack and its associated media from the API.
 *
 * @param {string} stackId - The identifier of the specific stack.
 * @returns {Promise<MediaStack>} Resolves to a MediaStack object.
 * @throws Will throw if the network request fails.
 */
export default async function fetchSingleStack(
  stackId: string
): Promise<MediaStack> {
  const search = new URLSearchParams({ stackId }).toString();
  const endpoint = getApiEndpoint(`stack?${search}`);
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.stackAndMediaData;
}
