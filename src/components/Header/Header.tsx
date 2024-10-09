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
          />
        </div>
        <NavBar />
      </div>
    </div>
  );
}
