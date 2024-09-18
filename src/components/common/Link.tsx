interface LinkProps {
  href: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
}

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
