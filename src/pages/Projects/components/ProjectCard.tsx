import { ReactNode } from 'react';
import * as styles from '../styles/Projects.module.css';

interface ProjectCardProps {
  title: string;
  image: {
    src: string;
    altText: string;
  };
  description: string;
  contents: ReactNode;
}

/**
 * ProjectCard Component
 *
 * A reusable card component to display project information, including an image,
 * description, and custom contents (e.g., tech stack or other details).
 *
 * @param {string} title - The title of the project.
 * @param {object} image - An object containing the source and alt text of the project image.
 * @param {string} image.src - The URL source of the image to display in the card.
 * @param {string} image.altText - The alt text for the image, used for accessibility and SEO.
 * @param {string} description - A brief description of the project.
 * @param {ReactNode} contents - Additional content to be displayed in the card, such as
 * a list of frontend and backend technologies used, or any other JSX element.
 * @returns {JSX.Element} A styled card component displaying the project information.
 */
export default function ProjectCard({
  title,
  image,
  description,
  contents,
}: ProjectCardProps) {
  return (
    <div className={styles.projectCard}>
      <div className={styles.projectCardImage}>
        <img src={image.src} alt={image.altText} />
      </div>
      <div className={styles.projectCardContents}>
        <h2>{title}</h2>
        <div className={styles.projectCardContentsDescription}>
          <p>{description}</p>
        </div>
        {contents}
      </div>
    </div>
  );
}
