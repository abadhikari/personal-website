import * as styles from '../styles/Projects.module.css';

interface StackProps {
  frontend: string[];
  backend: string[];
}

/**
 * Stack Component
 *
 * A reusable component for displaying the frontend and backend technologies
 * used in a project. The component takes two arrays of strings as props to
 * represent the frontend and backend stacks and renders them in separate columns.
 *
 * @param {string[]} frontend - An array of strings representing the frontend technologies used in the project.
 * @param {string[]} backend - An array of strings representing the backend technologies used in the project.
 * @returns {JSX.Element} A styled component with two columns: one for frontend and one for backend technologies.
 */

export default function Stack({ frontend, backend }: StackProps) {
  return (
    <div className={styles.stack}>
      <div className={styles.stackFrontend}>
        <h3>Frontend</h3>
        <ul>
          {frontend.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={styles.stackBackend}>
        <h3>Backend</h3>
        <ul>
          {backend.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
