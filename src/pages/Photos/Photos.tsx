import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './styles/Photos.module.css';
import * as animationStyles from '../../styles/animations.module.css';
import MediaFeed from './components/media/MediaFeed';
import InfiniteScroll from './components/InfiniteScroll';
import usePhotos from './components/hooks/usePhotos';
import Modal from './components/modal/Modal';
import useSearchQuery from './components/hooks/useSearchQuery';
import useLinkedStackParams from './components/hooks/useLinkedStackUrlParams';
import useLinkedStackLoader from './components/hooks/useLinkedStackLoader';
import AnimatedSpinner from '../../components/common/animations/AnimatedSpinner';

/**
 * Renders the Photos page, which fetches and displays a list of media stacks as a feed.
 *
 * @returns {JSX.Element} The rendered Photos page.
 */
export default function Photos() {
  const DEFAULT_DEBOUNCE = 100;
  const FIRST_SEARCH_DEBOUNCE = 300;

  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const stackLimit = useMemo(() => {
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    return isMobile ? 10 : 9;
  }, []);

  const [error, setError] = useState<string | null>(null);

  const {
    stacks,
    setStacks,
    lastEvaluatedKey,
    fetchMorePhotos,
    isFetchingMore,
    pageLoading,
  } = usePhotos({ stackLimit, setError });

  const {
    query,
    setQuery,
    handleSearchSubmit,
    filteredStacks,
    setSearchStacks,
    isSearching,
    setIsSearching,
    searchProcessing,
  } = useSearchQuery({ setError, searchInputRef });

  const { stackId, mediaId } = useLinkedStackParams();
  const { linkedStack, focusedMediaIndex, setLinkedStack } =
    useLinkedStackLoader({ stackId, mediaId });

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawQuery = e.target.value;
    setQuery(rawQuery);
    const debounceDuration =
      filteredStacks.length === 0 ? FIRST_SEARCH_DEBOUNCE : DEFAULT_DEBOUNCE;

    const trimmedQuery = rawQuery.trim();

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (trimmedQuery === '') {
        setIsSearching(false);
      } else {
        handleSearchSubmit(trimmedQuery);
      }
    }, debounceDuration);
  };

  const visibleStacks = isSearching ? filteredStacks : stacks;
  const setVisibleStacks = isSearching ? setSearchStacks : setStacks;

  const [selectedStackIndex, setSelectedStackIndex] = useState<number | null>(
    null
  );

  const handleThumbnailClick = (index: number) => {
    setSelectedStackIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedStackIndex(null);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (stackId) {
      // Clean up the URL so it's just /photos
      navigate('/photos', { replace: true });
    }
  }, [stackId, mediaId, navigate]);

  if (pageLoading) {
    return <AnimatedSpinner className="spinnerBlack" />;
  }

  if (error) {
    return <div className="loadingText">{error}</div>;
  }

  return (
    <div className={styles.photos}>
      <div className={`${styles.photosContainer} ${animationStyles.fadeInUp}`}>
        <h1>My Photos</h1>
        <div className="divider" />
        <p>A collection of photos and videos I&apos;ve taken.</p>

        <input
          type="text"
          ref={searchInputRef}
          placeholder="🔍  Search by keywords..."
          value={query}
          onChange={handleQueryChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              (e.target as HTMLInputElement).blur();
            }
          }}
          className={styles.searchInput}
        />

        <MediaFeed
          stacks={visibleStacks}
          onClick={handleThumbnailClick}
          searchProcessing={searchProcessing}
        />
      </div>

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
          initialMediaIndex={0}
          onClose={handleCloseModal}
          setStacks={setVisibleStacks}
        />
      )}

      {linkedStack && (
        <Modal
          mediaStacks={[linkedStack]}
          selectedStackIndex={0}
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
  );
}
