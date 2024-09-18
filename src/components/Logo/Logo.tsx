import Link from '../common/Link';
import * as styles from './styles/Logo.module.css';

export default function Logo() {
  return (
    <Link href="/" className={styles.logo} target="">
      <p className={styles.logoLeft}>Abhinna</p>
      <p className={styles.logoRight}>Adhikari.</p>
    </Link>
  );
}
