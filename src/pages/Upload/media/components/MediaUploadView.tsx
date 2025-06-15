import { useState } from 'react';

import FileInput from './FileInput';
import MediaUploadModal from './MediaUploadModal';

import * as animationStyles from '../../../../styles/animations.module.css';
import * as styles from '../../styles/UploadMedia.module.css';

/**
 * MediaUploadView handles the full media upload workflow:
 * - Renders a file input for selecting an image or video
 * - Displays a modal preview for the selected media
 * - Delegates upload metadata entry and submission to MediaUploadModal
 *
 * @returns {JSX.Element} The rendered media upload page view
 */
export default function MediaUploadView() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  return (
    <>
      <div className={`${styles.upload} ${animationStyles.fadeInUp}`}>
        <h1>Upload Media</h1>
        <div className={styles.uploadContainer}>
          {!imageFile && (
            <FileInput
              onFileSelect={setImageFile}
              inputClassName={styles.selectFromDeviceButton}
              buttonClassName={styles.hiddenInput}
            />
          )}
        </div>
      </div>
      {imageFile && (
        <MediaUploadModal
          imageFile={imageFile}
          onClose={() => setImageFile(null)}
        />
      )}
    </>
  );
}
