import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

import log from '../../../../utils/logger';
import { Content } from '../../types/uploadTypes';
import getContents from '../api/getContents';

/**
 * Hook to fetch contents on-demand.
 *
 * @returns {{
 *   contents: Content[],
 *   isLoading: boolean,
 *   error: Error | null,
 *   fetchContents: (search?: string, limit?: number) => Promise<void>
 * }}
 */
export default function useContents() {
  const [contents, setContents] = useState<Content[]>([]);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchContents = useCallback(async (search?: string, limit?: number) => {
    const controller = new AbortController();
    setIsContentLoading(true);

    try {
      const data = await getContents(search, limit);
      setContents(data);
      setError(null);
    } catch (err) {
      if (!controller.signal.aborted) {
        log.error('Failed to fetch contents:', err);
        setError(err as Error);
        toast.error('Failed to load content list.');
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsContentLoading(false);
      }
    }

    return () => controller.abort();
  }, []);

  return { contents, isContentLoading, error, fetchContents };
}
