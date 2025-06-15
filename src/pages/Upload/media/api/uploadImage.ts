import { isVideo } from '../../../../utils/file';
import {
  SignedUrlAndKey,
  SignedUrlRequestItem,
} from '../../types/mediaUploadTypes';
import { ImageMetadata } from '../components/MetadataForm';

import extractThumbnailFromVideo from './extractThumbnailFromVideo';
import getSignedUrls from './getSignedUrls';
import saveMetadata from './saveMetadata';
import uploadToS3 from './uploadToS3';

/**
 * Uploads one or more media files (primary file and optional thumbnail) to S3 using signed URLs.
 * Maps each uploaded file type to its corresponding S3 key for later metadata persistence.
 *
 * @param {SignedUrlAndKey[]} signedUrlsAndKeys - The list of signed URLs and associated metadata from the backend.
 * @param {File} file - The primary file to upload (e.g., image or video).
 * @param {File} [thumbnail] - Optional thumbnail file, typically extracted from a video.
 * @returns {Promise<Record<string, string>>} - A mapping of file types (`primary`, `thumbnail`) to their corresponding S3 keys.
 * @throws {ApiError} - If any upload fails (e.g., non-200 response from S3).
 */
async function uploadMediaFiles(
  signedUrlsAndKeys: SignedUrlAndKey[],
  file: File,
  thumbnail?: File
): Promise<Record<string, string>> {
  const uploadsByType: Record<string, string> = {};
  await Promise.all(
    signedUrlsAndKeys.map(async ({ type, uploadUrl, key }) => {
      const fileToUpload = type === 'thumbnail' ? thumbnail : file;
      if (fileToUpload) {
        await uploadToS3(uploadUrl, fileToUpload);
        uploadsByType[type] = key;
      }
    })
  );
  return uploadsByType;
}

/**
 * Coordinates the full media upload pipeline: generates signed URLs, uploads files to S3,
 * and saves metadata to the backend.
 *
 * If the uploaded file is a video, this function also generates a thumbnail at the provided
 * timestamp and uploads that as well. The function concludes by persisting relevant metadata
 * (caption, alt text, etc.) for later retrieval and display.
 *
 * @param {File} file - The image or video file to be uploaded.
 * @param {ImageMetadata} imageMetadata - Metadata associated with the upload (caption, alt text, optional location).
 * @param {number} videoCurrentTime - Timestamp (in seconds) used to generate a thumbnail from a video file.
 * @returns {Promise<void>} - Resolves once all operations (upload + metadata save) complete.
 * @throws {AuthError | ApiError | Error} - If any part of the process fails: token fetch, signed URL request, file upload, or metadata persistence.
 */
export default async function uploadImage(
  file: File,
  imageMetadata: ImageMetadata,
  videoCurrentTime: number
): Promise<void> {
  const signedUrlRequest: SignedUrlRequestItem[] = [
    {
      fileName: file.name,
      contentType: file.type,
      type: 'primary',
    },
  ];

  let thumbnail: File | undefined;
  if (isVideo(file.type)) {
    thumbnail = await extractThumbnailFromVideo(file, videoCurrentTime);
    signedUrlRequest.push({
      fileName: thumbnail.name,
      contentType: thumbnail.type,
      type: 'thumbnail',
    });
  }

  const signedUrlsAndKeys = await getSignedUrls(signedUrlRequest);

  const uploadsByType = await uploadMediaFiles(
    signedUrlsAndKeys,
    file,
    thumbnail
  );

  const uploadTimestamp = Date.now();

  await saveMetadata(
    uploadTimestamp,
    imageMetadata,
    file.type,
    uploadsByType.primary,
    uploadsByType.thumbnail
  );
}
