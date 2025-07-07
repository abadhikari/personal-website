import { Category, Review, Venue } from '../../types/reviewTypes';

interface ExperienceEmojiProps {
  review: Review;
  className: string;
}

function isExperienceReview(
  review: Review
): review is Review & { subcontent: { venue: Venue } } {
  return (
    review.subcontent != null &&
    'venue' in review.subcontent &&
    typeof review.subcontent.venue === 'string'
  );
}

const emojiMap: Record<string, string> = {
  [Category.Book]: '📚',
  [Category.Movie]: '🍿',
  [Category.Show]: '📺',
  [`${Category.FoodAndDrink}:${Venue.Restaurant}`]: '🍽️',
  [`${Category.FoodAndDrink}:${Venue.Bar}`]: '🍺',
  [`${Category.Entertainment}:${Venue.JazzClub}`]: '🎷',
};

/**
 * Renders an appropriate emoji representing the type of experience based on its venue.
 * Used for quick visual categorization of experience-type reviews.
 */
export default function ExperienceEmoji({
  review,
  className,
}: ExperienceEmojiProps) {
  const category = review.categoryId;
  const venue = isExperienceReview(review) ? review.subcontent.venue : null;

  const key = venue ? `${category}:${venue}` : `${category}`;
  const emoji = emojiMap[key] || '❓';

  return <span className={className}>{emoji}</span>;
}
