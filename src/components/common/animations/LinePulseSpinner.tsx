interface LinePulseProps {
  width: number;
  height: number;
  className?: string;
}

/**
 * LinePulse is a vertical stack of 3 animated horizontal bars with a subtle glossy fill.
 * Each bar pulses using opacity animation and is styled via currentColor with a vertical gradient.
 *
 * - Ideal for inline loading indicators near text-heavy content like reviews.
 * - Uses a top-to-bottom gradient fill to simulate a soft sheen.
 * - `currentColor` ensures automatic theming with surrounding text.
 * - Optimized using SVG `<animate>` for high performance.
 */
export default function LinePulseSpinner({
  width,
  height,
  className,
}: LinePulseProps) {
  const lines = [
    { y: 8, delay: '0s' },
    { y: 22, delay: '0.2s' },
    { y: 36, delay: '0.4s' },
  ];

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="glossyFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.7" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <style>
        {`
          .line-pulse__bar {
            fill: url(#glossyFill);
          }
        `}
      </style>
      {lines.map(({ y, delay }) => (
        <rect
          key={y}
          className="line-pulse__bar"
          x="8"
          y={y}
          width="40"
          height="10"
          rx="2"
          opacity="0.4"
        >
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="1.5s"
            begin={delay}
            repeatCount="indefinite"
          />
        </rect>
      ))}
    </svg>
  );
}
