import { useEffect, useRef, useState } from 'react';
import * as styles from '../../styles/ModalActionMenu.module.css';

interface Props {
  onDelete: () => void;
  setIsEditingStack: React.Dispatch<React.SetStateAction<boolean>>;
}

type MenuState = 'closed' | 'menu' | 'confirmDelete';

/**
 * ModalActionMenu provides a dropdown UI with edit and delete options for media stacks.
 *
 * @param {Function} onDelete - Function to call when confirming deletion.
 * @param {Function} setIsEditingStack - Setter to enable editing mode for the stack.
 *
 * Uses a simple state machine internally:
 * - 'closed': menu hidden
 * - 'menu': menu options visible
 * - 'confirmDelete': confirmation UI shown
 *
 * Handles closing on outside clicks and state transitions between delete/confirm/edit.
 */
export default function ModalActionMenu({
  onDelete,
  setIsEditingStack,
}: Props) {
  const [menuState, setMenuState] = useState<MenuState>('closed');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuState('closed');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = () => {
    onDelete();
    setMenuState('closed');
  };

  return (
    <div className={styles.modalActionMenu}>
      <button
        className={styles.menuButton}
        onClick={() =>
          setMenuState((prev) => (prev === 'closed' ? 'menu' : 'closed'))
        }
        type="button"
      >
        ⋯
      </button>

      {menuState !== 'closed' && (
        <div className={styles.dropdownMenu} ref={dropdownRef}>
          {menuState === 'confirmDelete' ? (
            <>
              <div className={styles.dropdownConfirmText}>Are you sure?</div>
              <button
                className={styles.dropdownDelete}
                onClick={handleDelete}
                type="button"
              >
                Yes, Delete
              </button>
              <button
                className={styles.dropdownDelete}
                onClick={() => setMenuState('menu')}
                type="button"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.dropdownDelete}
                onClick={() => setMenuState('confirmDelete')}
                type="button"
              >
                Delete
              </button>
              <button
                className={styles.dropdownEdit}
                onClick={() => {
                  setIsEditingStack(true);
                  setMenuState('closed');
                }}
                type="button"
              >
                Edit
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
