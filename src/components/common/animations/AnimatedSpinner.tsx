interface AnimatedSpinnerProps {
  className?: string;
}

/**
 * AnimatedSpinner is a minimalist SVG-based loading indicator composed of three pulsing circles.
 * It uses inline CSS animations to create a smooth, lightweight visual cue during loading states.
 *
 * - Animation is handled via inline `<style>` with `@keyframes`.
 * - Fill color inherits from the `currentColor` of the applied class (e.g., `text-white`).
 */
export default function AnimatedSpinner({ className }: AnimatedSpinnerProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
          .spinner_b2T7 {
            animation: spinner_xe7Q 0.8s linear infinite;
            fill: currentColor;
          }
          .spinner_YRVV {
            animation-delay: -0.65s;
          }
          .spinner_c9oY {
            animation-delay: -0.5s;
          }
          @keyframes spinner_xe7Q {
            46.875% {
              r: 0.2px;
            }
            93.75%, 100% {
              r: 3px;
            }
          }
        `}
      </style>
      <circle className="spinner_b2T7" cx="4" cy="12" r="3" />
      <circle className="spinner_b2T7 spinner_YRVV" cx="12" cy="12" r="3" />
      <circle className="spinner_b2T7 spinner_c9oY" cx="20" cy="12" r="3" />
    </svg>
  );
}
