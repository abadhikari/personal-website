import { useEffect, useRef, useState } from 'react';
import { MediaStack } from '../types';
import * as styles from '../styles/Photos.module.css';
import * as animationStyles from '../../../styles/animations.module.css';
import MediaRenderer from './MediaRenderer';
import ModalActionMenu from './ModalActionMenu';
import ViewType from '../viewType';
import useAuth from '../../../auth/useAuth';
import deleteMedia from '../deleteMedia';

interface ModalProps {
  mediaStacks: MediaStack[];
  selectedStackIndex: number;
  onClose: () => void;
  setStacks: React.Dispatch<React.SetStateAction<MediaStack[]>>;
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
export default function Modal({
  mediaStacks,
  selectedStackIndex,
  onClose,
  setStacks,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const selectedStack = mediaStacks[selectedStackIndex];
  const { isAuthenticated, token } = useAuth();
  const [focusedMediaIndex] = useState<number>(0);
  const focusedMedia = selectedStack.media[focusedMediaIndex];

  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleDeleteMedia = async () => {
    try {
      const { mediaId } = focusedMedia;
      await deleteMedia({
        stackId: selectedStack.stack.stackId,
        mediaId,
        token,
      });
      setStacks((prev) => {
        const newStacks = [...prev];
        const stack = { ...newStacks[selectedStackIndex] };
        stack.media = stack.media.filter((m) => m.mediaId !== mediaId);

        if (stack.media.length === 0) {
          newStacks.splice(selectedStackIndex, 1);
          onClose();
        } else {
          newStacks[selectedStackIndex] = stack;
        }

        return newStacks;
      });
    } catch (err) {
      console.error('Failed to delete media:', err);
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

  const uploadDate = new Date(selectedStack.stack.uploadTimestamp);

  return (
    <div
      className={`${styles.modalOverlay} ${animationStyles.backdropFade}`}
      role="button"
      tabIndex={0}
      onMouseDown={handleClickOutside}
    >
      <div ref={modalRef} className={styles.modalContent}>
        <div className={styles.modalMediaContainer}>
          <MediaRenderer
            media={focusedMedia}
            viewType={ViewType.MODAL}
            className={styles.fullSizeMedia}
          />
          {isAuthenticated && (
            <ModalActionMenu
              onDelete={() => {
                handleDeleteMedia();
              }}
            />
          )}
        </div>
        <div className={styles.photoDetails}>
          <h2>{selectedStack.stack.caption}</h2>
          <div className="divider" />
          <div className={styles.metadataContainer}>
            {selectedStack.stack.location && (
              <div className={styles.location}>
                <img src="./assets/locationIcon.png" alt="Location Icon" />
                <p>&nbsp;</p>
                <p>{selectedStack.stack.location}</p>
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
