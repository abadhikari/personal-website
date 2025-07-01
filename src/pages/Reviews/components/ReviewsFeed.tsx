import { AnimatePresence, motion } from 'framer-motion';

import { Review } from '../types/reviewTypes';

import ReviewRenderer from './ReviewRenderer';

import * as styles from '../styles/Reviews.module.css';

type ReviewFeedProps = {
  reviews: Review[];
  onClick: (index: number) => void;
};

/**
 * Component for rendering a feed of reviews.
 *
 * @param {Object} props - Props passed to the component.
 * @param {Review[]} props.reviews - Array of reviews to render.
 * @param {Function} props.onClick - Handler for selecting a review (by index).
 *
 * @returns {JSX.Element} A list of animated review entries or a "No reviews found" message.
 */
export default function ReviewsFeed({ reviews, onClick }: ReviewFeedProps) {
  const hasNoReviews = reviews.length === 0;

  return hasNoReviews ? (
    <p className={styles.noReviews}>No reviews found 😔.</p>
  ) : (
    <div className={styles.feedContainer}>
      <AnimatePresence>
        {reviews.map((review, index) => (
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
            onClick={() => onClick(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(index);
              }
            }}
          >
            <ReviewRenderer review={review} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
