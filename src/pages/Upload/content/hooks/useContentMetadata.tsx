import { useState } from 'react';

import { ContentMetadata } from '../../types/uploadTypes';

/**
 * Manages state and updates for content metadata fields.
 *
 * @returns {{
 *   contentMetadata: ContentMetadata,
 *   handleMetadataChange: <K extends keyof ContentMetadata>(field: K, value: ContentMetadata[K]) => void
 * }} Object containing metadata and a field update function
 */
export default function useContentMetadata() {
  const [contentMetadata, setContentMetadata] = useState<ContentMetadata>({
    categoryId: -1,
    title: '',
    address: '',
    city: '',
    state: undefined,
    venueId: -1,
    country: '',
    latitude: 999,
    longitude: 999,
    priceLevel: -1,
    cuisineIds: undefined,
  });

  const handleMetadataChange = <K extends keyof ContentMetadata>(
    field: K,
    value: ContentMetadata[K]
  ) => {
    setContentMetadata((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return { contentMetadata, handleMetadataChange };
}
