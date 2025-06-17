import { ContentMetadata } from '../../../types/uploadTypes';

import ExperienceMetadataForm from './ExperienceMetadataForm';

interface FoodAndDrinkMetadataFormProps {
  metadata: ContentMetadata;
  onMetadataChange: <K extends keyof ContentMetadata>(
    field: K,
    value: ContentMetadata[K]
  ) => void;
}

/**
 * Form component for editing metadata specific to Food & Drink content.
 *
 * Extends the shared `ExperienceMetadataForm` (name, address, etc.)
 * and includes a multi-select input for cuisine type(s).
 *
 * @param {FoodAndDrinkMetadataFormProps} props - Component props
 * @param {ContentMetadata} props.metadata - Current metadata state
 * @param {function} props.onMetadataChange - Callback to update a specific metadata field
 *
 * @returns {JSX.Element} The rendered form for Food & Drink metadata
 */
export default function FoodAndDrinkMetadataForm({
  metadata,
  onMetadataChange,
}: FoodAndDrinkMetadataFormProps) {
  return (
    <>
      <ExperienceMetadataForm
        metadata={metadata}
        onMetadataChange={onMetadataChange}
      />
      <label htmlFor="cuisineIds">
        Cuisine IDs
        <select
          id="cuisineIds"
          multiple
          size={3}
          value={(metadata.cuisineIds ?? []).map(String)}
          onChange={(e) => {
            const selectedValues = Array.from(
              e.target.selectedOptions,
              (option) => parseInt(option.value, 10)
            );
            onMetadataChange(
              'cuisineIds',
              selectedValues.length > 0 ? selectedValues : undefined
            );
          }}
        >
          <option value={1}>American</option>
          <option value={2}>Mexican</option>
          <option value={3}>Italian</option>
          <option value={4}>Chinese</option>
          <option value={5}>Japanese</option>
          <option value={6}>Korean</option>
          <option value={7}>Thai</option>
          <option value={8}>Vietnamese</option>
          <option value={9}>Indian</option>
          <option value={10}>Middle Eastern</option>
          <option value={11}>French</option>
          <option value={12}>Spanish</option>
          <option value={13}>Greek</option>
          <option value={14}>Turkish</option>
          <option value={15}>Caribbean</option>
          <option value={16}>African</option>
          <option value={17}>Brazilian</option>
          <option value={18}>Vegetarian</option>
          <option value={19}>Vegan</option>
          <option value={20}>Fusion</option>
          <option value={21}>Seafood</option>
          <option value={22}>BBQ</option>
          <option value={23}>Dessert</option>
        </select>
      </label>
    </>
  );
}
