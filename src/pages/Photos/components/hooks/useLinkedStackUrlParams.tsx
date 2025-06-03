import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Represents URL parameters for loading a shared or linked media stack.
 *
 * - `stackId`: ID of the stack to load. Required to trigger a fetch.
 * - `mediaId`: Optional ID of the media to initially focus on.
 */
export type LinkedStackUrlParams = {
  stackId?: string;
  mediaId?: string;
};

/**
 * Extracts linked stack parameters from the URL.
 *
 * @returns {Object} - Object containing stackId and mediaId from URL search params.
 */
export default function useLinkedStackUrlParams(): LinkedStackUrlParams {
  const location = useLocation();

  return useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    const stackId = searchParams.get('stackId') || undefined;
    const mediaId = searchParams.get('mediaId') || undefined;
    return { stackId, mediaId };
  }, [location.search]);
}
