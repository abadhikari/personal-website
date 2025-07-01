interface SymbolScoreProps {
  score: number;
  max: number;
  symbol: string;
  size?: number;
}

/**
 * Renders a visual representation of a score using repeated symbols (e.g., stars, dollar signs).
 *
 * Displays `max` number of symbols, with full opacity for the first `score` symbols
 * and reduced opacity for the remainder. Can optionally scale the symbol size.
 *
 * @param {SymbolScoreProps} props - Component props.
 * @param {number} props.score - The current score (e.g., 3 out of 5).
 * @param {number} props.max - The maximum score to represent (e.g., 5).
 * @param {string} props.symbol - The symbol to display for each unit (e.g., "⭐️").
 * @param {number} [props.size=1] - Optional font size multiplier in rem units (default is 1).
 *
 * @returns {JSX.Element} A span element for each symbol, styled based on the score.
 */
export default function SymbolScore({
  score,
  max,
  symbol,
  size = 1,
}: SymbolScoreProps) {
  return (
    <>
      {[...Array(max)].map((_, i) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={`${symbol}-${i}`}
          style={{
            opacity: i < score ? 1 : 0.3,
            fontSize: `${size}rem`,
            lineHeight: 1,
          }}
        >
          {symbol}
        </span>
      ))}
    </>
  );
}
