import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import log from '../../../../utils/logger';
import { ContentMetadata } from '../../types/uploadTypes';
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
 *   upload: () => Promise<void>
 * }} Object containing the current upload state and a function to trigger the upload.
 *
 */
export default function useContentUploadHandler({
  metadata,
}: {
  metadata: ContentMetadata;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const SUCCESS_RESET_TIME = 4000;

  const resetPage = () => {
    window.location.reload();
  };

  const upload = async () => {
    if (metadata.categoryId < 0) {
      toast.error('Please select a valid category_id.');
      return;
    }

    if (!metadata.title.trim()) {
      toast.error('Please enter a name.');
      return;
    }

    if (!metadata.address.trim()) {
      toast.error('Please enter an address.');
      return;
    }

    if (!metadata.city.trim()) {
      toast.error('Please enter a city.');
      return;
    }

    if (!metadata.country.trim()) {
      toast.error('Please enter a country.');
      return;
    }

    if (Number.isNaN(metadata.latitude) || metadata.latitude === 999) {
      toast.error('Please enter a valid latitude.');
      return;
    }

    if (Number.isNaN(metadata.longitude) || metadata.longitude === 999) {
      toast.error('Please enter a valid longitude.');
      return;
    }

    if (metadata.venueId < 0) {
      toast.error('Please select a valid venue.');
      return;
    }

    if (metadata.priceLevel < 0) {
      toast.error('Please select a valid price level.');
      return;
    }

    try {
      setIsUploading(true);
      await uploadContent(metadata);
      toast.success('Content uploaded successfully!');
      timerRef.current = setTimeout(resetPage, SUCCESS_RESET_TIME);
    } catch (err) {
      log.error('Failed to upload content:', err);
      toast.error('Error uploading content. Please try again.');
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
