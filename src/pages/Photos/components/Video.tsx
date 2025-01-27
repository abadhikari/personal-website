/* eslint-disable jsx-a11y/media-has-caption */
import ViewType from '../viewType';

interface VideoProps {
  src: string;
  viewType: ViewType;
  className?: string;
}

/**
 * Renders a video with auto-play and muted attributes.
 *
 * @param {string} src - The source URL of the video (MP4 format).
 * @returns A styled video component.
 */
export default function Video({ src, viewType, className }: VideoProps) {
  const videoSettings =
    viewType === ViewType.MODAL
      ? { autoPlay: true, muted: false, controls: true }
      : { autoPlay: false, muted: true, controls: false };

  return (
    <>
      <video
        className={className || ''}
        autoPlay={videoSettings.autoPlay}
        muted={videoSettings.muted}
        controls={videoSettings.controls}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {viewType === ViewType.THUMBNAIL && (
        <img
          src="./assets/videoIcon.png"
          alt="Video Icon"
          className="icon-overlay"
        />
      )}
    </>
  );
}
