/**
 * Checks if the given media type represents an image.
 * Expects a MIME type string (e.g., 'image/jpeg', 'video/mp4').
 *
 * @param mediaType - The MIME type of the file.
 * @returns True if the media type starts with 'image', otherwise false.
 */
export function isImage(mediaType: string): boolean {
  return mediaType.startsWith('image');
}

/**
 * Checks if the given media type represents a video.
 * Expects a MIME type string (e.g., 'video/mp4', 'image/png').
 *
 * @param mediaType - The MIME type of the file.
 * @returns True if the media type starts with 'video', otherwise false.
 */
export function isVideo(mediaType: string): boolean {
  return mediaType.startsWith('video');
}
