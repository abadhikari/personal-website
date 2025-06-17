import { UploadType } from '../types/uploadTypes';

import * as styles from '../styles/Upload.module.css';

interface UploadTypeSelectorProps {
  onSelect: (type: UploadType) => void;
}

/**
 * Dropdown component for selecting the type of upload.
 *
 * Options include:
 * - Content (e.g. venue metadata)
 * - Media (e.g. images or videos)
 *
 * @param {UploadTypeSelectorProps} props - Component props
 * @param {function} props.onSelect - Callback triggered when a type is selected
 *
 * @returns {JSX.Element} The rendered dropdown selector
 */
export default function UploadTypeSelector({
  onSelect,
}: UploadTypeSelectorProps) {
  return (
    <div className={styles.typeSelector}>
      <h2>Select Upload Type</h2>
      <label htmlFor="uploadType">
        <select
          id="uploadType"
          className={styles.select}
          onChange={(e) => {
            const selected = e.target.value as UploadType;
            if (selected) onSelect(selected);
          }}
          defaultValue=""
        >
          <option value="" disabled>
            -- Choose an option --
          </option>
          <option value={UploadType.CONTENT}>🍿 Content</option>
          <option value={UploadType.MEDIA}>🖼️ Media</option>
        </select>
      </label>
    </div>
  );
}
