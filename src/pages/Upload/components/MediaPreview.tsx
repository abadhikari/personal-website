interface MediaPreviewProps {
  file: File;
}

/**
 * A component for rendering a preview of an media file selected by the user.
 * It uses the `URL.createObjectURL` method to generate a temporary URL for the file,
 * allowing the media to be displayed as a preview.
 *
 * @param {File} props.file - The media file to be previewed. This should be a valid `File` object.
 * @returns {JSX.Element} The rendered media preview component.
 */
export default function MediaPreview({ file }: MediaPreviewProps) {
  const mediaPreviewUrll = URL.createObjectURL(file);
  const fileType = file.type;
  if (fileType.includes('image')) {
    return <img src={mediaPreviewUrll} alt="Upload preview." />;
  }

  if (fileType.includes('video')) {
    return (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <video autoPlay={false} muted={false} controls>
        <source src={mediaPreviewUrll} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
}
