import * as styles from './styles/Projects.module.css';
import * as animationStyles from '../../styles/animations.module.css';

export default function Projects() {
  return (
    <div className={`${styles.projects} ${animationStyles.fadeInUp}`}>
      <h1>My Projects</h1>
      <div className="divider" />
      <p>
        Keep an <span className={styles.eyes}>👁️👄👁️</span> out for future
        projects.
      </p>
    </div>
  );
}
