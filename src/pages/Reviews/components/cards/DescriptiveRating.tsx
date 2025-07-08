import DescriptiveSymbolScore from './DescriptiveSymbolScore';

const ratingDescriptions: Record<number, string> = {
  5: 'Transcendent – one of the best experiences I’ve had. Possibly life changing.',
  4: 'Amazing – would highly recommend!',
  3: `Solid – it's definitely worth checking out.`,
  2: `Eh – it didn't leave much of an impression (forgettable).`,
  1: 'Trash – I hated it.',
};

interface DescriptiveRatingProps {
  rating: number;
}

/**
 * Displays a star rating using the SymbolScore component and reveals
 * a short description of the rating on hover (desktop) or tap (mobile).
 *
 * Useful for providing context to numeric ratings in a user-friendly way.
 *
 * @component
 * @param {Object} props
 * @param {number} props.rating - A number from 1 to 5 representing the rating score.
 */
export default function DescriptiveRating({ rating }: DescriptiveRatingProps) {
  return (
    <DescriptiveSymbolScore
      score={rating}
      max={5}
      symbol="⭐️"
      size={1.3}
      descriptions={ratingDescriptions}
    />
  );
}
