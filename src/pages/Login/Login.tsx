import { useState } from 'react';
import { signIn } from '@aws-amplify/auth';

import AnimatedSpinner from '../../components/common/animations/AnimatedSpinner';
import useAuthRedirect from '../../hooks/useRedirect';

import LoginForm from './components/LoginForm';

import * as animationStyles from '../../styles/animations.module.css';
import * as styles from './styles/Login.module.css';

/**
 * A login page component that allows users to enter credentials and sign in using AWS Amplify.
 *
 * @component
 * @returns {JSX.Element} The login page UI.
 */
export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const { navigate, from } = useAuthRedirect();

  /**
   * Handles form submission authenticating with AWS Amplify,
   * and navigating to the intended destination on success.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn({ username, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError((err as Error).message || 'Failed to login.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <AnimatedSpinner className="spinnerBlack" />;
  }

  return (
    <div className={`${styles.login} ${animationStyles.fadeInUp}`}>
      <LoginForm
        username={username}
        password={password}
        onPasswordChange={setPassword}
        onUsernameChange={setUsername}
        handleLogin={handleLogin}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
}
