import { useCallback, useEffect, useState } from 'react';
import * as styles from './styles/Photos.module.css';
import * as animationStyles from '../../styles/animations.module.css';
import { MediaStack } from './types';
import fetchPhotos from './fetchPhotos';
import MediaRenderer from './components/MediaRenderer';
import Modal from './components/modal/Modal';
import ViewType from './viewType';
import InfiniteScroll from './components/InfiniteScroll';
import BouncingText from '../../components/common/animations/BouncingText';

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
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStackIndex, setSelectedStackIndex] = useState<number | null>(
    null
  );
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const handleThumbnailClick = (index: number) => {
    setSelectedStackIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedStackIndex(null);
  };

  const numberOfStacks = () => {
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    return isMobile ? 10 : 9;
  };

  const fetchPhotoData = async (key: string | null = null) => {
    try {
      const data = await fetchPhotos({
        stackLimit: numberOfStacks(),
        ...(key && { lastEvaluatedKey: key }),
      });
      setStacks((prev) => [...prev, ...data.stackAndMediaData]);
      setLastEvaluatedKey(data.lastEvaluatedKey || null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred.'
      );
    }
  };

  const fetchMorePhotos = useCallback(async () => {
    if (isFetchingMore || !lastEvaluatedKey) return;

    setIsFetchingMore(true);
    try {
      await fetchPhotoData(lastEvaluatedKey);
    } finally {
      setIsFetchingMore(false);
    }
  }, [lastEvaluatedKey, isFetchingMore]);

  useEffect(() => {
    async function loadInitialPhotos() {
      try {
        await fetchPhotoData();
      } finally {
        setLoading(false);
      }
    }

    loadInitialPhotos();
  }, []);

  if (loading) {
    return <BouncingText text="..." className={styles.photosTemporaryText} />;
  }

  if (error) {
    return <div className={styles.photosTemporaryText}>{error}</div>;
  }

  return (
    <div className={styles.photos}>
      <div className={`${styles.photosContainer} ${animationStyles.fadeInUp}`}>
        <h1>My Photos</h1>
        <div className="divider" />
        <p>A collection of photos and videos I&apos;ve taken.</p>
        <div className={styles.photosFeedContainer}>
          {stacks.map((stack, index) => (
            <div
              key={stack.stack.stackId}
              className={styles.photoFeedImageContainer}
              onClick={() => handleThumbnailClick(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  // Prevent default scrolling behavior for the spacebar
                  e.preventDefault();
                  handleThumbnailClick(index);
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

      {lastEvaluatedKey && (
        <InfiniteScroll
          fetchMore={fetchMorePhotos}
          isFetching={isFetchingMore}
        />
      )}

      {selectedStackIndex !== null && (
        <Modal
          mediaStacks={stacks}
          selectedStackIndex={selectedStackIndex}
          onClose={handleCloseModal}
          setStacks={setStacks}
        />
      )}
    </div>
  );
}
