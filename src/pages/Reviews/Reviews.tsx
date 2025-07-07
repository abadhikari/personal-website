import { SearchProvider } from './contexts/SearchContext';
import ReviewsInner from './ReviewsInner';
import ViewType from './types/viewType';

interface ReviewsProps {
  view: ViewType;
}

/**
 * Reviews is the top-level page component for displaying user-generated reviews.
 * It wraps `ReviewsInner` with `SearchProvider` to enable contextual search state.
 *
 * Features:
 * - Feed View:
 *   - Scrollable list of reviews via `ReviewsContent`.
 *   - Infinite scroll via `InfiniteScroll`.
 * - Map View:
 *   - Interactive map rendering geolocated reviews via `ReviewsMapContent`.
 *
 * @returns {JSX.Element} A toggleable reviews interface with feed and map views.
 */
export default function Reviews({ view }: ReviewsProps) {
  return (
    <SearchProvider>
      <ReviewsInner view={view} />
    </SearchProvider>
  );
}
