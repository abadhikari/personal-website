import { useState } from 'react';

import ViewType from '../../types/viewType';

import * as styles from '../../styles/Modal.module.css';

interface ImageProps {
  src: string;
  viewType: ViewType;
  altText?: string;
  className?: string;
}

/**
 * Renders an image with optional alt text and context-based loading animation.
 *
 * @param {string} src - The image source URL.
 * @param {ViewType} viewType - The context in which the image is rendered (e.g. THUMBNAIL or MODAL).
 * @param {string} [altText] - The alternative text for the image.
 * @param {string} [className] - Optional CSS class for layout or additional styling.
 * @returns A styled and optionally animated image element.
 */
export default function Image({
  src,
  viewType,
  altText,
  className,
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const shouldAnimate = viewType === ViewType.THUMBNAIL;

  let animationClass = '';
  if (shouldAnimate) {
    animationClass = loaded ? styles.loaded : styles.loading;
  }

  return (
    <img
      src={src}
      alt={altText || 'Photo'}
      className={`${className ?? ''} ${styles.image} ${animationClass}`}
      onLoad={() => setLoaded(true)}
    />
  );
}
