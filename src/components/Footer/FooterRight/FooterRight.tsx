import * as styles from './styles/FooterRight.module.css';

export default function FooterRight() {
  return (
    <div>
      <h2>Information</h2>
      <ul className={styles.footerMenu}>
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
  );
}
