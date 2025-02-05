import { v4 as uuidv4 } from 'uuid';
import { ImageMetadata } from './components/MetadataForm';
import extractThumbnailFromVideo from './extractThumbnailFromVideo';
import getToken from '../../auth/getToken';

interface SignedUrlResponse {
  signedUrlsAndKeys: Array<SignedUrlAndKey>;
}

interface SignedUrlAndKey {
  uploadUrl: string;
  key: string;
}

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
export async function saveMetadata(
  uploadTimestamp: number,
  imageMetadata: ImageMetadata,
  contentType: string,
  fileKey: string,
  thumbnail?: string
) {
  const stackId = uuidv4();
  const mediaId = uuidv4();

  try {
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

    const writeResponse = await fetch(
      'https://reoonusak1.execute-api.us-east-1.amazonaws.com/prod/v1/media',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(writeRequest),
      }
    );

    if (!writeResponse.ok) {
      throw Error(`Error writing metadata.`);
    }
  } catch (error) {
    console.log('Upload Error: ', error);
    throw error;
  }
}

async function uploadToSignedUrl(signedUrlAndKey: SignedUrlAndKey, file: File) {
  const { uploadUrl } = signedUrlAndKey;
  const uploadResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error(`Error uploading file to S3: ${uploadResponse.statusText}`);
  }
}

/**
 * Handles the process of uploading an image file to S3. First, it requests a signed URL from the backend,
 * uploads the file to S3 using the signed URL, and then saves metadata about the file.
 *
 * @param {File} file - The image file to be uploaded.
 * @param {string} userId - The ID of the user uploading the file.
 * @param {ImageMetadata} imageMetadata - The metadata for the image, including caption, alt text, and location.
 * @throws Will throw an error if any step in the upload process fails (e.g., obtaining signed URL, uploading to S3, saving metadata).
 */
export async function uploadImage(
  file: File,
  userId: string,
  imageMetadata: ImageMetadata
) {
  try {
    const signedUrlRequest = [
      {
        fileName: file.name,
        contentType: file.type,
        userId,
      },
    ];

    let thumbnail;
    if (file.type.includes('video')) {
      thumbnail = await extractThumbnailFromVideo(file);
      signedUrlRequest.push({
        fileName: thumbnail.name,
        contentType: thumbnail.type,
        userId,
      });
    }

    const token = await getToken();

    const signedUrlResponse = await fetch(
      'https://reoonusak1.execute-api.us-east-1.amazonaws.com/prod/v1/media/upload-url',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ filesMetadata: signedUrlRequest }),
      }
    );

    if (!signedUrlResponse.ok) {
      throw Error(`Error getting signed URL: ${signedUrlResponse.statusText}`);
    }

    const data =
      (await signedUrlResponse.json()) as unknown as SignedUrlResponse;

    const { signedUrlsAndKeys } = data;

    if (!signedUrlsAndKeys || signedUrlsAndKeys.length === 0) {
      throw new Error('No signed URLs returned from the API.');
    }

    const { key } = signedUrlsAndKeys[0];
    uploadToSignedUrl(signedUrlsAndKeys[0], file);

    let thumbnailKey;
    if (thumbnail) {
      thumbnailKey = signedUrlsAndKeys[1].key;
      uploadToSignedUrl(signedUrlsAndKeys[1], thumbnail);
    }

    const uploadTimestamp = Date.now();

    saveMetadata(uploadTimestamp, imageMetadata, file.type, key, thumbnailKey);
  } catch (error) {
    console.log('Upload Error: ', error);
    throw error;
  }
}
