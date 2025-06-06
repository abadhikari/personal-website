import { useEffect, useRef, useState } from 'react';

import FileInput from './components/FileInput';
import MediaPreview from './components/MediaPreview';
import MetadataForm, { ImageMetadata } from './components/MetadataForm';
import UploadStatus from './components/UploadStatus';
import { uploadImage } from './uploadImage';

import * as animationStyles from '../../styles/animations.module.css';
import * as styles from './styles/Upload.module.css';

/**
 * A component for handling the media upload process. It includes functionality for:
 * - Selecting an media file from the user’s device.
 * - Displaying a preview of the selected media.
 * - Collecting metadata (e.g., caption, alt text, location) for the media.
 * - Uploading the media along with its metadata to the server.
 * - Providing upload status feedback to the user.
 *
 * @returns {JSX.Element} The rendered upload component.
 */
export default function Upload() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageMetadata, setImageMetadata] = useState<ImageMetadata>({
    caption: '',
    altText: '',
    location: '',
  });
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [videoCurrentTime, setVideoCurrentTime] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const SUCCESS_PAGE_RESET_TIME = 60000;

  const handleFileSelect = (file: File) => {
    setImageFile(file);
  };

  const handleMetadataChange = (field: keyof ImageMetadata, value: string) => {
    setImageMetadata((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetPage = () => {
    window.location.reload();
  };

  const handleUploadClick = async () => {
    if (!imageFile) {
      alert('Please select a file first.');
      return;
    }
    if (!imageMetadata.altText) {
      alert('Please add an altText');
      return;
    }
    if (!imageMetadata.caption) {
      alert('Please add an caption');
      return;
    }

    try {
      setUploadStatus('Uploading...');
      await uploadImage(imageFile, '1', imageMetadata, videoCurrentTime);
      setUploadStatus(`File uploaded successfully!`);
      timerRef.current = setTimeout(() => {
        resetPage();
      }, SUCCESS_PAGE_RESET_TIME);
    } catch (error) {
      console.error('Failed to upload image:', error);
      setUploadStatus('Error uploading file. Please try again.');
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className={`${styles.upload} ${animationStyles.fadeInUp}`}>
      <h1>Upload Photos</h1>
      <div className={styles.uploadContainer}>
        {!imageFile && (
          <FileInput
            onFileSelect={handleFileSelect}
            inputClassName={styles.selectFromDeviceButton}
            buttonClassName={styles.hiddenInput}
          />
        )}
        {imageFile && (
          <div className={styles.uploadPreview}>
            <MediaPreview
              file={imageFile}
              onCurrentTimeChange={setVideoCurrentTime}
            />
            {imageFile.type.includes('video') && (
              <p>Video Thumbnail Time: {videoCurrentTime} seconds </p>
            )}
            <p>File Size: {(imageFile.size / (1024 * 1024)).toFixed(2)} MB</p>
            <p>File Type: {imageFile.type}</p>
            <MetadataForm
              metadata={imageMetadata}
              divClassName={styles.imageMetadata}
              onMetadataChange={handleMetadataChange}
            />
            <button type="button" onClick={handleUploadClick}>
              Upload Image
            </button>
            {uploadStatus && <UploadStatus status={uploadStatus} />}
          </div>
        )}
      </div>
    </div>
  );
}
