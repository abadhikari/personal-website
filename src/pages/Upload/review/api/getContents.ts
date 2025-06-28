import getApiEndpoint from '../../../../api/config';
import ApiError from '../../../../errors/ApiError';
import log from '../../../../utils/logger';
import { Content } from '../../types/uploadTypes';

export type ContentsResponse = {
  contents: Content[];
};

/**
 * Fetches available content entries for review.
 *
 * @param {string} [search] Optional search query to filter content titles
 * @param {number} [limit] Optional limit on number of results (default handled by server)
 * @returns {Promise<Content[]>} A list of content entries
 * @throws {ApiError} If the server response is not ok
 */
export default async function getContents(
  search?: string,
  limit?: number
): Promise<Content[]> {
  const endpoint = new URL(getApiEndpoint('contents'), window.location.origin);

  if (search) {
    endpoint.searchParams.append('search', search);
  }

  if (limit) {
    endpoint.searchParams.append('limit', limit.toString());
  }

  const response = await fetch(endpoint.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new ApiError(
      `GET contents failed: ${response.status} ${response.statusText} - ${text}`,
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

  log.info(`event=readContents status=success count=${results.length}`);
  return results;
}
