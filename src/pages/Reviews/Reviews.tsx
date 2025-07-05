import { useState } from 'react';

import LinePulseSpinner from '../../components/common/animations/LinePulseSpinner';
import ErrorScreen from '../../components/common/Error/ErrorScreen';
import InfiniteScroll from '../../components/common/InfiniteScroll';

import ReviewsContent from './components/feed/ReviewsContent';
import ReviewsMapContent from './components/map/ReviewsMapContent';
import useReview from './hooks/useReview';
import ViewType from './types/viewType';

import * as styles from './styles/Reviews.module.css';

/**
 * Reviews page component responsible for rendering user-generated reviews
 * in either a scrollable feed or a map-based layout.
 *
 * - In feed view:
 *   - Renders reviews in a scrollable list using `ReviewsContent`.
 *   - Supports infinite scrolling with `InfiniteScroll`.
 * - In map view:
 *   - Renders reviews with geo-coordinates as markers on a map using `ReviewsMapContent`.
 *
 * @returns {JSX.Element} A complete reviews interface with togglable views.
 */
export default function Reviews() {
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<ViewType>(ViewType.FEED);

  const { reviews, cursor, fetchMoreReviews, isFetchingMore, pageLoading } =
    useReview({ setError, view });

  if (error) {
    return <ErrorScreen message={error} />;
  }

  const toggleView = () =>
    setView((v) => (v === ViewType.FEED ? ViewType.MAP : ViewType.FEED));

  return (
    <>
      {pageLoading && (
        <LinePulseSpinner width={45} height={45} className="spinner" />
      )}

      {!pageLoading && (
        <div className={styles.reviews}>
          <button type="button" onClick={toggleView} className={styles.fab}>
            {view === ViewType.FEED ? '🗺️' : '📃'}
          </button>
          {view === ViewType.FEED ? (
            <>
              <ReviewsContent reviews={reviews} onReviewClick={() => {}} />
              {cursor && (
                <InfiniteScroll
                  fetchMore={fetchMoreReviews}
                  isFetching={isFetchingMore}
                />
              )}
            </>
          ) : (
            <ReviewsMapContent reviews={reviews} />
          )}
        </div>
      )}
    </>
  );
}
