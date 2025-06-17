import AnimatedSpinner from '../../../../components/common/animations/AnimatedSpinner';
import useContentMetadata from '../hooks/useContentMetadata';
import useContentUploadHandler from '../hooks/useContentUploadHandler';

import MetadataForm from './MetadataForm/MetadataForm';

import * as animationStyles from '../../../../styles/animations.module.css';
import * as styles from '../../styles/UploadContent.module.css';

/**
 * Renders the UI for uploading structured content entries (e.g. restaurants, venues).
 *
 * Features:
 * - Displays a metadata form for structured input
 * - Tracks metadata state via `useContentMetadata`
 * - Triggers content upload via `useContentUploadHandler`
 * - Shows a loading spinner while uploading
 *
 * @returns {JSX.Element} The content upload form UI
 */
export default function ContentUploadView() {
  const { contentMetadata, handleMetadataChange } = useContentMetadata();
  const { isUploading, upload } = useContentUploadHandler({
    metadata: contentMetadata,
  });

  const isCategorySelected = contentMetadata.categoryId !== -1;

  return (
    <>
      <div className={`${styles.upload} ${animationStyles.fadeInUp}`}>
        <h1>Upload Content</h1>
        <div className={styles.uploadDetails}>
          <MetadataForm
            metadata={contentMetadata}
            onMetadataChange={handleMetadataChange}
          />
          {isCategorySelected && (
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
