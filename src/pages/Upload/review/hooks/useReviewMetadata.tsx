import { useState } from 'react';

import { ReviewMetadata } from '../../types/uploadTypes';

/**
 * Manages state and updates for review metadata fields.
 *
 * @returns {{
 *   reviewMetadata: ReviewMetadata,
 *   handleReviewChange: <K extends keyof ReviewMetadata>(field: K, value: ReviewMetadata[K]) => void
 * }} Object containing metadata and a field update function
 */
export default function useReviewMetadata() {
  const [reviewMetadata, setReviewMetadata] = useState<ReviewMetadata>({
    contentId: '',
    rating: -1,
    reviewText: '',
  });

  const handleMetadataChange = <K extends keyof ReviewMetadata>(
    field: K,
    value: ReviewMetadata[K]
  ) => {
    setReviewMetadata((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return { reviewMetadata, handleMetadataChange };
}
