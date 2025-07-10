import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import AuthError from '../../../../errors/AuthError';
import log from '../../../../utils/logger';
import { UploadableContent } from '../../validation/schemas';
import uploadContent from '../api/uploadContent';

/**
 * Custom hook that handles uploading content metadata to the server.
 * Performs client-side validation before triggering the upload.
 *
 * @param {Object} props - Hook props
 * @param {ContentMetadata} props.metadata - Metadata describing the content to be uploaded
 *
 * @returns {{
 *   isUploading: boolean,
 *   upload: (data: UploadableContent) => Promise<void>
 * }} Object containing the current upload state and a function to trigger the upload.
 *
 */
export default function useContentUploadHandler() {
  const [isUploading, setIsUploading] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const SUCCESS_RESET_TIME = 4000;

  const resetPage = () => {
    window.location.reload();
  };

  const upload = async (data: UploadableContent) => {
    try {
      setIsUploading(true);
      await uploadContent(data);
      toast.success('Content uploaded successfully!');
      timerRef.current = setTimeout(resetPage, SUCCESS_RESET_TIME);
    } catch (err) {
      log.error('Failed to upload content:', err);
      if (err instanceof AuthError) {
        toast.error('Please sign in to submit a review.');
      } else {
        toast.error('Error uploading content. Please try again.');
      }
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
