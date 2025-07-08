import { useState } from 'react';

import SymbolScore from './SymbolScore';

import * as styles from '../../styles/ReviewCards.module.css';

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
  const [hovered, setHovered] = useState(false);

  return (
    <div className={styles.tooltipWrapper}>
      <div
        className={styles.tooltipContainer}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered((h) => !h)}
      >
        <SymbolScore score={priceLevel} symbol="$" max={5} size={0.8} />
        {hovered && (
          <div className={styles.tooltip}>
            {priceLevelDescriptions[priceLevel] || 'Unknown price level'}
          </div>
        )}
      </div>
    </div>
  );
}
