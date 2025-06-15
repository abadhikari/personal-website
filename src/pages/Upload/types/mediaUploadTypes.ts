/**
 * Represents a file to request a signed upload URL for.
 *
 * @property fileName - Original file name (used for S3 key naming).
 * @property contentType - MIME type of the file (e.g., 'image/jpeg', 'video/mp4').
 * @property type - Logical role of the file in the stack (e.g., 'primary', 'thumbnail').
 */
export interface SignedUrlRequestItem {
  fileName: string;
  contentType: string;
  type: string;
}

/**
 * Represents the response from the signed URL API.
 */
export interface SignedUrlResponse {
  signedUrlsAndKeys: Array<SignedUrlAndKey>;
}

/**
 * Contains the pre-signed URL and storage key for uploading a media file.
 *
 * @property uploadUrl - The pre-signed S3 URL to PUT the file.
 * @property key - The resulting S3 key for the uploaded object.
 * @property type - Logical type ('primary' or 'thumbnail'), must match the request item.
 */
export interface SignedUrlAndKey {
  uploadUrl: string;
  key: string;
  type: string;
}
