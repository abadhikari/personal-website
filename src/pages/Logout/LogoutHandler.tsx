import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, signOut } from '@aws-amplify/auth';

import AnimatedSpinner from '../../components/common/animations/AnimatedSpinner';
import log from '../../utils/logger';

import * as styles from './styles/logout.module.css';

/**
 * A logout handler component that signs the user out using AWS Amplify Auth.
 *
 * @component
 * @returns {JSX.Element} The logout UI with a "Signing out" message and spinner.
 */
export default function LogoutHandler() {
  const REDIRECT_HOME_TIMEOUT = 500;

  const navigate = useNavigate();

  useEffect(() => {
    const redirectHome = () => navigate('/');

    /**
     * Logs out the current user and redirects to the homepage.
     *
     * - If the user is authenticated, signs out and shows a success toast.
     * - If already signed out, shows an informational toast.
     * - On unexpected errors, logs the error and shows an error toast.
     */
    const logOut = async () => {
      try {
        await getCurrentUser();
        await signOut();
        setTimeout(() => {
          toast.success('Signed out successfully');
          redirectHome();
        }, REDIRECT_HOME_TIMEOUT);
      } catch (err) {
        const errorName = (err as Error)?.name || err?.toString();
        if (errorName === 'UserUnAuthenticatedException') {
          toast('You were already signed out.');
          redirectHome();
        } else {
          log.error('Failed to logout', err);
          toast.error('Failed to logout. Please try again.');
          setTimeout(() => redirectHome(), REDIRECT_HOME_TIMEOUT);
        }
      }
    };
    logOut();
  }, []);

  return (
    <div className={styles.logout}>
      <h2>Signing out&nbsp;</h2>
      <AnimatedSpinner className="spinner" />
    </div>
  );
}
