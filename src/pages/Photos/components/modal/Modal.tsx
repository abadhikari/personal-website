import { useState } from 'react';
import { MediaStack } from '../../types/mediaTypes';
import MediaRenderer from '../media/MediaRenderer';
import ModalActionMenu from './ModalActionMenu/ModalActionMenu';
import ViewType from '../../types/viewType';
import useAuth from '../../../../auth/useAuth';
import ModalWrapper from './ModalWrapper';
import useEditStack from './ModalActionMenu/useEditStack';
import useDeleteMedia from './ModalActionMenu/useDeleteMedia';
import BouncingText from '../../../../components/common/animations/BouncingText';
import * as styles from '../../styles/Modal.module.css';
import retrieveReadableDate from '../../../../utils/retrieveReadableDate';

interface ModalProps {
  mediaStacks: MediaStack[];
  selectedStackIndex: number;
  initialMediaIndex: number;
  onClose: () => void;
  setStacks: React.Dispatch<React.SetStateAction<MediaStack[]>>;
}

/**
 * Modal is the primary UI component for displaying a selected media stack.
 *
 * @param {MediaStack[]} mediaStacks - All available stacks with associated media.
 * @param {number} selectedStackIndex - Index of the currently focused stack.
 * @param {number} initialMediaIndex - Index of the initially focused media.
 * @param {Function} onClose - Function to call when closing the modal.
 * @param {Function} setStacks - State setter to update stack list (after edits/deletes).
 *
 * Uses:
 * - ModalContainer for layout and behavior
 * - useEditStack and useDeleteMedia hooks for logic abstraction
 * - MediaRenderer and ModalActionMenu for UI rendering
 *
 * @returns {JSX.Element} The fully rendered modal with editing and delete options.
 */
export default function Modal({
  mediaStacks,
  selectedStackIndex,
  initialMediaIndex,
  onClose,
  setStacks,
}: ModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const selectedStack = mediaStacks[selectedStackIndex];
  const [focusedMediaIndex] = useState(initialMediaIndex);
  const focusedMedia = selectedStack.media[focusedMediaIndex];
  const { isAuthenticated, token } = useAuth();

  const {
    isEditing,
    editedCaption,
    setEditedCaption,
    editedLocation,
    setEditedLocation,
    setIsEditing,
    saveEdit,
    isEdited,
  } = useEditStack({
    stack: selectedStack,
    selectedIndex: selectedStackIndex,
    setStacks,
    token,
    setIsProcessing,
  });

  const handleDeleteMedia = useDeleteMedia({
    selectedStack,
    selectedStackIndex,
    selectedMediaIndex: focusedMediaIndex,
    setStacks,
    token,
    onClose,
    setIsProcessing,
  });

  const uploadDate = new Date(selectedStack.stack.uploadTimestamp);

  return (
    <ModalWrapper onClose={onClose}>
      <div className={styles.modalMediaContainer}>
        <MediaRenderer
          media={focusedMedia}
          viewType={ViewType.MODAL}
          className={styles.fullSizeMedia}
        />
        <ModalActionMenu
          onDelete={handleDeleteMedia}
          setIsEditingStack={setIsEditing}
          stackId={selectedStack.stack.stackId}
          mediaId={focusedMedia.mediaId}
        />
      </div>
      <div className={styles.mediaDetails}>
        {isEditing ? (
          <textarea
            value={editedCaption}
            onChange={(e) => setEditedCaption(e.target.value)}
            className={styles.editCaptionInput}
            rows={3}
          />
        ) : (
          <h2>{selectedStack.stack.caption}</h2>
        )}
        <div className="divider" />
        <div className={styles.metadataContainer}>
          {isEditing ? (
            <div className={styles.location}>
              <img src="./assets/locationIcon.png" alt="Location Icon" />
              <p>&nbsp;</p>
              <input
                type="text"
                value={editedLocation}
                onChange={(e) => setEditedLocation(e.target.value)}
                className={styles.editLocationInput}
              />
            </div>
          ) : (
            selectedStack.stack.location && (
              <div className={styles.location}>
                <img src="./assets/locationIcon.png" alt="Location Icon" />
                <p>&nbsp;</p>
                <p>{selectedStack.stack.location}</p>
              </div>
            )
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
            <p>
              {retrieveReadableDate(
                selectedStack.stack.stackId,
                selectedStack.stack.uploadTimestamp
              )}
            </p>
          </div>
          {isAuthenticated && isEditing && (
            <div className={styles.editControls}>
              <button
                type="button"
                onClick={saveEdit}
                className={`${styles.editButton} ${styles.saveButton}`}
                disabled={!isEdited || isProcessing}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className={styles.editButton}
              >
                Cancel
              </button>
            </div>
          )}
          {isProcessing && (
            <BouncingText text="..." className="loadingOverlay" />
          )}
        </div>
      </div>
      <button
        className={styles.closeModalButton}
        onClick={onClose}
        type="button"
      >
        ✕
      </button>
    </ModalWrapper>
  );
}
