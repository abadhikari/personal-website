import getApiEndpoint from '../../../../api/config';
import getToken from '../../../../auth/getToken';
import ApiError from '../../../../errors/ApiError';
import AuthError from '../../../../errors/AuthError';
import {
  SignedUrlAndKey,
  SignedUrlRequestItem,
  SignedUrlResponse,
} from '../../types/uploadTypes';

/**
 * Requests pre-signed S3 upload URLs from the backend for the given list of files.
 *
 * @param {SignedUrlRequestItem[]} signedUrlRequest - An array of file metadata objects describing each file to upload.
 *        Each item must include: fileName, contentType, and a `type` (e.g., 'primary', 'thumbnail').
 * @returns {Promise<SignedUrlAndKey[]>} - A list of objects containing the signed upload URL, the final S3 key, and the file type.
 *
 * @throws {AuthError} - If the user token is missing or unauthenticated.
 * @throws {ApiError} - If the server responds with a non-200 status or returns invalid JSON.
 * @throws {Error} - If the API responds with no signed URLs.
 */
export default async function getSignedUrls(
  signedUrlRequest: SignedUrlRequestItem[]
): Promise<SignedUrlAndKey[]> {
  const token = await getToken();
  if (!token) {
    throw new AuthError('Missing authorization token');
  }

  const endpoint = getApiEndpoint(`media/upload-url`);
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ filesMetadata: signedUrlRequest }),
  });

  const responseText = await response.text();
  if (!response.ok) {
    throw new ApiError(
      `Signed-URL fetch failed: ${response.status} ${response.statusText}`,
      response.status,
      responseText
    );
  }

  let data: SignedUrlResponse;
  try {
    data = JSON.parse(responseText);
  } catch (err) {
    throw new ApiError(
      'POST media/upload-url: failed to parse JSON response',
      response.status,
      responseText
    );
  }

  const { signedUrlsAndKeys } = data;
  if (!signedUrlsAndKeys || signedUrlsAndKeys.length === 0) {
    throw new Error('No signed URLs returned from the API.');
  }
  return signedUrlsAndKeys;
}
