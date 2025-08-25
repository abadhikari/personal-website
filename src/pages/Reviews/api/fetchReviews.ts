import getApiEndpoint from '../../../api/config';
import ApiError from '../../../errors/ApiError';
import transformKeysToCamelCase from '../../../utils/transformKeysToCamelCase';
import { ContentCategory } from '../../Upload/types/uploadTypes';
import { ReviewsReadApiResponse } from '../types/reviewTypes';

/**
 * Interface representing the query parameters available when fetching reviews.
 *
 * @property {number} [limit=10] - Maximum number of reviews to return (between 1 and 1000).
 * @property {string} [search] - Optional full-text search query.
 * @property {string} [cursor] - Optional pagination cursor (ISO timestamp preferred).
 * @property {ContentCategory[]} [categoryIds] - Optional category filters.
 */
export interface FetchReviewsParams {
  limit?: number;
  search?: string;
  cursor?: string;
  categoryIds?: ContentCategory[];
}

/**
 * Fetches review entries from the Reviews API with optional search, pagination, and category filters.
 *
 * @param {FetchReviewsParams} [params] - Query parameters for the request.
 * @returns {Promise<ReviewsReadApiResponse>} Resolves to an object containing reviews and an optional next cursor.
 * @throws {ApiError} When the HTTP request fails or the body cannot be parsed.
 */
export default async function fetchReviews({
  limit = 10,
  search,
  cursor,
  categoryIds,
}: FetchReviewsParams = {}): Promise<ReviewsReadApiResponse> {
  const queryParams = new URLSearchParams();

  if (typeof limit === 'number') queryParams.set('limit', String(limit));
  if (search) queryParams.set('search', search);
  if (cursor) queryParams.set('cursor', cursor);
  if (categoryIds?.length)
    queryParams.set('categoryIds', categoryIds.join(','));

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
    return transformKeysToCamelCase(
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
