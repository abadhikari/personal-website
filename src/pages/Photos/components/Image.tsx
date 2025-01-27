interface ImageProps {
  src: string;
  altText?: string;
  className?: string;
}

/**
 * Renders an image with optional alt text.
 *
 * @param {string} src - The image source URL.
 * @param {string} [altText] - The alternative text for the image.
 * @returns A styled image component.
 */
export default function Image({ src, altText, className }: ImageProps) {
  return <img src={src} alt={altText || 'Photo'} className={className || ''} />;
}
