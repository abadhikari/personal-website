import { ContentCategory, ContentMetadata } from '../../../types/uploadTypes';

import EntertainmentMetadataForm from './EntertainmentMetadataForm';
import FoodAndDrinkMetadataForm from './FoodAndDrinkMetadataForm';

interface DynamicMetadataFormProps {
  metadata: ContentMetadata;
  onMetadataChange: <K extends keyof ContentMetadata>(
    field: K,
    value: ContentMetadata[K]
  ) => void;
}

/**
 * Dynamically renders a metadata form based on the selected content category.
 *
 * Routes to:
 * - `FoodAndDrinkMetadataForm` if category is FOOD_AND_DRINK
 * - `EntertainmentMetadataForm` if category is ENTERTAINMENT
 *
 * Falls back to null if no valid category is selected.
 *
 * @param {DynamicMetadataFormProps} props - Component props
 * @param {ContentMetadata} props.metadata - Current metadata state
 * @param {function} props.onMetadataChange - Callback to update specific metadata fields
 *
 * @returns {JSX.Element | null} The rendered category-specific form, or null if none selected
 */
export default function DynamicMetadataForm({
  metadata,
  onMetadataChange,
}: DynamicMetadataFormProps) {
  const { categoryId } = metadata;
  switch (categoryId) {
    case ContentCategory.FOOD_AND_DRINK:
      return (
        <FoodAndDrinkMetadataForm
          metadata={metadata}
          onMetadataChange={onMetadataChange}
        />
      );
    case ContentCategory.ENTERTAINMENT:
      return (
        <EntertainmentMetadataForm
          metadata={metadata}
          onMetadataChange={onMetadataChange}
        />
      );
    default:
      return null;
  }
}
