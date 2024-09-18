import { useState } from 'react';
import Link from '../../common/Link';
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
    <Link href={imageLink} className={styles.navbarMenuSocials}>
      <img
        src={isHovered ? hoveredSrc : defaultSrc}
        alt={altText}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </Link>
  );
}
