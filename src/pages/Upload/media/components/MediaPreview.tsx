import { useRef } from 'react';

import { isImage, isVideo } from '../../../../utils/file';

interface MediaPreviewProps {
  file: File;
  onCurrentTimeChange: (time: number) => void;
  className?: string;
}

/**
 * A component for rendering a preview of an media file selected by the user.
 * It uses the `URL.createObjectURL` method to generate a temporary URL for the file,
 * allowing the media to be displayed as a preview.
 *
 * @param {File} props.file - The media file to be previewed. This should be a valid `File` object.
 * @returns {JSX.Element} The rendered media preview component.
 */
export default function MediaPreview({
  file,
  onCurrentTimeChange,
  className,
}: MediaPreviewProps) {
  const mediaPreviewUrl = URL.createObjectURL(file);
  const fileType = file.type;
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      onCurrentTimeChange(videoRef.current.currentTime);
    }
  };

  if (isImage(fileType)) {
    return (
      <img
        src={mediaPreviewUrl}
        alt="Upload preview."
        className={className || ''}
      />
    );
  }

  if (isVideo(fileType)) {
    return (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <video
        ref={videoRef}
        autoPlay={false}
        muted={false}
        controls
        onTimeUpdate={handleTimeUpdate}
        className={className || ''}
      >
        <source src={mediaPreviewUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
}
