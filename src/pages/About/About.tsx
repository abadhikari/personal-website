import Link from '../../components/common/Link';
import * as styles from './styles/About.module.css';

export default function About() {
  return (
    <div className={styles.about}>
      <div className={styles.aboutPhoto}>
        <img
          src="/assets/photoWithMum.png"
          alt="Me with my mom at Brooklyn bridge"
        />
      </div>
      <div className={styles.aboutInfo}>
        <h1>
          <span className={styles.strike}>A Little</span> About Me
        </h1>
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
            gotten back into running and reading (currently reading Don
            Quixote).
          </li>
          <li>
            I&apos;m a huge fan of soccer⚽ (Manchester United) and have been
            playing since a kid.
          </li>
          <li>
            I love anything produced by HBO and MAPPA. Nathan for you and HxH
            are my favorite shows of all time.
          </li>
          <li>
            Bonus: Here&apos;s your reward for patiently reading everything
            <img
              src="/assets/childhoodPhoto.png"
              alt="Me when I was a cute kid wearing a red turtlekneck."
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
