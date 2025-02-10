import * as styles from './styles/Projects.module.css';
import * as animationStyles from '../../styles/animations.module.css';
import ProjectCard from './components/ProjectCard';
import TechStack from './components/TechStack';

/**
 * Projects Page Component
 *
 * Displays a list of personal projects, showcasing descriptions, images, and technology stacks.
 *
 * @component
 * @returns {JSX.Element} A section displaying project cards with relevant information.
 */
export default function Projects() {
  return (
    <div className={`${styles.projects} ${animationStyles.fadeInUp}`}>
      <h1>My Projects</h1>
      <div className="divider" />
      <ProjectCard
        title="Photos Page"
        image={{ src: '/assets/photosPage.jpg', altText: 'photos Page' }}
        description="Created a photos page on my website that has a tiled view similar to instagram and supports both photos and videos."
        additionalContents={
          <TechStack
            frontend={{
              technologies: ['Typescript', 'React'],
              githubLink:
                'https://github.com/abadhikari/personal-website/tree/main/src/pages/Photos',
            }}
            backend={{
              technologies: [
                'Typescript',
                'AWS CDK',
                'AWS Lambda',
                'AWS Cloudfront',
                'AWS S3',
                'AWS Cognito',
                'AWS API Gateway',
              ],
              githubLink:
                'https://github.com/abadhikari/personal-website-cdk/blob/main/lib/stacks/photos-page-stack.ts',
            }}
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
