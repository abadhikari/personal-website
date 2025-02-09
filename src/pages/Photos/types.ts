/**
 * Interface representing the structure of a Media item in the parsed response body.
 *
 * @interface Media
 * @property {string} [alternativeText] - The optional alternative text for the media (for accessibility).
 * @property {ImageUrl} imageUrl - The url for the media (thumbnail and full image).
 * @property {string} mediaId - The unique identifier for the media item.
 * @property {string} mediaType - The type of the media (e.g., image, video).
 * @property {number} sequenceNumber - The order of the image within the stack.
 * @property {string} stackId - The unique identifier for the stack.
 */
export interface Media {
  alternativeText?: string;
  imageUrl: ImageUrl;
  mediaId: string;
  mediaType: string;
  sequenceNumber: number;
  stackId: string;
}

/**
 * Interface representing the structure of image urls in the media of the parsed response body.
 *
 * @interface ImageUrl
 * @property {string} thumbnail - The url of the thumbnail-sized image.
 * @property {string} full - The url of the full-sized image.
 */
export interface ImageUrl {
  thumbnail: string;
  full: string;
}

/**
 * Interface representing the structure of a Stack in the parsed response body.
 *
 * @interface Stack
 * @property {string} caption - A brief description or caption for the stack.
 * @property {string} location - The location associated with the stack.
 * @property {string} stackId - The unique identifier for the stack.
 * @property {number} uploadTimestamp - The timestamp indicating when the stack was uploaded.
 */
export interface Stack {
  caption: string;
  location?: string;
  stackId: string;
  uploadTimestamp: number;
}

/**
 * Interface representing the structure of a MediaStack in the parsed response body of the media read api.
 *
 * @interface MediaStack
 * @property {Media[]} media - An array of media items (images or videos) in the stack.
 * @property {Stack} stack - The stack information associated with the media.
 */
export interface MediaStack {
  media: Media[];
  stack: Stack;
}

export interface MediaReadApiResponse {
  stackAndMediaData: MediaStack[];
  lastEvaluatedKey?: string;
}
