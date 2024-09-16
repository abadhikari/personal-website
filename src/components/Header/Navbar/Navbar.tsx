import { Link } from 'react-router-dom';
import * as styles from './styles/Navbar.module.css';

export default function NavBar() {
  return (
    <ul className={styles.navbar}>
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
  );
}
