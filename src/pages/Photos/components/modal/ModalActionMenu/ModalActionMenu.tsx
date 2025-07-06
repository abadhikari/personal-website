import { useRef, useState } from 'react';

import useAuth from '../../../../../auth/useAuth';
import useCloseOnOutsideClick from '../../../../../hooks/useCloseOnOutsideClick';

import useShareLink from './useShareLink';

import * as styles from '../../../styles/ModalActionMenu.module.css';

interface ModalActionMenuProps {
  stackId: string;
  mediaId: string;
  onDelete: () => void;
  setIsEditingStack: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * UI state for the ModalActionMenu component.
 *
 * Represents a basic state machine:
 * - 'closed': Menu is hidden.
 * - 'menu': Menu options (edit, delete, share) are visible.
 * - 'confirmDelete': Delete confirmation UI is shown.
 */
export const ModalActionMenuStates = {
  Closed: 'closed',
  Menu: 'menu',
  ConfirmDelete: 'confirmDelete',
} as const;

export type ModalActionMenuState =
  (typeof ModalActionMenuStates)[keyof typeof ModalActionMenuStates];

/**
 * ModalActionMenu provides a dropdown UI with edit, delete, and share options for media stacks.
 *
 * @param {string} stackId - Identifier of the stack focused in the Modal.
 * @param {string} mediaId - Identifier of the media focused in the Modal.
 * @param {Function} onDelete - Function to call when confirming deletion.
 * @param {Function} setIsEditingStack - Setter to enable editing mode for the stack.
 */
export default function ModalActionMenu({
  stackId,
  mediaId,
  onDelete,
  setIsEditingStack,
}: ModalActionMenuProps) {
  const [menuState, setMenuState] = useState<ModalActionMenuState>(
    ModalActionMenuStates.Closed
  );
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { isAuthenticated } = useAuth();

  const { handleCopy } = useShareLink({
    stackId,
    mediaId,
  });

  // Close menu when clicking outside
  useCloseOnOutsideClick(dropdownRef, () =>
    setMenuState(ModalActionMenuStates.Closed)
  );

  return (
    <div className={styles.modalActionMenu}>
      <button
        className={styles.menuButton}
        onClick={() =>
          setMenuState((prev) =>
            prev === ModalActionMenuStates.Closed
              ? ModalActionMenuStates.Menu
              : ModalActionMenuStates.Closed
          )
        }
        type="button"
      >
        ⋯
      </button>

      {menuState !== ModalActionMenuStates.Closed && (
        <div className={styles.dropdownMenu} ref={dropdownRef}>
          {menuState === ModalActionMenuStates.ConfirmDelete ? (
            <>
              <div className={styles.dropdownConfirmText}>Are you sure?</div>
              <button
                className={styles.dropdownDelete}
                onClick={() => {
                  onDelete();
                  setMenuState(ModalActionMenuStates.Closed);
                }}
                type="button"
              >
                Yes, Delete
              </button>
              <button
                className={styles.dropdownDelete}
                onClick={() => setMenuState(ModalActionMenuStates.Menu)}
                type="button"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.dropdownShare}
                onClick={() => {
                  handleCopy();
                  setMenuState(ModalActionMenuStates.Closed);
                }}
                type="button"
              >
                Share
              </button>
              {isAuthenticated() && (
                <>
                  <button
                    className={styles.dropdownEdit}
                    onClick={() => {
                      setIsEditingStack(true);
                      setMenuState(ModalActionMenuStates.Closed);
                    }}
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    className={styles.dropdownDelete}
                    onClick={() =>
                      setMenuState(ModalActionMenuStates.ConfirmDelete)
                    }
                    type="button"
                  >
                    Delete
                  </button>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
