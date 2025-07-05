import { Review } from '../../types/reviewTypes';

import ReviewsFeed from './ReviewsFeed';

import * as animationStyles from '../../../../styles/animations.module.css';
import * as styles from '../../styles/Reviews.module.css';

type ReviewsContentProps = {
  reviews: Review[];
  onReviewClick: (index: number) => void;
};

/**
 * Renders the main content for the Reviews page.
 *
 * @param {Object} props - Component props.
 * @param {Review[]} props.reviews - The currently visible reviews (filtered or full list).
 * @param {Function} props.onReviewClick - Handler for clicking a review entry.
 *
 * @returns {JSX.Element} A section containing the review feed.
 */
export default function ReviewsContent({
  reviews,
  onReviewClick,
}: ReviewsContentProps) {
  return (
    <div className={`${styles.reviewsContainer} ${animationStyles.fadeInUp}`}>
      <h1>My Reviews</h1>
      <div className="divider" />
      <p>Reviews of places, food, and media I&apos;ve experienced.</p>

      <ReviewsFeed reviews={reviews} onClick={onReviewClick} />
    </div>
  );
}
