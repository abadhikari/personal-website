import { useState } from 'react';
import * as styles from './styles/FooterLeft.module.css';

interface SocialsImageProps {
  imageLink: string;
  hoveredSrc: string;
  defaultSrc: string;
  altText: string;
  width: number;
  height: number;
}

export default function SocialsImage(props: SocialsImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { imageLink, hoveredSrc, defaultSrc, altText, width, height } = props;
  return (
    <a
      href={imageLink}
      className={styles.navbarMenuSocials}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={isHovered ? hoveredSrc : defaultSrc}
        alt={altText}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </a>
  );
}
