import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ContentCategory } from '../../Upload/types/uploadTypes';
import { CategoryBySlug, SlugByCategory } from '../types/reviewTypes';

/**
 * React hook that exposes the active review category via the URL and a setter to update it.
 *
 * - **Source of truth:** the `?category=<slug>` query param in the URL.
 * - **Getter:** returns the mapped `ContentCategory` or `null` if not set/unknown.
 * - **Setter:** writes the corresponding slug back to the URL, preserving other query params
 *   and using `replace: true` to avoid spamming browser history.
 *
 * This keeps navigation-level state shareable and back/forward friendly without duplicating local state.
 *
 * @returns {[ContentCategory | null, (next: ContentCategory | null) => void]}
 * A tuple of `[activeCategoryId, setActiveCategoryId]`.
 */
export default function useCategoryState(): [
  ContentCategory | null,
  (next: ContentCategory | null) => void,
] {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategoryId = useMemo(() => {
    const slug = searchParams.get('category');
    if (!slug) return null;
    return CategoryBySlug[slug] ?? null;
  }, [searchParams]);

  const setActiveCategoryId = (next: ContentCategory | null) => {
    const nextParams = new URLSearchParams(searchParams);
    if (next == null) nextParams.delete('category');
    else nextParams.set('category', SlugByCategory[next]);
    setSearchParams(nextParams, { replace: true });
  };

  return [activeCategoryId, setActiveCategoryId];
}
