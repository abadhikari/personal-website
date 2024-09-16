import * as styles from './styles/Footer.module.css';
import FooterLeft from './FooterLeft/FooterLeft';
import FooterRight from './FooterRight/FooterRight';
import FooterBottom from './FooterBottom/FooterBottom';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerTopContainer}>
          <div className={styles.footerLeftContainer}>
            <FooterLeft />
          </div>
          <div className={styles.footerRightContainer}>
            <FooterRight />
          </div>
        </div>
        <div className={styles.footerBottomContainer}>
          <FooterBottom />
        </div>
      </div>
    </div>
  );
}
