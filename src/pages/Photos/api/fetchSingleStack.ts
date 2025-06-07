import getApiEndpoint from '../../../api/config';
import ApiError from '../../../errors/ApiError';
import { MediaStack } from '../types/mediaTypes';

/**
 * Fetches a single stack and its associated media from the API.
 *
 * @param {string} stackId - The identifier of the specific stack.
 * @returns {Promise<MediaStack>} Resolves to a MediaStack object.
 * @throws {ApiError} on network or JSON parsing failure
 */
export default async function fetchSingleStack(
  stackId: string
): Promise<MediaStack> {
  const search = new URLSearchParams({ stackId }).toString();
  const endpoint = getApiEndpoint(`stack?${search}`);
  const response = await fetch(endpoint, {
    headers: {
      Accept: 'application/json',
    },
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new ApiError(
      `GET stack failed: ${response.status} ${response.statusText}`,
      response.status,
      responseText
    );
  }

  try {
    const data = JSON.parse(responseText);
    return data.stackAndMediaData;
  } catch (err) {
    throw new ApiError(
      'GET stack: failed to parse JSON response',
      response.status,
      responseText
    );
  }
}
