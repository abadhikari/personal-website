import { useEffect, useRef } from 'react';
import * as styles from '../../styles/Modal.module.css';
import * as animationStyles from '../../../../styles/animations.module.css';

interface ModalWrapperProps {
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * ModalWrapper wraps modal content with outside click handling and scroll locking behavior.
 *
 * @param {Function} onClose - Callback fired when clicking outside the modal to close it.
 * @param {React.ReactNode} children - The modal content to display inside the wrapper.
 *
 * @returns {JSX.Element} The modal overlay and wrapper content.
 */
export default function ModalWrapper({ onClose, children }: ModalWrapperProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className={`${styles.modalOverlay} ${animationStyles.backdropFade}`}
      onMouseDown={handleClickOutside}
      role="button"
      tabIndex={0}
    >
      <div ref={modalRef} className={styles.modalContent}>
        {children}
      </div>
    </div>
  );
}
