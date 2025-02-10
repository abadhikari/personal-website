import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { track } from '@vercel/analytics';

/**
 * Tracks page views in a React Single Page Application (SPA) using Vercel Analytics.
 *
 * Vercel Analytics automatically tracks only full page reloads. However, in an SPA,
 * internal navigation via React Router does not trigger full page reloads, meaning
 * page transitions won't be counted unless manually tracked.
 *
 * This component listens for route changes and manually sends a `pageview` event to
 * Vercel Analytics, ensuring all navigations are tracked.
 */
function TrackPageViews() {
  const location = useLocation();

  useEffect(() => {
    track('pageview');
  }, [location.pathname]);

  return null;
}

export default TrackPageViews;
