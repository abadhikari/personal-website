import { ContentMetadata } from '../../../types/uploadTypes';

import ExperienceMetadataForm from './ExperienceMetadataForm';

interface EntertainmentMetadataFormProps {
  metadata: ContentMetadata;
  onMetadataChange: <K extends keyof ContentMetadata>(
    field: K,
    value: ContentMetadata[K]
  ) => void;
}

/**
 * Wrapper form component for editing metadata related to Entertainment content.
 *
 * Currently renders the shared `ExperienceMetadataForm` without adding
 * any entertainment-specific fields, but exists to support future extensibility.
 *
 * @param {EntertainmentMetadataFormProps} props - Component props
 * @param {ContentMetadata} props.metadata - Current metadata state
 * @param {function} props.onMetadataChange - Callback to update a specific metadata field
 *
 * @returns {JSX.Element} The rendered form for Entertainment content metadata
 */
export default function EntertainmentMetadataForm({
  metadata,
  onMetadataChange,
}: EntertainmentMetadataFormProps) {
  return (
    <ExperienceMetadataForm
      metadata={metadata}
      onMetadataChange={onMetadataChange}
    />
  );
}
