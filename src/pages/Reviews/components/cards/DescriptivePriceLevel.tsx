import DescriptiveSymbolScore from './DescriptiveSymbolScore';

const priceLevelDescriptions: Record<number, string> = {
  5: `I think I'm in debt now.`,
  4: `Might need help with rent next month.`,
  3: 'Wallet stings a little.',
  2: 'Affordable - fairly priced.',
  1: `Budget-Friendly - not batting an eye`,
};

interface DescriptivePriceLevelProps {
  priceLevel: number;
}

/**
 * Displays a price level using the SymbolScore component and reveals
 * a short description of the price level on hover (desktop) or tap (mobile).
 *
 * Useful for providing context to pricing in a user-friendly way.
 *
 * @component
 * @param {Object} props
 * @param {number} props.priceLevel - A number from 1 to 5 representing the price tier.
 */
export default function DescriptivePriceLevel({
  priceLevel,
}: DescriptivePriceLevelProps) {
  return (
    <DescriptiveSymbolScore
      score={priceLevel}
      max={5}
      symbol="$"
      size={0.8}
      descriptions={priceLevelDescriptions}
    />
  );
}
