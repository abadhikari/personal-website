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
  REVIEW = 'review',
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

/**
 * Metadata structure for uploading review entries.
 * Used when `UploadType` is `REVIEW`.
 */
export interface ReviewMetadata {
  contentId: string;
  rating: number;
  reviewText: string;
}

/**
 * Represents a content item that serves as a base entity for all content types
 * (e.g., books, movies, shows, experiences, etc.).
 */
export type Content = {
  content_id: string;
  title: string;
  category_id: number;
  parent_id: string | null;
  created_at: string;
};

/**
 * Metadata structure for uploading experience-based content entries
 * such as restaurants, venues, and events. Common across all experience types.
 */
export type BaseExperiencePayload = {
  title: string;
  address: string;
  city: string;
  state?: string;
  venue_id: number;
  country: string;
  latitude: number;
  longitude: number;
  price_level: number;
};

/**
 * Payload structure for food and drink entries (e.g. restaurants, cafes).
 * Extends the base experience with optional cuisine tags.
 */
export type FoodAndDrinkPayload = BaseExperiencePayload & {
  cuisine_ids?: number[];
};

/**
 * Payload structure for entertainment content entries (e.g. museums, concerts).
 * Inherits all fields from BaseExperiencePayload without additional fields.
 */
export type EntertainmentPayload = BaseExperiencePayload;

export type BookPayload = {
  title: string;
  author: string;
  pages: number;
  year_published: number;
  isbn?: string;
  genres: number[];
};
