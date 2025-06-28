import { useState } from 'react';

import UploadTypeSelector from './components/UploadTypeSelector';
import ContentUploadView from './content/components/ContentUploadView';
import MediaUploadView from './media/components/MediaUploadView';
import ReviewUploadView from './review/components/ReviewUploadView';
import { UploadType } from './types/uploadTypes';

/**
 * Upload page entry point.
 *
 * Renders a type selector initially. Once a type is selected, displays the
 * corresponding upload view.
 *
 * @returns {JSX.Element} Upload page component.
 */
export default function Upload() {
  const [uploadType, setUploadType] = useState<UploadType | null>(null);

  const renderView = () => {
    switch (uploadType) {
      case UploadType.CONTENT:
        return <ContentUploadView />;
      case UploadType.MEDIA:
        return <MediaUploadView />;
      case UploadType.REVIEW:
        return <ReviewUploadView />;
      default:
        return <UploadTypeSelector onSelect={setUploadType} />;
    }
  };

  return <>{renderView()}</>;
}
