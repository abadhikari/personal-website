import toTitleCaseFromSnake from '../../../../utils/toTitleCaseFromSnake';
import { Category, Review } from '../../types/reviewTypes';

import DescriptiveRating from './DescriptiveRating';
import ExperienceEmoji from './ExperienceEmoji';
import TruncatedText from './TruncatedText';

import * as styles from '../../styles/ReviewCards.module.css';

interface BookCardProps {
  review: Extract<Review, { categoryId: Category.Book }>;
}

/**
 * Card for rendering book review card.
 */
export default function BookCard({ review }: BookCardProps) {
  const { rating, reviewText, createdAt, subcontent } = review;
  const { pages, title, author, yearPublished, genres } = subcontent;

  return (
    <div>
      <div className={styles.title}>
        <ExperienceEmoji review={review} className={styles.categoryEmoji} />
        <h3>{title}</h3>
        <span className={styles.author}>
          by {author} {yearPublished ? `(${yearPublished})` : ''}
        </span>
      </div>
      <DescriptiveRating rating={rating} />
      <div className={styles.tags}>
        {pages && (
          <>
            <span>{toTitleCaseFromSnake(`${pages}`)} pages</span>
            <span>{' • '}</span>
          </>
        )}
        {genres.map((g) => (
          <span key={g} className={styles.pill}>
            {toTitleCaseFromSnake(g)}
          </span>
        ))}
      </div>
      <TruncatedText text={reviewText} />
      <p className={styles.date}>
        <small>{new Date(createdAt).toLocaleDateString()}</small>
      </p>
    </div>
  );
}
