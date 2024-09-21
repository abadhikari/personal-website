import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as styles from './styles/Navbar.module.css';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdownMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdownMenu = () => {
    setIsOpen(false);
  };

  const getHamburgerIcon = () => {
    return isOpen ? '\u2715' : '\u2630';
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.hamburger} onClick={toggleDropdownMenu}>
        {getHamburgerIcon()}
      </div>
      <ul className={`${styles.navbarLinks} ${isOpen && styles.active}`}>
        <li>
          <Link to="/" onClick={closeDropdownMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={closeDropdownMenu}>
            About
          </Link>
        </li>
        <li>
          <Link to="/projects" onClick={closeDropdownMenu}>
            Projects
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={closeDropdownMenu}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
