/* eslint-disable react/no-unescaped-entities */
import Logo from '../../Logo/Logo';
import SocialsImage from './SocialsImage';
import * as styles from './styles/FooterLeft.module.css';

export default function FooterLeft() {
  return (
    <div>
      <Logo />

      <div className={styles.footerQuote}>
        <p className={styles.footerQuoteText}>
          {' '}
          “Greatness is a transitory experience. It is never consistent. It
          depends in part upon the myth-making imagination of humankind. The
          person who experiences greatness must have a feeling for the myth he
          in. He must reflect what is projected upon him. And he must have a
          strong sense of the sardonic. This is what uncouples him from belief
          in his own pretensions. The sardonic is all that permits him to move
          within himself. Without this quality, even occasional greatness will
          destroy a man.”{' '}
        </p>
        <p className={styles.footerQuoteReference}>
          --- FROM "COLLECTED SAYINGS OF MUAD'DIB"
        </p>
        <p className={styles.footerQuoteReference}>BY THE PRINCESS IRULAN</p>
        <p className={styles.footerQuoteReference}>Frank Herbert, Dune</p>
      </div>

      <ul className={styles.footerSocials}>
        <li>
          <SocialsImage
            imageLink="https://github.com/abadhikari"
            hoveredSrc="./assets/githubLogoBlue.png"
            defaultSrc="./assets/githubLogoWhite.png"
            altText="Github Logo"
            width={35}
            height={35}
          />
        </li>
        <li>
          <SocialsImage
            imageLink="https://www.linkedin.com/in/abhinna-adhikari-aba168187/"
            hoveredSrc="/assets/linkedinLogoBlue.png"
            defaultSrc="/assets/linkedinLogoWhite.png"
            altText="Linkedin Logo"
            width={30}
            height={30}
          />
        </li>
        <li>
          <SocialsImage
            imageLink="https://x.com/ya_binya"
            hoveredSrc="/assets/twitterLogoBlue.png"
            defaultSrc="/assets/twitterLogoWhite.png"
            altText="Twitter Logo"
            width={30}
            height={30}
          />
        </li>
      </ul>
    </div>
  );
}
