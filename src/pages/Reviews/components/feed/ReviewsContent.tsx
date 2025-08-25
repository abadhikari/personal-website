import { ContentCategory } from '../../../Upload/types/uploadTypes';
import { Review } from '../../types/reviewTypes';
import ViewType from '../../types/viewType';
import SearchBar from '../search/SearchBar';

import CategorySelector from './CategorySelector';
import ReviewsFeed from './ReviewsFeed';

import * as animationStyles from '../../../../styles/animations.module.css';
import * as styles from '../../styles/Reviews.module.css';

type ReviewsContentProps = {
  reviews: Review[];
  activeCategoryId: ContentCategory | null;
  setActiveCategoryId: (next: ContentCategory | null) => void;
};

/**
 * High-level layout component for the Reviews page (feed view).
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Review[]} props.reviews - List of reviews to be passed to the feed.
 * @returns {JSX.Element} A structured layout for the reviews section.
 */
export default function ReviewsContent({
  reviews,
  activeCategoryId,
  setActiveCategoryId,
}: ReviewsContentProps) {
  return (
    <div className={`${styles.reviewsContainer} ${animationStyles.fadeInUp}`}>
      <h1>My Reviews</h1>
      <div className="divider" />
      <p>Reviews of places, food, and media I&apos;ve experienced.</p>

      <CategorySelector
        value={activeCategoryId}
        onChange={setActiveCategoryId}
      />

      <SearchBar
        reviews={reviews}
        viewType={ViewType.FEED}
        activeCategoryId={activeCategoryId}
      />

      <ReviewsFeed reviews={reviews} />
    </div>
  );
}
