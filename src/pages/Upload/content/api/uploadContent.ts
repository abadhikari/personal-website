import getApiEndpoint from '../../../../api/config';
import getToken from '../../../../auth/getToken';
import ApiError from '../../../../errors/ApiError';
import AuthError from '../../../../errors/AuthError';
import log from '../../../../utils/logger';
import { ContentMetadata } from '../../types/uploadTypes';

/**
 * Uploads structured content metadata to the backend.
 *
 * Constructs a POST request to the `/content` API endpoint with a payload
 * representing venue-related metadata (e.g. restaurants, events).
 * Requires a valid authentication token.
 *
 * @param {ContentMetadata} contentMetadata - The metadata to upload
 *
 * @throws {AuthError} If the authentication token is missing
 * @throws {ApiError} If the server responds with a non-2xx status
 *
 * @returns {Promise<void>} Resolves when the content is successfully uploaded
 */
export default async function uploadContent(
  contentMetadata: ContentMetadata
): Promise<void> {
  const writeRequest = {
    category_id: contentMetadata.categoryId,
    payload: {
      name: contentMetadata.name,
      address: contentMetadata.address,
      city: contentMetadata.city,
      state: contentMetadata.state,
      venue_id: contentMetadata.venueId,
      country: contentMetadata.country,
      latitude: contentMetadata.latitude,
      longitude: contentMetadata.longitude,
      price_level: contentMetadata.priceLevel,
      cuisine_ids: contentMetadata.cuisineIds,
    },
  };

  const token = await getToken();
  if (!token) {
    throw new AuthError('Missing authorization token');
  }

  const endpoint = getApiEndpoint(`content`);
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(writeRequest),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new ApiError(
      `POST content failed: ${response.status} ${response.statusText} - ${text}`,
      response.status,
      text
    );
  }

  log.info('event=writeContent status=success', {
    writeRequest,
  });
}
