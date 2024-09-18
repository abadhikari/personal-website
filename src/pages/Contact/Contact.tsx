import Link from '../../components/common/Link';
import * as styles from './styles/Contact.module.css';

export default function Contact() {
  return (
    <div className={styles.contact}>
      <h1>Contact Me</h1>
      <div className={styles.contactResourceContainer}>
        <div className={styles.contactResource}>
          <h2>Email</h2>
          <Link href="mailto:abhinna.adhikari.v1@gmail.com">
            abhinna.adhikari.v1@gmail.com
          </Link>
        </div>
        <div className={styles.contactResource}>
          <h2>Linkedin</h2>
          <Link href="https://www.linkedin.com/in/abhinna-adhikari-aba168187/">
            https://www.linkedin.com/in/abhinna-adhikari-aba168187/
          </Link>
        </div>
      </div>
    </div>
  );
}
