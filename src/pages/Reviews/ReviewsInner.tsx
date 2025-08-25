import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import EarthSpinner from '../../components/common/animations/EarthSpinner';
import LinePulseSpinner from '../../components/common/animations/LinePulseSpinner';
import ErrorScreen from '../../components/common/Error/ErrorScreen';
import InfiniteScroll from '../../components/common/InfiniteScroll';
import { ContentCategory } from '../Upload/types/uploadTypes';

import ReviewsContent from './components/feed/ReviewsContent';
import ReviewsMapContent from './components/map/ReviewsMapContent';
import { useSearch } from './contexts/SearchContext';
import useReview from './hooks/useReview';
import ViewType from './types/viewType';

import * as styles from './styles/Reviews.module.css';

interface ReviewsInnerProps {
  view: ViewType;
}

/**
 * ReviewsInner is the core logic component for the Reviews page.
 * It manages UI state (feed vs. map view), error handling, loading state, and search results.
 *
 * Behavior:
 * - Toggles between:
 *   - Feed view (`ReviewsContent` + `InfiniteScroll` for pagination).
 *   - Map view (`ReviewsMapContent`).
 * - Displays a floating action button to switch views.
 *
 * @returns {JSX.Element} A dynamic interface for browsing reviews via list or map.
 */
export default function ReviewsInner({ view }: ReviewsInnerProps) {
  const [error, setError] = useState<string | null>(null);
  const [activeCategoryId, setActiveCategoryId] =
    useState<ContentCategory | null>(null);

  const { reviews, cursor, fetchMoreReviews, isFetchingMore, pageLoading } =
    useReview({ setError, view, activeCategoryId });

  const { isSearching, searchResults, clearSearch } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedReviews = isSearching ? searchResults : reviews;

  // Scroll to the top when view is changed (toggled)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const toggleView = () => {
    clearSearch();
    const isMapView = location.pathname === '/map';
    navigate(isMapView ? '/reviews' : '/map');
  };

  if (error) {
    return <ErrorScreen message={error} />;
  }

  return (
    <>
      {pageLoading &&
        (view === ViewType.FEED ? (
          <LinePulseSpinner width={45} height={45} className="spinner" />
        ) : (
          <EarthSpinner width={55} height={55} className="spinner" />
        ))}

      {!pageLoading && (
        <div className={styles.reviews}>
          <button type="button" onClick={toggleView} className={styles.fab}>
            {view === ViewType.FEED ? '🗺️' : '📃'}
          </button>
          {view === ViewType.FEED ? (
            <>
              <ReviewsContent
                reviews={selectedReviews}
                activeCategoryId={activeCategoryId}
                setActiveCategoryId={setActiveCategoryId}
              />
              {cursor && !isSearching && (
                <InfiniteScroll
                  fetchMore={fetchMoreReviews}
                  isFetching={isFetchingMore}
                />
              )}
            </>
          ) : (
            <ReviewsMapContent reviews={selectedReviews} />
          )}
        </div>
      )}
    </>
  );
}
