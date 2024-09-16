import { Link } from 'react-router-dom';
import * as styles from './styles/FooterRight.module.css';

export default function FooterRight() {
  return (
    <div>
      <h2>Information</h2>
      <ul className={styles.footerMenu}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
}
