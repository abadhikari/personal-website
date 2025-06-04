interface DigitalRainSpinnerProps {
  className?: string;
}

/**
 * DigitalRainSpinner creates a Matrix-style rain animation using animated SVG text elements.
 * Best used for full-page or immersive loading sequences, not lightweight inline spinners.
 */
export default function DigitalRainSpinner({
  className,
}: DigitalRainSpinnerProps) {
  return (
    <svg
      className={className}
      width="60"
      height="60"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text x="10" y="0" fill="#60A5FA" fontSize="6" fontFamily="monospace">
        0
        <animate
          attributeName="y"
          values="-10;60"
          dur="1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          repeatCount="indefinite"
        />
      </text>
      <text x="18" y="0" fill="#60A5FA" fontSize="6" fontFamily="monospace">
        1
        <animate
          attributeName="y"
          values="-10;60"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </text>
      <text x="26" y="0" fill="#60A5FA" fontSize="6" fontFamily="monospace">
        0
        <animate
          attributeName="y"
          values="-10;60"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="2s"
          repeatCount="indefinite"
        />
      </text>
      <text x="34" y="0" fill="#60A5FA" fontSize="6" fontFamily="monospace">
        1
        <animate
          attributeName="y"
          values="-10;60"
          dur="2.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </text>
      <text x="42" y="0" fill="#60A5FA" fontSize="6" fontFamily="monospace">
        1
        <animate
          attributeName="y"
          values="-10;60"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="3s"
          repeatCount="indefinite"
        />
      </text>
    </svg>
  );
}
