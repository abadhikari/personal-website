import { motion, AnimatePresence } from 'framer-motion';
import { MediaStack } from '../../types/mediaTypes';
import MediaRenderer from './MediaRenderer';
import ViewType from '../../types/viewType';
import * as styles from '../../styles/Photos.module.css';

type MediaFeedProps = {
  stacks: MediaStack[];
  onClick: (index: number) => void;
  searchProcessing: boolean;
};

/**
 * Component for rendering a grid of media stacks with animation support.
 *
 * @param {Object} props - Props passed to the component.
 * @param {MediaStack[]} props.stacks - Array of media stacks to render.
 * @param {Function} props.onClick - Handler for selecting a media stack (by index).
 * @param {boolean} props.searchProcessing - Whether a search is actively loading results.
 *
 * @returns {JSX.Element} A grid of animated media tiles or a "No media found" message.
 */
export default function MediaFeed({
  stacks,
  onClick,
  searchProcessing,
}: MediaFeedProps) {
  const hasNoStacks = stacks.length === 0;

  return hasNoStacks && !searchProcessing ? (
    <p className={styles.noMedia}>No media found 😔.</p>
  ) : (
    <div className={styles.feedContainer}>
      <AnimatePresence>
        {stacks.map((stack, index) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              layout: { duration: 0.15, ease: 'easeOut' },
              opacity: { duration: 0.1, ease: 'easeOut' },
              y: { duration: 0.1, ease: 'easeOut' },
            }}
            key={stack.stack.stackId}
            className={styles.feedItem}
            onClick={() => onClick(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(index);
              }
            }}
          >
            <MediaRenderer
              media={stack.media[0]}
              viewType={ViewType.THUMBNAIL}
              className={styles.feedMedia}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
