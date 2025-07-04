import { useState } from 'react';

import AnimatedSpinner from '../../../../components/common/animations/AnimatedSpinner';
import { ContentCategory } from '../../types/uploadTypes';
import useContentUploadHandler from '../hooks/useContentUploadHandler';

import FormRouter from './MetadataForm/FormRouter';

import * as animationStyles from '../../../../styles/animations.module.css';
import * as styles from '../../styles/UploadContent.module.css';

/**
 * ContentUploadView is the main UI for submitting new structured content entries
 * (e.g. restaurants, venues, events).
 *
 * Features:
 * - Category selection dropdown (Food & Drink, Entertainment)
 * - Dynamically routed form via `FormRouter` based on selected category
 * - Form submission logic via `useContentUploadHandler`
 * - Upload state handling with loading spinner
 *
 * State:
 * - `categoryId` tracks the selected content category (-1 means none selected)
 *
 * @returns {JSX.Element} A fully interactive content upload form with category routing
 */
export default function ContentUploadView() {
  const [categoryId, setCategoryId] = useState<ContentCategory | -1>(-1);
  const { isUploading, upload } = useContentUploadHandler();

  return (
    <>
      <div className={`${styles.upload} ${animationStyles.fadeInUp}`}>
        <h1>Upload Content</h1>
        <div className={styles.uploadDetails}>
          <div className={styles.contentMetadata}>
            <label htmlFor="categoryId">
              Category<span className="required">*</span>
              <select
                id="categoryId"
                value={categoryId}
                onChange={(e) =>
                  setCategoryId(Number(e.target.value) as ContentCategory)
                }
              >
                <option value={-1}>-- Select a category --</option>
                <option value={3}>Book</option>
                <option value={4}>Food &amp; Drink</option>
                <option value={5}>Entertainment</option>
              </select>
            </label>
            <FormRouter categoryId={categoryId} onSubmit={upload} />
          </div>
        </div>
      </div>
      {isUploading && (
        <div className="loadingOverlay">
          <AnimatedSpinner />
        </div>
      )}
    </>
  );
}
