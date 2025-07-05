import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import * as styles from '../../styles/ReviewCards.module.css';

interface TruncatedTextProps {
  text: string;
  maxLength?: number;
}

/**
 * Renders a truncated version of a long text with a toggleable "Read more / Read less" option.
 * When expanded, the rest of the text fades in using a smooth animation.
 *
 * Props:
 * @param {string} text - The full text to potentially truncate.
 * @param {number} [maxLength=250] - The number of characters to show before truncating.
 *
 * Behavior:
 * - If the text length is under `maxLength`, it renders the full text with no toggle.
 * - If the text exceeds `maxLength`, only the first `maxLength` characters are shown by default.
 * - Clicking "Read more" expands the text and animates the reveal.
 * - Clicking "Read less" collapses the extra text with an exit animation.
 *
 * Animation:
 * - Uses Framer Motion to fade and expand/collapse the hidden portion of the text.
 */
export default function TruncatedText({
  text,
  maxLength = 250,
}: TruncatedTextProps) {
  const [expanded, setExpanded] = useState(false);
  const isTruncated = text.length > maxLength;

  const truncatedIndex = text.lastIndexOf(' ', maxLength);
  const visibleText = text.slice(
    0,
    truncatedIndex > 0 ? truncatedIndex : maxLength
  );
  const hiddenText = text.slice(visibleText.length);

  return (
    <>
      <p>
        <span>
          {visibleText}
          {isTruncated && !expanded && '...'}
          <AnimatePresence mode="wait">
            {isTruncated && expanded && (
              <motion.span
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'inline' }}
              >
                {hiddenText}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </p>

      {isTruncated && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className={styles.readMoreBtn}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </>
  );
}
