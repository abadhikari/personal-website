import * as styles from './styles/Projects.module.css';
import * as animationStyles from '../../styles/animations.module.css';
import ProjectCard from './components/ProjectCard';
import Stack from './components/Stack';

export default function Projects() {
  return (
    <div className={`${styles.projects} ${animationStyles.fadeInUp}`}>
      <h1>My Projects</h1>
      <div className="divider" />
      <ProjectCard
        title="Photos Page"
        image={{ src: '/assets/photosPage.jpg', altText: 'photos Page' }}
        description="Created a photos page on my website that has a tiled view similar to instagram and supports both photos and videos."
        contents={
          <Stack
            frontend={['Typescript', 'React']}
            backend={[
              'Typescript',
              'AWS Lambda',
              'AWS Cloudfront',
              'AWS S3',
              'AWS Cognito',
              'AWS CDK',
              'AWS API Gateway',
            ]}
          />
        }
      />
      <p>
        Keep an <span className={styles.eyes}>👁️👄👁️</span> out for future
        projects.
      </p>
    </div>
  );
}
