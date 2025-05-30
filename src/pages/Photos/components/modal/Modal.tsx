import { useState } from 'react';
import { MediaStack } from '../../types/mediaTypes';
import MediaRenderer from '../media/MediaRenderer';
import ModalActionMenu from './ModalActionMenu';
import ViewType from '../../types/viewType';
import useAuth from '../../../../auth/useAuth';
import ModalWrapper from './ModalWrapper';
import useEditStack from './useEditStack';
import useDeleteMedia from './useDeleteMedia';
import * as styles from '../../styles/Modal.module.css';

interface ModalProps {
  mediaStacks: MediaStack[];
  selectedStackIndex: number;
  onClose: () => void;
  setStacks: React.Dispatch<React.SetStateAction<MediaStack[]>>;
}

/**
 * Modal is the primary UI component for displaying a selected media stack.
 *
 * @param {MediaStack[]} mediaStacks - All available stacks with associated media.
 * @param {number} selectedStackIndex - Index of the currently focused stack.
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
  onClose,
  setStacks,
}: ModalProps) {
  const selectedStack = mediaStacks[selectedStackIndex];
  const [selectedMediaIndex] = useState(0);
  const focusedMedia = selectedStack.media[0];
  const { isAuthenticated, token } = useAuth();

  const {
    isEditing,
    editedCaption,
    setEditedCaption,
    editedLocation,
    setEditedLocation,
    setIsEditing,
    saveEdit,
  } = useEditStack({
    stack: selectedStack,
    selectedIndex: selectedStackIndex,
    setStacks,
    token,
  });

  const handleDeleteMedia = useDeleteMedia({
    selectedStack,
    selectedStackIndex,
    selectedMediaIndex,
    setStacks,
    token,
    onClose,
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
        {isAuthenticated && (
          <ModalActionMenu
            onDelete={handleDeleteMedia}
            setIsEditingStack={setIsEditing}
          />
        )}
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
            <p>{uploadDate.toLocaleDateString()}</p>
          </div>
          {isAuthenticated && isEditing && (
            <div className={styles.editControls}>
              <button
                type="button"
                onClick={saveEdit}
                className={`${styles.editButton} ${styles.saveButton}`}
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
