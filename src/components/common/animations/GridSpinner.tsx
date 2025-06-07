interface GridSpinnerProps {
  width: number;
  height: number;
  className?: string;
}

/**
 * GridSpinner is a dynamic SVG-based loading indicator composed of a 3x3 grid of animated squares.
 * Each block animates with a pulsating opacity and border-radius to create a soft ripple effect.
 *
 * - Animation is handled via inline `<style>` with `@keyframes`.
 * - Fill color inherits from `currentColor`, enabling easy theming via text classes.
 * - Intended for more prominent loading states (e.g., full-page loads).
 */
export default function GridSpinner({
  width,
  height,
  className,
}: GridSpinnerProps) {
  const grid = [
    { x: 10, y: 10, delay: '0s' },
    { x: 22, y: 10, delay: '0.1s' },
    { x: 34, y: 10, delay: '0.2s' },
    { x: 10, y: 22, delay: '0.3s' },
    { x: 22, y: 22, delay: '0.4s' },
    { x: 34, y: 22, delay: '0.5s' },
    { x: 10, y: 34, delay: '0.6s' },
    { x: 22, y: 34, delay: '0.7s' },
    { x: 34, y: 34, delay: '0.8s' },
  ];

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
          .grid-spinner__block {
            fill: currentColor;
            opacity: 0.2;
          }
          @keyframes gridSpinnerPulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
          @keyframes gridSpinnerRound {
            0%, 100% { rx: 0; }
            50% { rx: 4; }
          }
        `}
      </style>
      {grid.map(({ x, y, delay }) => (
        <rect
          key={`${x}-${y}`}
          className="grid-spinner__block"
          x={x}
          y={y}
          width="8"
          height="8"
        >
          <animate
            attributeName="opacity"
            values="0.2;1;0.2"
            dur="1.5s"
            begin={delay}
            repeatCount="indefinite"
          />
          <animate
            attributeName="rx"
            values="0;4;0"
            dur="1.5s"
            begin={delay}
            repeatCount="indefinite"
          />
        </rect>
      ))}
    </svg>
  );
}
