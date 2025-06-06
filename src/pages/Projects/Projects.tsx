import SocialsImage from '../../components/Footer/FooterLeft/SocialsImage';

import ProjectCard from './components/ProjectCard';
import TechStack from './components/TechStack';

import * as animationStyles from '../../styles/animations.module.css';
import * as styles from './styles/Projects.module.css';

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
        description={
          <p>
            Created a photos page on my website that has a tiled view similar to
            instagram and supports both photos and videos. See Photos Page
            <a href="https://abhinnaadhikari.com/photos"> here.</a>
          </p>
        }
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
      <ProjectCard
        title="Mojilang"
        image={{ src: '/assets/mojilang.jpg', altText: 'mojilang code' }}
        description={
          <p>
            Created a simple interpreted programming language that utilizes
            emojis and is built from scratch with a custom lexer, parser, and
            interpreter. My goal with Mojilang was to learn the basic inner
            workings of a programming language while also making a fun goofy
            programming language using emojis for common programming constructs
            like variables, loops, conditionals, and functions. It&apos;s
            written in python which is slow, but allowed me to quickly iterate
            and add features.
          </p>
        }
        additionalContents={
          <div className={styles.centralize}>
            <SocialsImage
              imageLink="https://github.com/abadhikari/MojiLang"
              hoveredSrc="./assets/githubLogoBlue.png"
              defaultSrc="./assets/githubLogoBlack.png"
              altText="Github Logo"
              width={30}
              height={30}
            />
          </div>
        }
      />
      <p className={styles.eyesText}>
        That&apos;s all for now! Keep an{' '}
        <span className={styles.eyes}>👁️👄👁️</span> out for future projects.
      </p>
    </div>
  );
}
