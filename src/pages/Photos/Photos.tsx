import { useMemo, useRef, useState } from 'react';

import AnimatedSpinner from '../../components/common/animations/AnimatedSpinner';
import GridSpinner from '../../components/common/animations/GridSpinner';
import ErrorScreen from '../../components/common/Error/ErrorScreen';
import InfiniteScroll from '../../components/common/InfiniteScroll';
import { isMobile } from '../../utils/deviceType';

import useLinkedStackLoader from './components/hooks/useLinkedStackLoader';
import useLinkedStackParams from './components/hooks/useLinkedStackUrlParams';
import usePhotos from './components/hooks/usePhotos';
import useSearchQuery from './components/hooks/useSearchQuery';
import PhotosContent from './components/media/PhotosContent';
import Modal from './components/modal/Modal';

import * as styles from './styles/Photos.module.css';

/**
 * Renders the Photos page, which fetches and displays a list of media stacks as a feed.
 *
 * @returns {JSX.Element} The rendered Photos page.
 */
export default function Photos() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);
  const [selectedStackIndex, setSelectedStackIndex] = useState<number | null>(
    null
  );

  const {
    stacks,
    setStacks,
    lastEvaluatedKey,
    fetchMorePhotos,
    isFetchingMore,
    pageLoading,
  } = usePhotos({ setError });

  const {
    query,
    filteredStacks,
    setSearchStacks,
    isSearching,
    searchProcessing,
    handleQueryChange,
  } = useSearchQuery({ searchInputRef });

  const { stackId, mediaId } = useLinkedStackParams();
  const { linkedStack, focusedMediaIndex, setLinkedStack } =
    useLinkedStackLoader({ stackId, mediaId });

  const visibleStacks = useMemo(
    () => (isSearching ? filteredStacks : stacks),
    [isSearching, filteredStacks, stacks]
  );

  const setMediaStacks = isSearching ? setSearchStacks : setStacks;

  const hasMoreStacksToFetch = Boolean(lastEvaluatedKey) && !isSearching;
  const columns = isMobile() ? 2 : 3;

  // Only display complete rows of stacks if more stacks are still loading.
  // This avoids rendering an incomplete row until we know no more stacks remain.
  const displayStacks = useMemo(() => {
    if (!hasMoreStacksToFetch) return visibleStacks;
    const fullRows = Math.floor(visibleStacks.length / columns) * columns;
    return visibleStacks.slice(0, fullRows);
  }, [visibleStacks, hasMoreStacksToFetch, columns]);

  const handleThumbnailClick = (index: number) => {
    setSelectedStackIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedStackIndex(null);
  };

  if (error) {
    return <ErrorScreen message={error} />;
  }

  return (
    <>
      {pageLoading && (
        <GridSpinner width={45} height={45} className="spinner" />
      )}

      <div className={styles.photos}>
        {!pageLoading && (
          <PhotosContent
            query={query}
            onQueryChange={handleQueryChange}
            searchInputRef={searchInputRef}
            mediaStacks={displayStacks}
            searchProcessing={searchProcessing}
            onThumbnailClick={handleThumbnailClick}
          />
        )}

        {hasMoreStacksToFetch && (
          <InfiniteScroll
            fetchMore={fetchMorePhotos}
            isFetching={isFetchingMore}
          />
        )}

        {selectedStackIndex !== null && (
          <Modal
            mediaStacks={displayStacks}
            selectedStackIndex={selectedStackIndex}
            key="selected-modal"
            initialMediaIndex={0}
            onClose={handleCloseModal}
            setStacks={setMediaStacks}
          />
        )}

        {linkedStack && (
          <Modal
            mediaStacks={[linkedStack]}
            selectedStackIndex={0}
            key="linked-modal"
            initialMediaIndex={focusedMediaIndex}
            onClose={() => setLinkedStack(null)}
            setStacks={() => {}}
          />
        )}

        {searchProcessing && (
          <div className="loadingOverlay">
            <AnimatedSpinner />
          </div>
        )}
      </div>
    </>
  );
}
