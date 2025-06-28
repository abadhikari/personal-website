import AnimatedSpinner from '../../../../components/common/animations/AnimatedSpinner';
import useReviewMetadata from '../hooks/useReviewMetadata';
import useReviewUploadHandler from '../hooks/useReviewUploadHandler';

import MetadataForm from './MetadataForm';

import * as animationStyles from '../../../../styles/animations.module.css';
import * as styles from '../../styles/UploadContent.module.css';

/**
 * Renders the UI for uploading structured content entries (e.g. restaurants, venues).
 *
 * Features:
 * - Displays a metadata form for structured input
 * - Tracks metadata state via `useReviewMetadata`
 * - Triggers content upload via `useReviewUploadHandler`
 * - Shows a loading spinner while uploading
 *
 * @returns {JSX.Element} The content upload form UI
 */
export default function ReviewUploadView() {
  const { reviewMetadata, handleMetadataChange } = useReviewMetadata();
  const { isUploading, upload } = useReviewUploadHandler(reviewMetadata);

  return (
    <>
      <div className={`${styles.upload} ${animationStyles.fadeInUp}`}>
        <h1>Upload Review</h1>
        <div className={styles.uploadDetails}>
          <MetadataForm
            metadata={reviewMetadata}
            onMetadataChange={handleMetadataChange}
          />
          {reviewMetadata.contentId && (
            <button
              type="button"
              className={styles.uploadButton}
              onClick={upload}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading…' : 'Upload'}
            </button>
          )}
        </div>
      </div>
      {isUploading && (
        <div className="loadingOverlay">
          <AnimatedSpinner />
        </div>
      )}
    </>
  );
}
