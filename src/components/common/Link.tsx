interface LinkProps {
  href: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * `Link` is a wrapper around the native `<a>` tag with sensible defaults for external links.
 *
 * It opens links in a new tab by default (`target="_blank"`) and applies `rel="noopener noreferrer"`
 * for security and performance. You can override these defaults as needed.
 *
 * @param {string} href - The destination URL.
 * @param {string} [target='_blank'] - Specifies where to open the linked document.
 * @param {string} [rel='noopener noreferrer'] - Relationship between the current and linked documents.
 * @param {React.ReactNode} children - The content inside the anchor tag.
 * @param {string} [className] - Optional CSS class for styling.
 *
 * @returns A customizable anchor (`<a>`) element.
 */
export default function Link({
  href,
  target = '_blank',
  rel = 'noopener noreferrer',
  children,
  className,
}: LinkProps) {
  return (
    <a href={href} className={className} target={target} rel={rel}>
      {children}
    </a>
  );
}
