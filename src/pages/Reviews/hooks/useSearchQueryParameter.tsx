import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { fromSlug } from '../../../utils/slug';

/**
 * Custom hook to extract and decode the `search` query parameter from the URL.
 *
 * This used to load a default search state (e.g., from a shared link).
 * Converts a slugified search string (e.g. "blue-bottle") back to its original form (e.g. "Blue Bottle").
 *
 * @returns {string | undefined} The decoded search query from the URL, or undefined if not present.
 */
export default function useSearchQueryParameter(): string | undefined {
  const location = useLocation();

  return useMemo(() => {
    const params = new URLSearchParams(location.search);
    const slug = params.get('search');
    return slug ? fromSlug(slug) : undefined;
  }, [location.search]);
}
