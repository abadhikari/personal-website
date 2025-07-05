/**
 * `LocateIcon` renders an SVG crosshair icon used in the "locate me" map control button.
 *
 * The icon consists of:
 * - An inner filled circle (🟦) representing the user's location.
 * - An outer ring and four cardinal lines to suggest a targeting reticle.
 *
 * @returns {JSX.Element} A 20x20 SVG element styled with blue stroke and filled center dot.
 */
export default function LocateIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      width="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3b82f6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" fill="#3b82f6" stroke="none" />
      <circle cx="12" cy="12" r="8" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
    </svg>
  );
}
