import { useState, useEffect } from 'react';
import * as styles from './styles/Photos.module.css';
import * as animationStyles from '../../styles/animations.module.css';
import { MediaStack } from './types';
import fetchPhotos from './fetchPhotos';
import MediaRenderer from './components/MediaRenderer';
import Modal from './components/Modal';
import ViewType from './viewType';

/**
 * Renders the Photos page, which fetches and displays a list of media stacks.
 *
 * - Shows a loading indicator while fetching data.
 * - Displays an error message if the API call fails.
 * - Renders a list of media using the MediaRenderer component.
 *
 * @returns {JSX.Element} The rendered Photos page.
 */
export default function Photos() {
  const [stacks, setStacks] = useState<MediaStack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStack, setSelectedStack] = useState<MediaStack | null>(null);

  const handleThumbnailClick = (stack: MediaStack) => {
    setSelectedStack(stack);
  };

  const handleCloseModal = () => {
    setSelectedStack(null);
  };

  useEffect(() => {
    async function loadPhotos() {
      try {
        const data = await fetchPhotos();
        setStacks(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unexpected error occurred.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    loadPhotos();
  }, []);

  if (loading) {
    return <div className={styles.photos}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.photos}>Error: {error}</div>;
  }

  return (
    <div className={styles.photos}>
      <div className={`${styles.photosContainer} ${animationStyles.fadeInUp}`}>
        <h1>My Photos</h1>
        <div className="divider" />
        <p>A collection of photos and videos I&apos;ve taken.</p>
        <div className={styles.photosFeedContainer}>
          {stacks.map((stack) => (
            <div
              key={stack.stack.stackId}
              className={styles.photoFeedImageContainer}
              onClick={() => handleThumbnailClick(stack)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  // Prevent default scrolling behavior for the spacebar
                  e.preventDefault();
                  handleThumbnailClick(stack);
                }
              }}
            >
              <MediaRenderer
                media={stack.media[0]}
                viewType={ViewType.THUMBNAIL}
                className={styles.photoFeedImageContainerMedia}
              />
            </div>
          ))}
        </div>
      </div>
      {selectedStack && (
        <Modal mediaStack={selectedStack} onClose={handleCloseModal} />
      )}
    </div>
  );
}
