import * as styles from './styles/Header.module.css';
import Logo from '../Logo/Logo';
import NavBar from './Navbar/Navbar';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <Logo />
        <NavBar />
      </div>
    </div>
  );
}
