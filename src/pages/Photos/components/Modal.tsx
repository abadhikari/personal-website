import { useEffect, useRef } from 'react';
import { MediaStack } from '../types';
import * as styles from '../styles/Photos.module.css';
import MediaRenderer from './MediaRenderer';
import ViewType from '../viewType';

interface ModalProps {
  mediaStack: MediaStack;
  onClose: () => void;
}

/**
 * A component for displaying detailed media content in a modal view.
 * This component renders a full-sized media item along with its metadata
 * (e.g., caption, location, timestamp) and prevents scrolling of the body
 * when the modal is active.
 *
 * @param {MediaStack} props.mediaStack - Contains the media stack and associated metadata to be displayed in the modal.
 * @param {() => void} props.onClose - Callback function triggered when the modal is closed.
 * @returns {JSX.Element} The rendered modal component.
 */
export default function Modal({ mediaStack, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    // Prevent scrolling when the modal is rendered
    document.body.classList.add('no-scroll');

    // Clean up the effect when the modal is removed
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const uploadDate = new Date(mediaStack.stack.uploadTimestamp);

  return (
    <div
      className={styles.modalOverlay}
      role="button"
      tabIndex={0}
      onMouseDown={handleClickOutside}
    >
      <div ref={modalRef} className={styles.modalContent}>
        <MediaRenderer
          media={mediaStack.media[0]}
          viewType={ViewType.MODAL}
          className={styles.fullSizeMedia}
        />
        <div className={styles.photoDetails}>
          <h2>{mediaStack.stack.caption}</h2>
          <div className="divider" />
          <div className={styles.metadataContainer}>
            {mediaStack.stack.location && (
              <div className={styles.location}>
                <img src="./assets/locationIcon.png" alt="Location Icon" />
                <p>&nbsp;</p>
                <p>{mediaStack.stack.location}</p>
              </div>
            )}
            <div className={styles.timestamp}>
              <img src="./assets/uploadIcon.png" alt="Upload Icon" />
              <p>&nbsp;</p>
              <p>
                {uploadDate.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p>&nbsp;·&nbsp;</p>
              <p>{uploadDate.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <button className={styles.closeButton} onClick={onClose} type="button">
          ✕
        </button>
      </div>
    </div>
  );
}
