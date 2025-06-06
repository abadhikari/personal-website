import React from 'react';
import MediaFeed from './MediaFeed';
import { MediaStack } from '../../types/mediaTypes';
import * as styles from '../../styles/Photos.module.css';
import * as animationStyles from '../../../../styles/animations.module.css';

type PhotosContentProps = {
  query: string;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  visibleStacks: MediaStack[];
  searchProcessing: boolean;
  onThumbnailClick: (index: number) => void;
};

/**
 * Renders the main content for the Photos page, including a search bar and a feed of media stacks.
 *
 * @param {Object} props - Component props.
 * @param {string} props.query - Current value of the search input.
 * @param {Function} props.onQueryChange - Handler to update the search query.
 * @param {React.RefObject<HTMLInputElement>} props.searchInputRef - Ref for the search input element.
 * @param {MediaStack[]} props.visibleStacks - The stacks of media currently visible (filtered or all).
 * @param {boolean} props.searchProcessing - Whether a search is currently in progress.
 * @param {Function} props.onThumbnailClick - Handler for clicking a media stack thumbnail.
 *
 * @returns {JSX.Element} A section containing a search input and media feed.
 */
export default function PhotosContent({
  query,
  onQueryChange,
  searchInputRef,
  visibleStacks,
  searchProcessing,
  onThumbnailClick,
}: PhotosContentProps) {
  return (
    <div className={`${styles.photosContainer} ${animationStyles.fadeInUp}`}>
      <h1>My Photos</h1>
      <div className="divider" />
      <p>A collection of photos and videos I&apos;ve taken.</p>

      <input
        type="text"
        ref={searchInputRef}
        placeholder="🔍  Search by keywords..."
        value={query}
        onChange={onQueryChange}
        className={styles.searchInput}
      />

      <MediaFeed
        stacks={visibleStacks}
        onClick={onThumbnailClick}
        searchProcessing={searchProcessing}
      />
    </div>
  );
}
