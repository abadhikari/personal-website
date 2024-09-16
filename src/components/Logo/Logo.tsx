import * as styles from './styles/Logo.module.css';

export default function Logo() {
  return (
    <a href="/" className={styles.logo}>
      <p className={styles.logoLeft}>Abhinna</p>
      <p className={styles.logoRight}>Adhikari.</p>
    </a>
  );
}
