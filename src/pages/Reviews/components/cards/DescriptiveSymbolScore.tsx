import { useState } from 'react';

import SymbolScore from './SymbolScore';

import * as styles from '../../styles/ReviewCards.module.css';

interface DescriptiveSymbolScoreProps {
  score: number;
  max: number;
  symbol: string;
  size?: number;
  descriptions?: Record<number, string>;
}

/**
 * A reusable component that displays a symbol-based score (e.g. stars, dollars)
 * and optionally shows a tooltip description on hover/tap.
 *
 * @component
 * @param {number} score - The score value to render (e.g. 4 out of 5).
 * @param {number} max - The maximum score value.
 * @param {string} symbol - The symbol to repeat (e.g. '⭐️', '$').
 * @param {number} [size=1] - Optional rem-based size of symbols.
 * @param {Record<number, string>} [descriptions] - Optional map of score to tooltip text.
 */
export default function DescriptiveSymbolScore({
  score,
  max,
  symbol,
  size = 0.8,
  descriptions,
}: DescriptiveSymbolScoreProps) {
  const [hovered, setHovered] = useState(false);
  const hasDescription = descriptions && descriptions[score];

  return (
    <div className={styles.tooltipWrapper}>
      <div
        className={styles.tooltipContainer}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered((h) => !h)}
      >
        <SymbolScore score={score} max={max} symbol={symbol} size={size} />
        {hovered && hasDescription && (
          <div className={styles.tooltip}>{descriptions![score]}</div>
        )}
      </div>
    </div>
  );
}
