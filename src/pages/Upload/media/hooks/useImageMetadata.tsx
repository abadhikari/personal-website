import { useState } from 'react';

import { ImageMetadata } from '../components/MetadataForm';

/**
 * Manages state and updates for image metadata fields.
 *
 * @returns {{
 *   imageMetadata: ImageMetadata,
 *   handleMetadataChange: (field: keyof ImageMetadata, value: string) => void
 * }} Object containing metadata and a field update function
 */
export default function useImageMetadata() {
  const [imageMetadata, setImageMetadata] = useState<ImageMetadata>({
    caption: '',
    altText: '',
    location: '',
  });

  const handleMetadataChange = (field: keyof ImageMetadata, value: string) =>
    setImageMetadata((prev) => ({ ...prev, [field]: value }));

  return { imageMetadata, handleMetadataChange };
}
