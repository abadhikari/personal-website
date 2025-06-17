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

/**
 * Enum representing the type of upload operation.
 * - `MEDIA`: Uploading photos or videos
 * - `CONTENT`: Uploading structured content metadata (e.g. venue info)
 */
export enum UploadType {
  MEDIA = 'media',
  CONTENT = 'content',
}

/**
 * Metadata structure for uploading content entries (e.g. restaurants, venues, events).
 * Used when `UploadType` is `CONTENT`.
 */
export interface ContentMetadata {
  categoryId: number;
  name: string;
  address: string;
  city: string;
  state?: string;
  venueId: number;
  country: string;
  latitude: number;
  longitude: number;
  priceLevel: number;
  cuisineIds?: number[];
}

/**
 * Enum of content categories used to classify structured content.
 * Matches values stored in the `category_id` field of the backend.
 */
export enum ContentCategory {
  MOVIE = 1,
  SHOW = 2,
  BOOK = 3,
  FOOD_AND_DRINK = 4,
  ENTERTAINMENT = 5,
}
