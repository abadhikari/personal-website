import { useState } from 'react';

import AnimatedSpinner from '../../../../components/common/animations/AnimatedSpinner';
import ModalWrapper from '../../../../components/common/Modal/ModalWrapper';
import useImageMetadata from '../hooks/useImageMetadata';
import useImageUploadHandler from '../hooks/useImageUploadHandler';

import MediaPreview from './MediaPreview';
import MetadataForm from './MetadataForm';

import * as styles from '../../styles/UploadMedia.module.css';

interface MediaUploadModalProps {
  imageFile: File;
  onClose: () => void;
}

/**
 * Renders a modal interface for previewing and uploading a media file.
 *
 * Features:
 * - Displays image or video preview
 * - Tracks video playback time to use as thumbnail timestamp
 * - Collects metadata (caption, alt text, location)
 * - Submits file and metadata via `useImageUploadHandler`
 *
 * @param {File} imageFile - The selected file to upload
 * @param {() => void} onClose - Callback to close the modal and reset state
 *
 * @returns {JSX.Element} Modal layout with media and metadata form
 */
export default function MediaUploadModal({
  imageFile,
  onClose,
}: MediaUploadModalProps) {
  const { imageMetadata, handleMetadataChange } = useImageMetadata();
  const [videoCurrentTime, setVideoCurrentTime] = useState<number>(0);
  const { isUploading, upload } = useImageUploadHandler({
    file: imageFile,
    metadata: imageMetadata,
    videoTime: videoCurrentTime,
  });

  return (
    <ModalWrapper onClose={onClose}>
      <div className={styles.uploadPreview}>
        <MediaPreview
          file={imageFile}
          onCurrentTimeChange={setVideoCurrentTime}
          className={styles.fullSizeMedia}
        />
      </div>
      <div className={styles.uploadDetails}>
        <div className={styles.uploadFileDetails}>
          {imageFile.type.includes('video') && (
            <p>Video Thumbnail Time: {videoCurrentTime.toFixed(2)} seconds </p>
          )}
          <p>File Type: {imageFile.type}</p>
          <p>File Size: {(imageFile.size / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
        <MetadataForm
          metadata={imageMetadata}
          className={styles.imageMetadata}
          onMetadataChange={handleMetadataChange}
        />
        <button type="button" className={styles.uploadButton} onClick={upload}>
          Upload Image
        </button>
        {isUploading && (
          <div className="loadingOverlay">
            <AnimatedSpinner />
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}
