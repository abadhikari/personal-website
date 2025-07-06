import { AnimatePresence, motion } from 'framer-motion';

import { Review } from '../../types/reviewTypes';
import ViewType from '../../types/viewType';
import ReviewRenderer from '../ReviewRenderer';

import * as styles from '../../styles/Reviews.module.css';

type ReviewFeedProps = {
  reviews: Review[];
};

/**
 * Component that renders the list of reviews with animations.
 *
 * If there are no reviews, it displays a fallback message. Otherwise,
 * it renders each review with motion animations inside a scrollable feed.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Review[]} props.reviews - The array of review entries to display.
 * @returns {JSX.Element} Animated list of reviews or an empty state.
 */
export default function ReviewsFeed({ reviews }: ReviewFeedProps) {
  const hasNoReviews = reviews.length === 0;

  return hasNoReviews ? (
    <p className={styles.noReviews}>No reviews found 😔.</p>
  ) : (
    <div className={styles.feedContainer}>
      <AnimatePresence>
        {reviews.map((review) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              layout: { duration: 0.15, ease: 'easeOut' },
              opacity: { duration: 0.1, ease: 'easeOut' },
              y: { duration: 0.1, ease: 'easeOut' },
            }}
            key={review.reviewId}
            className={styles.feedItem}
            role="button"
            tabIndex={0}
          >
            <ReviewRenderer review={review} viewType={ViewType.FEED} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
