import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import log from '../../../../utils/logger';
import { ReviewMetadata } from '../../types/uploadTypes';
import uploadReview from '../api/uploadReview';

/**
 * Custom hook to handle uploading a review to the server.
 * Validates required fields before uploading.
 *
 * @param {ReviewMetadata} metadata - Review metadata including contentId, rating, and review text.
 *
 * @returns {{
 *   isUploading: boolean,
 *   upload: () => Promise<void>
 * }} Upload state and trigger function.
 */
export default function useReviewUploadHandler(metadata: ReviewMetadata) {
  const [isUploading, setIsUploading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const SUCCESS_RESET_TIME = 4000;

  const resetPage = () => {
    window.location.reload();
  };

  const upload = async () => {
    if (!metadata.contentId) {
      toast.error('Missing content ID.');
      return;
    }

    if (metadata.rating < 1 || metadata.rating > 5) {
      toast.error('Please select a valid rating.');
      return;
    }

    if (!metadata.reviewText.trim()) {
      toast.error('Review text cannot be empty.');
      return;
    }

    try {
      setIsUploading(true);
      await uploadReview({
        contentId: metadata.contentId,
        rating: metadata.rating,
        reviewText: metadata.reviewText,
      });
      toast.success('Review submitted successfully!');
      timerRef.current = setTimeout(resetPage, SUCCESS_RESET_TIME);
    } catch (err) {
      log.error('Failed to upload review:', err);
      toast.error('Error submitting review. Please try again.');
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
