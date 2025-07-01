import { useState } from 'react';

import GridSpinner from '../../components/common/animations/GridSpinner';
import ErrorScreen from '../../components/common/Error/ErrorScreen';
import InfiniteScroll from '../../components/common/InfiniteScroll';

import ReviewsContent from './components/ReviewsContent';
import useReview from './hooks/useReview';

import * as styles from './styles/Reviews.module.css';

/**
 * Renders the Reviews page, which fetches and displays a list of reviews as a feed.
 *
 * @returns {JSX.Element} The rendered Reviews page.
 */
export default function Reviews() {
  const [error, setError] = useState<string | null>(null);

  const { reviews, cursor, fetchMoreReviews, isFetchingMore, pageLoading } =
    useReview({ setError });

  if (error) {
    return <ErrorScreen message={error} />;
  }

  return (
    <>
      {pageLoading && (
        <GridSpinner width={45} height={45} className="spinner" />
      )}

      <div className={styles.reviews}>
        {!pageLoading && (
          <ReviewsContent reviews={reviews} onReviewClick={() => {}} />
        )}

        {cursor && (
          <InfiniteScroll
            fetchMore={fetchMoreReviews}
            isFetching={isFetchingMore}
          />
        )}
      </div>
    </>
  );
}
