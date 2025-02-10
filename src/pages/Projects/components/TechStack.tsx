import SocialsImage from '../../../components/Footer/FooterLeft/SocialsImage';
import * as styles from '../styles/Projects.module.css';

interface TechStackInfo {
  technologies: string[];
  githubLink: string;
}

interface TechStackProps {
  frontend: TechStackInfo;
  backend: TechStackInfo;
}

const renderTechStackColumn = (
  { technologies, githubLink }: TechStackInfo,
  layer: string
) => (
  <div className={styles[`stack${layer}`]}>
    <h3>{layer}</h3>
    <div className={styles.links}>
      <SocialsImage
        imageLink={githubLink}
        hoveredSrc="./assets/githubLogoBlue.png"
        defaultSrc="./assets/githubLogoBlack.png"
        altText="Github Logo"
        width={30}
        height={30}
      />
    </div>
    <ul>
      {technologies.map((tech) => (
        <li key={tech}>{tech}</li>
      ))}
    </ul>
  </div>
);

/**
 * TechStack Component
 *
 * A reusable component that displays the frontend and backend technology stacks
 * used in a project.
 *
 * @component
 * @param {TechStackProps} props - Component props containing frontend and backend stack information.
 * @returns {JSX.Element} A styled component with two sections: one for frontend and one for backend technologies.
 */
export default function TechStack({ frontend, backend }: TechStackProps) {
  const techStacks = [
    { stack: frontend, layer: 'Frontend' },
    { stack: backend, layer: 'Backend' },
  ];

  return (
    <div className={styles.stack}>
      {techStacks.map(({ stack, layer }) =>
        renderTechStackColumn(stack, layer)
      )}
    </div>
  );
}
