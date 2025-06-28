import getApiEndpoint from '../../../../api/config';
import getToken from '../../../../auth/getToken';
import ApiError from '../../../../errors/ApiError';
import AuthError from '../../../../errors/AuthError';
import log from '../../../../utils/logger';

interface ReviewUploadPayload {
  contentId: string;
  rating: number;
  reviewText: string;
}

/**
 * Uploads a review for an existing piece of content.
 *
 * Constructs a POST request to the `/review` API endpoint with:
 * - content ID
 * - rating_x2 (2–10, represents 1.0 to 5.0 in 0.5 steps)
 * - review_text
 *
 * @param {ReviewUploadPayload} payload - The review metadata
 * @throws {AuthError} If the authentication token is missing
 * @throws {ApiError} If the server responds with a non-2xx status
 * @returns {Promise<void>} Resolves when the review is successfully uploaded
 */
export default async function uploadReview(
  payload: ReviewUploadPayload
): Promise<void> {
  const token = await getToken();
  if (!token) {
    throw new AuthError('Missing authorization token');
  }

  const endpoint = getApiEndpoint('review');
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      contentId: payload.contentId,
      rating: payload.rating,
      reviewText: payload.reviewText,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new ApiError(
      `POST review failed: ${response.status} ${response.statusText} - ${text}`,
      response.status,
      text
    );
  }

  log.info('event=writeReview status=success', {
    content_id: payload.contentId,
    rating: payload.rating,
  });
}
