import toTitleCaseFromSnake from '../../../../utils/toTitleCaseFromSnake';
import { Category, Review } from '../../types/reviewTypes';

import SymbolScore from './SymbolScore';
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
        <span className={styles.categoryEmoji}>📚</span>
        <h3>{title}</h3>
        <span className={styles.author}>
          by {author} {yearPublished ? `(${yearPublished})` : ''}
        </span>
      </div>
      {rating && (
        <p>
          <SymbolScore score={rating} symbol="⭐️" max={5} size={1.3} />
        </p>
      )}
      <div className={styles.tags}>
        {pages && (
          <>
            <span>{toTitleCaseFromSnake(`${pages}`)} pages</span>
            <span>{' • '}</span>
          </>
        )}
        <div className={styles.tagPills}>
          {genres.map((g) => (
            <span key={g} className={styles.pill}>
              {toTitleCaseFromSnake(g)}
            </span>
          ))}
        </div>
      </div>
      <TruncatedText text={reviewText} />
      <p className={styles.date}>
        <small>{new Date(createdAt).toLocaleDateString()}</small>
      </p>
    </div>
  );
}
