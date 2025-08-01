import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import ApiError from '../../../../errors/ApiError';
import log from '../../../../utils/logger';
import { Lookup, LookupType } from '../../types/uploadTypes';
import readLookups from '../api/readLookup';
import writeLookup from '../api/writeLookup';

function isAbortError(error: unknown): error is DOMException {
  return error instanceof DOMException && error.name === 'AbortError';
}

/**
 * Hook to fetch lookup entries on-demand.
 *
 * @returns {{
 *   lookups: Lookup[],
 *   isLoading: boolean,
 *   error: Error | null,
 *   fetchLookups: (type: LookupType, query?: string) => Promise<void>
 * }}
 */
export default function useLookups() {
  const [lookups, setLookups] = useState<Lookup[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const controllerRef = useRef<AbortController | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const isFetchingRef = useRef(false);

  const fetchLookups = useCallback(async (type: LookupType, query?: string) => {
    if (isFetchingRef.current) {
      return;
    }

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      const data = await readLookups(type, query, controller.signal);
      setLookups(data);
    } catch (err) {
      if (!isAbortError(err)) {
        log.error('Failed to fetch lookups:', err);
        toast.error('Failed to load lookup values.');
      }
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
      controllerRef.current = null;
    }
  }, []);

  const onLookup = useCallback(
    (type: LookupType, query?: string): Promise<void> => {
      return new Promise((resolve) => {
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }

        const debounceDuration = 300;
        debounceTimeout.current = setTimeout(async () => {
          await fetchLookups(type, query);
          resolve();
        }, debounceDuration);
      });
    },
    [fetchLookups]
  );

  const onWriteLookup = useCallback(
    async (type: LookupType, newValue: string): Promise<Lookup | null> => {
      try {
        const created = await writeLookup(type, newValue);

        setLookups((prev) => [...prev, created]);

        toast.success(`Added "${created.name}"`);
        return created;
      } catch (err) {
        if (err instanceof ApiError && err.status === 409) {
          toast.error('This value already exists.');
        } else {
          log.error('Failed to write lookup:', err);
          toast.error('Failed to write new lookup.');
        }
        return null;
      }
    },
    []
  );

  return { lookups, isLoading, onLookup, onWriteLookup };
}
