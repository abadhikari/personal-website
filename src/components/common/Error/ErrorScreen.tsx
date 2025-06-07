import { useNavigate } from 'react-router-dom';

import * as animationStyles from '../../../styles/animations.module.css';
import * as styles from './styles/error.module.css';

interface ErrorScreenProps {
  message?: string;
}

/**
 * Displays a generic error screen with an optional custom message.
 * Includes a "Go Home" button that navigates to the homepage.
 *
 * Props:
 * - message (optional): A specific error message to display. If not provided, a default message is shown.
 */
export default function ErrorScreen({ message }: ErrorScreenProps) {
  const navigate = useNavigate();

  return (
    <div className={`${styles.error} ${animationStyles.fadeInUp}`}>
      <h1 className={styles.title}>Something went wrong.</h1>
      <p className={styles.message}>
        {message ?? 'An unexpected error occurred. Please try again later.'}
      </p>
      <div className={styles.buttonGroup}>
        <button
          onClick={() => navigate('/')}
          type="button"
          className={styles.homeButton}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
