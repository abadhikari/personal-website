// ModalActionMenu.tsx
import { useEffect, useRef, useState } from 'react';
import * as styles from '../styles/Photos.module.css';

interface Props {
  onDelete: () => void;
}

export default function ModalActionMenu({ onDelete }: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
        setConfirmingDelete(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.modalActionMenu}>
      <button
        className={styles.menuButton}
        onClick={() => setShowMenu((prev) => !prev)}
        type="button"
      >
        ⋯
      </button>
      {showMenu && (
        <div className={styles.dropdownMenu} ref={dropdownRef}>
          {confirmingDelete ? (
            <>
              <div className={styles.dropdownConfirmText}>Are you sure?</div>
              <button
                className={styles.dropdownDelete}
                type="button"
                onClick={() => {
                  onDelete();
                  setShowMenu(false);
                  setConfirmingDelete(false);
                }}
              >
                Yes, Delete
              </button>
              <button
                className={styles.dropdownDelete}
                type="button"
                onClick={() => setConfirmingDelete(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className={styles.dropdownDelete}
              type="button"
              onClick={() => setConfirmingDelete(true)}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
