import * as styles from '../styles/Login.module.css';

interface LoginFormProps {
  password: string;
  username: string;
  onPasswordChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  handleLogin: (e: React.FormEvent) => void;
}

/**
 * A login form component that allows users to enter their credentials.
 *
 * @component
 * @param {LoginFormProps} props - The props for the component.
 * @returns {JSX.Element} The rendered login form.
 */
export default function LoginForm({
  password,
  username,
  onPasswordChange,
  onUsernameChange,
  handleLogin,
}: LoginFormProps) {
  return (
    <form className={styles.loginForm} onSubmit={handleLogin}>
      <label htmlFor="username">
        Username:
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          autoComplete="off"
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          autoComplete="off"
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
