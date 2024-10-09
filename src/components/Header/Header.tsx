import * as styles from './styles/Header.module.css';
import Logo from '../Logo/Logo';
import NavBar from './Navbar/Navbar';
import SimpleAudioPlayer from '../common/ExtremelySimpleAudioPlayer';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <Logo />
        <div className={styles.audioPlayerContainer}>
          <SimpleAudioPlayer
            src="/assets/Debussy - Arabesque No. 1 (Jazz Version) by Jacob Dupre.mp3"
            initialVolume={0.3}
            className={styles.audioButton}
            link="https://www.youtube.com/watch?v=42FmgGpWQis&list=PLw7XQgISZIIAdy6JOrCQjO1klWhzz7j4V&index=3"
            redirectTimeSecs={2}
          />
        </div>
        <NavBar />
      </div>
    </div>
  );
}
