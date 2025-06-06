import { Media } from '../../types/mediaTypes';
import ViewType from '../../types/viewType';

import Image from './Image';
import Video from './Video';

interface MediaRendererProps {
  media: Media;
  viewType: ViewType;
  className?: string;
}

/**
 * Dynamically renders media based on its type.
 *
 * @param {Media} media - The media object containing type and URLs.
 * @returns The appropriate media component (Image or Video).
 */
export default function MediaRenderer({
  media,
  viewType,
  className,
}: MediaRendererProps) {
  const { mediaType } = media;
  const src =
    viewType === ViewType.MODAL
      ? media.imageUrl.full
      : media.imageUrl.thumbnail;
  if (mediaType.includes('image')) {
    return (
      <Image src={src} altText={media.alternativeText} className={className} />
    );
  }

  if (mediaType.includes('video')) {
    return <Video src={src} viewType={viewType} className={className} />;
  }
  return null;
}
