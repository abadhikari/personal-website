import SimpleAudioPlayer from '../common/ExtremelySimpleAudioPlayer';
import Logo from '../Logo/Logo';

import NavBar from './Navbar/Navbar';

import * as styles from './styles/Header.module.css';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <Logo />
        <div className={styles.audioPlayerContainer}>
          <SimpleAudioPlayer
            src="/assets/tangerine.mp3"
            initialVolume={0.3}
            className={styles.audioButton}
          />
        </div>
        <NavBar />
      </div>
    </div>
  );
}
