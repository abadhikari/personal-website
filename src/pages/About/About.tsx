import Link from '../../components/common/Link';

import * as animationStyles from '../../styles/animations.module.css';
import * as styles from './styles/About.module.css';

export default function About() {
  return (
    <div className={`${styles.about} ${animationStyles.fadeInUp}`}>
      <div className={`${styles.aboutPhoto}`}>
        <img src="/assets/stupidFace.jpg" alt="Me making a stupid face" />
      </div>
      <div className={`${styles.aboutInfo}`}>
        <h1>
          <span className={animationStyles.strike}>A Little</span> About Me
        </h1>
        <div className="divider" />
        <ul>
          <li>
            I was born in Nepal🇳🇵 and moved to the US when I was 4 years old.
          </li>
          <li>I currently live in New York City🗽.</li>
          <li>I work at Amazon as a Software Engineer🧑‍💻.</li>
          <li>I grew up in Massachusetts and went to school at UConn.</li>
          <li>
            I&apos;m a self-taught piano enthusiast, enjoy playing chess{' '}
            <Link href="https://www.chess.com/">♛</Link>, and recently have
            gotten back into running and reading (currently reading Blood
            Meridian).
          </li>
          <li>
            I&apos;m a huge fan of soccer⚽ (Manchester United) and have been
            playing since a kid.
          </li>
          <li>
            I love anything produced by HBO and MAPPA. Nathan for you,
            Succession, and HxH are my favorite shows of all time.
          </li>
          <li>
            Bonus: Here&apos;s your reward for patiently reading everything
            -&gt;
            <Link href="https://www.youtube.com/watch?v=Kagw_DHxCAA">
              {' '}
              <span className={styles.aboutInfoMysteryLink}> Mystery Link</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
