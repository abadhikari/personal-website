import * as styles from './styles/Navbar.module.css';
import Logo from '../Logo/Logo';

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Logo />
        <ul className={styles.navbarMenu}>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
