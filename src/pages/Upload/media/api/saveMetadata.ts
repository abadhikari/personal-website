import { v4 as uuidv4 } from 'uuid';

import getApiEndpoint from '../../../../api/config';
import getToken from '../../../../auth/getToken';
import ApiError from '../../../../errors/ApiError';
import AuthError from '../../../../errors/AuthError';
import log from '../../../../utils/logger';
import { ImageMetadata } from '../components/MetadataForm';

/**
 * Sends metadata for an uploaded image to the backend for persistence. Generates unique identifiers
 * for the stack and media and sends a POST request to the backend.
 *
 * @param {number} uploadTimestamp - The timestamp of the image upload.
 * @param {ImageMetadata} imageMetadata - The metadata for the image, including caption, alt text, and location.
 * @param {string} contentType - The MIME type of the uploaded file.
 * @param {string} fileKey - The unique key for the uploaded file in the S3 bucket.
 * @throws Will throw an error if the metadata write operation fails.
 */
export default async function saveMetadata(
  uploadTimestamp: number,
  imageMetadata: ImageMetadata,
  contentType: string,
  fileKey: string,
  thumbnail?: string
) {
  const stackId = uuidv4();
  const mediaId = uuidv4();

  const imagePath = {
    thumbnail: thumbnail || fileKey,
    full: fileKey,
  };

  const media = {
    mediaId,
    mediaType: contentType,
    alternativeText: imageMetadata.altText,
    imagePath,
  };

  const writeRequest = {
    stackId,
    uploadTimestamp,
    caption: imageMetadata.caption,
    media: [media],
    ...(imageMetadata.location && { location: imageMetadata.location }),
  };

  const token = await getToken();
  if (!token) {
    throw new AuthError('Missing authorization token');
  }

  const endpoint = getApiEndpoint(`stack`);
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
      `POST stack failed: ${response.status} ${response.statusText} - ${text}`,
      response.status,
      text
    );
  }

  log.info('event=writeStack status=success', {
    stackId,
  });
}
