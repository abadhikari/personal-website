export interface ImageMetadata {
  caption: string;
  altText: string;
  location: string;
}

interface MetadataFormProps {
  metadata: ImageMetadata;
  divClassName: string;
  onMetadataChange: (field: keyof ImageMetadata, value: string) => void;
}

/**
 * A form component for editing image metadata, including caption, alt text, and location.
 *
 * @param {MetadataFormProps} props - The component props.
 * @returns {JSX.Element} - The rendered metadata form.
 */
export default function MetadataForm({
  metadata,
  divClassName,
  onMetadataChange,
}: MetadataFormProps) {
  return (
    <div className={divClassName}>
      <label htmlFor="caption">
        Caption:
        <input
          id="caption"
          type="text"
          value={metadata.caption}
          onChange={(e) => onMetadataChange('caption', e.target.value)}
        />
      </label>
      <label htmlFor="altText">
        Alt Text:
        <input
          id="altText"
          type="text"
          value={metadata.altText}
          onChange={(e) => onMetadataChange('altText', e.target.value)}
        />
      </label>
      <label htmlFor="location">
        Location:
        <input
          id="location"
          type="text"
          value={metadata.location}
          onChange={(e) => onMetadataChange('location', e.target.value)}
        />
      </label>
    </div>
  );
}
