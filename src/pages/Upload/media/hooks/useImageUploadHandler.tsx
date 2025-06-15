import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import log from '../../../../utils/logger';
import uploadImage from '../api/uploadImage';
import { ImageMetadata } from '../components/MetadataForm';

/**
 * Handles the upload process for a media file and its metadata.
 *
 * @param {File | null} file - The selected file to upload
 * @param {ImageMetadata} metadata - Metadata associated with the file
 * @param {number} videoTime - Timestamp for video thumbnail (if applicable)
 *
 * @returns {{
 *   isUploading: boolean,
 *   upload: () => Promise<void>
 * }} Upload state and trigger function
 */
export default function useImageUploadHandler({
  file,
  metadata,
  videoTime,
}: {
  file: File | null;
  metadata: ImageMetadata;
  videoTime: number;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const SUCCESS_RESET_TIME = 3000;

  const resetPage = () => {
    window.location.reload();
  };

  const upload = async () => {
    if (!file) {
      toast.error('Please select a file first.');
      return;
    }
    if (!metadata.caption) {
      toast.error('Please add a caption');
      return;
    }
    if (!metadata.altText) {
      toast.error('Please add an altText');
      return;
    }

    try {
      setIsUploading(true);
      await uploadImage(file, metadata, videoTime);
      toast.success('File uploaded successfully!');
      timerRef.current = setTimeout(resetPage, SUCCESS_RESET_TIME);
    } catch (err) {
      log.error('Failed to upload media:', err);
      toast.error('Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { isUploading, upload };
}
