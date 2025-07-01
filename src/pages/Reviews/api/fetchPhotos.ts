import getApiEndpoint from '../../../api/config';
import ApiError from '../../../errors/ApiError';
import transformKeysToCamel from '../../../utils/transformKeysToCamel';
import { ReviewsReadApiResponse } from '../types/reviewTypes';

/**
 * Fetches review entries from the Reviews API with optional search and pagination.
 *
 * @param {Object} params - Optional query parameters.
 * @param {number} [params.limit=10] - Maximum number of reviews to return.
 * @param {string} [params.search] - Optional text search query.
 * @param {string} [params.cursor] - Optional pagination cursor (ISO timestamp).
 * @returns {Promise<ReviewsReadApiResponse>} resolving to an object containing reviews and a next cursor.
 */
export default async function fetchReviews({
  limit,
  search,
  cursor,
}: {
  limit?: number;
  search?: string;
  cursor?: string;
} = {}): Promise<ReviewsReadApiResponse> {
  const queryParams = new URLSearchParams({
    limit: String(limit),
    ...(search ? { search } : {}),
    ...(cursor ? { cursor } : {}),
  }).toString();

  const endpoint = getApiEndpoint(`reviews?${queryParams}`);
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  const responseText = await response.text();
  if (!response.ok) {
    throw new ApiError(
      `GET reviews: ${response.status} ${response.statusText}`,
      response.status,
      responseText
    );
  }

  try {
    return transformKeysToCamel(
      JSON.parse(responseText)
    ) as ReviewsReadApiResponse;
  } catch (err) {
    throw new ApiError(
      'GET reviews: failed to parse JSON response',
      response.status,
      responseText
    );
  }
}
