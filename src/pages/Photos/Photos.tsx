import { useMemo, useRef, useState } from 'react';

import AnimatedSpinner from '../../components/common/animations/AnimatedSpinner';
import DigitalRainSpinner from '../../components/common/animations/DigitalRainSpinner';
import ErrorScreen from '../../components/common/Error/ErrorScreen';

import useLinkedStackLoader from './components/hooks/useLinkedStackLoader';
import useLinkedStackParams from './components/hooks/useLinkedStackUrlParams';
import usePhotos from './components/hooks/usePhotos';
import useSearchQuery from './components/hooks/useSearchQuery';
import InfiniteScroll from './components/InfiniteScroll';
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

  const setVisibleStacks = isSearching ? setSearchStacks : setStacks;

  const handleThumbnailClick = (index: number) => {
    setSelectedStackIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedStackIndex(null);
  };

  if (error) {
    return (
      <ErrorScreen
        message={error}
      />
    );
  }

  return (
    <>
      {pageLoading && <DigitalRainSpinner className="spinnerBlack" />}

      <div className={styles.photos}>
        {!pageLoading && (
          <PhotosContent
            query={query}
            onQueryChange={handleQueryChange}
            searchInputRef={searchInputRef}
            visibleStacks={visibleStacks}
            searchProcessing={searchProcessing}
            onThumbnailClick={handleThumbnailClick}
          />
        )}

        {lastEvaluatedKey && !isSearching && (
          <InfiniteScroll
            fetchMore={fetchMorePhotos}
            isFetching={isFetchingMore}
          />
        )}

        {selectedStackIndex !== null && (
          <Modal
            mediaStacks={visibleStacks}
            selectedStackIndex={selectedStackIndex}
            key="selected-modal"
            initialMediaIndex={0}
            onClose={handleCloseModal}
            setStacks={setVisibleStacks}
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
