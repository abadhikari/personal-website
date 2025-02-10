import { ReactNode } from 'react';
import * as styles from '../styles/Projects.module.css';

/**
 * Interface representing the props for the ProjectCard component.
 *
 * @interface TechStackProps
 * @property {string} title - The title of the project.
 * @property {object} image - An object containing the source and alt text of the project image.
 * @property {string} image.src - The URL source of the image to display in the card.
 * @property {string} image.altText - The alt text for the image, used for accessibility and SEO.
 * @property {ReactNode} description - A brief description of the project.
 * @property {ReactNode} additionalContents - Additional content to be displayed in the card, such as
 * a list of frontend and backend technologies used, or any other JSX element.
 */
interface ProjectCardProps {
  title: string;
  image: {
    src: string;
    altText: string;
  };
  description: ReactNode;
  additionalContents: ReactNode;
}

/**
 * ProjectCard Component
 *
 * A reusable card component to display project information, including an image,
 * description, and custom contents (e.g., tech stack or other details).
 *
 * @param {ProjectCardProps} props - Component props to render a project card.
 * @returns {JSX.Element} A styled card component displaying the project information.
 */
export default function ProjectCard({
  title,
  image,
  description,
  additionalContents,
}: ProjectCardProps) {
  return (
    <div className={styles.projectCard}>
      <div className={styles.projectCardImage}>
        <img src={image.src} alt={image.altText} />
      </div>
      <div className={styles.projectCardContents}>
        <h2>{title}</h2>
        <div className={styles.projectCardContentsDescription}>
          {description}
        </div>
        {additionalContents}
      </div>
    </div>
  );
}
