import { Link } from 'react-router-dom';

import { toSlug } from '../../../../utils/slug';

interface MapLinkedTitleProps {
  title: string;
  className?: string;
}

export default function MapLinkedTitle({
  title,
  className,
}: MapLinkedTitleProps) {
  const slug = toSlug(title);

  return (
    <Link
      to={`/map?search=${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {title}
    </Link>
  );
}
