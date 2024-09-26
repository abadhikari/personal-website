import * as styles from './styles/Home.module.css';
import * as animationStyles from '../../styles/animations.module.css';

export default function Home() {
  return (
    <div className={`${styles.home} ${animationStyles.fadeInUp}`}>
      <div className={styles.homePaintingContainer}>
        <div className={styles.homePainting}>
          <img
            src="./assets/melodyOfTheNight.jpg"
            alt="Melody of the Night Painting"
          />
          <div className={styles.paintingOverlay}>
            <h2>Melody of the Night by Leonid Afremov</h2>
            <p>
              I first discovered this painting when searching for a poster in
              college, and ever since then, I&apos;ve kept a version of it
              hanging in my room. The vibrant colors, textured strokes, and
              blurred reflections on the rain-soaked ground invoke a deep sense
              of calm that makes this one of my favorite paintings.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.homeText}>
        <h1 className={styles.welcome}>
          Welcome!<span className={styles.wavingHand}>👋</span>
        </h1>
        <p>
          This website gives a little glimpse into who I am and what I&apos;ve
          been working on. You&apos;ll find the following here:
        </p>
        <ul>
          <li>Projects</li>
          <li>Photography</li>
          <li>Writing</li>
          <li>Drawings</li>
          <li>Reviews</li>
        </ul>
      </div>
    </div>
  );
}
