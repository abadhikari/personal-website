import { ContentMetadata } from '../../../types/uploadTypes';

import DynamicMetadataForm from './DynamicMetadataForm';

import * as styles from '../../../styles/UploadContent.module.css';

interface MetadataFormProps {
  metadata: ContentMetadata;
  onMetadataChange: <K extends keyof ContentMetadata>(
    field: K,
    value: ContentMetadata[K]
  ) => void;
}

/**
 * Form component for editing structured content metadata (e.g. name, address, location).
 *
 * Renders a category selector and dynamically displays additional fields
 * based on the selected category via `DynamicMetadataForm`.
 *
 * @param {MetadataFormProps} props - Component props
 * @param {ContentMetadata} props.metadata - Current metadata state
 * @param {function} props.onMetadataChange - Callback to update a specific metadata field
 *
 * @returns {JSX.Element} The rendered metadata form UI
 */
export default function MetadataForm({
  metadata,
  onMetadataChange,
}: MetadataFormProps) {
  return (
    <div className={styles.contentMetadata}>
      <label htmlFor="categoryId">
        Category<span className="required">*</span>
        <select
          id="categoryId"
          value={metadata.categoryId}
          onChange={(e) =>
            onMetadataChange('categoryId', parseInt(e.target.value, 10))
          }
        >
          <option value={-1}>-- Select a category --</option>
          <option value={4}>Food & Drink</option>
          <option value={5}>Entertainment</option>
        </select>
      </label>
      <DynamicMetadataForm
        metadata={metadata}
        onMetadataChange={onMetadataChange}
      />
    </div>
  );
}
