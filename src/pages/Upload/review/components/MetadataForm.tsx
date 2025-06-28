import { ReviewMetadata } from '../../types/uploadTypes';

import ContentSearch from './ContentSearch';
import StarRating from './StarRating';

import * as styles from '../../styles/UploadReview.module.css';

interface ReviewMetadataFormProps {
  metadata: ReviewMetadata;
  onMetadataChange: <K extends keyof ReviewMetadata>(
    field: K,
    value: ReviewMetadata[K]
  ) => void;
}

/**
 * Form component for editing reviews.
 *
 * @param {ReviewMetadataFormProps} props - Component props
 * @param {ReviewMetadata} props.metadata - Current metadata state
 * @param {function} props.onMetadataChange - Callback to update specific metadata fields
 *
 * @returns {JSX.Element} The rendered metadata form
 */
export default function ReviewMetadataForm({
  metadata,
  onMetadataChange,
}: ReviewMetadataFormProps) {
  return (
    <div className={styles.reviewMetadataForm}>
      <ContentSearch
        onSelect={(content) => {
          onMetadataChange('contentId', content.content_id);
        }}
      />

      {metadata.contentId && (
        <>
          <StarRating
            value={metadata.rating}
            onChange={(val) => onMetadataChange('rating', val)}
          />

          <label htmlFor="reviewText">
            Review<span className="required">*</span>
            <textarea
              id="reviewText"
              value={metadata.reviewText}
              onChange={(e) => onMetadataChange('reviewText', e.target.value)}
              rows={7}
            />
          </label>
        </>
      )}
    </div>
  );
}
