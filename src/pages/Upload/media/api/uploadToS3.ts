import ApiError from '../../../../errors/ApiError';
import log from '../../../../utils/logger';

/**
 * Uploads a file directly to an S3 bucket using a pre-signed URL.
 *
 * @param {string} uploadUrl - A pre-signed S3 URL allowing PUT access to a specific object.
 * @param {File} file - The file to upload. Its MIME type is used as the `Content-Type` header.
 * @throws {ApiError} If the upload fails due to a non-2xx response.
 */
export default async function uploadToS3(uploadUrl: string, file: File) {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new ApiError(
      `S3 PUT failed: ${response.status} ${response.statusText} - ${text}`,
      response.status,
      text
    );
  }

  log.info('event=writeToS3 status=success', {
    uploadUrl,
  });
}
