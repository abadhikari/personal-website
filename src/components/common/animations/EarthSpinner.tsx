interface EarthSpinnerProps {
  width: number;
  height: number;
  className?: string;
}

/**
 * EarthSpinner is a minimalist map loading indicator.
 *
 * - Central circle = Earth.
 * - Latitude and longitude arcs pulse in staggered sequence.
 * - 3D illusion created by layering front arcs darker and back arcs lighter.
 */
export default function EarthSpinner({
  width,
  height,
  className,
}: EarthSpinnerProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
          .earth-outline,
          .earth-arc-front,
          .earth-arc-back {
            fill: none;
            stroke: currentColor;
            stroke-linecap: round;
          }

          .earth-outline {
            stroke-width: 2;
            opacity: 0.2;
          }

          .earth-arc-back {
            stroke-width: 1.5;
            stroke-dasharray: 8 4;
            opacity: 0.15;
          }

          .earth-arc-front {
            stroke-width: 1.5;
            stroke-dasharray: 8 4;
            opacity: 0.5;
          }
        `}
      </style>

      {/* Earth Outline */}
      <circle className="earth-outline" cx="30" cy="30" r="18">
        <animate
          attributeName="opacity"
          values="0.2;0.4;0.2"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Back Arcs (lighter, behind the earth) */}
      <ellipse className="earth-arc-back" cx="30" cy="30" rx="10" ry="18" />
      <ellipse className="earth-arc-back" cx="30" cy="30" rx="18" ry="10" />

      {/* Front Arcs (darker, over the earth) */}
      <ellipse className="earth-arc-front" cx="30" cy="30" rx="10" ry="18">
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="1.2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </ellipse>

      <ellipse className="earth-arc-front" cx="30" cy="30" rx="18" ry="10">
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="1.2s"
          begin="0.6s"
          repeatCount="indefinite"
        />
      </ellipse>
    </svg>
  );
}
