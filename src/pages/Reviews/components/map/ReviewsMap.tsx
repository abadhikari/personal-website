import { useCallback, useEffect, useRef, useState } from 'react';
import maplibregl, { Map as MapLibre } from 'maplibre-gl';

import { isMobile } from '../../../../utils/deviceType';
import { useSearch } from '../../contexts/SearchContext';
import { GeoReview, Review } from '../../types/reviewTypes';
import ViewType from '../../types/viewType';
import ReviewRenderer from '../ReviewRenderer';
import SearchBar from '../search/SearchBar';

import MapControls from './MapControls';
import MapLegend, { getColorByRating } from './MapLegend';

import * as styles from '../../styles/ReviewsMap.module.css';

import 'maplibre-gl/dist/maplibre-gl.css';

/**
 * Checks if a review contains valid geolocation data.
 *
 * @param {Review} r - The review to check.
 * @returns {boolean} - True if the review contains latitude and longitude.
 */
const hasGeolocation = (
  r: Review
): r is Review & { subcontent: { latitude: number; longitude: number } } =>
  !!r.subcontent &&
  typeof (r.subcontent as GeoReview).latitude === 'number' &&
  typeof (r.subcontent as GeoReview).longitude === 'number';

type ReviewsMapProps = {
  reviews: Review[];
};

type MarkerClickOptions = {
  animate?: boolean;
};

/**
 * ReviewsMap component renders a MapLibre map populated with review markers.
 * On clicking a marker, a side panel slides in with the full review card.
 *
 * @param {ReviewsMapProps} props - Component props.
 * @param {Review[]} props.reviews - List of reviews, some of which may contain geolocation.
 */
export default function ReviewsMap({ reviews }: ReviewsMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibre | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  const [selectionWasManual, setSelectionWasManual] = useState(false);
  const [selected, setSelected] = useState<Review | null>(null);

  const { clearSearch } = useSearch();

  /**
   * Filters reviews to only those with valid latitude and longitude.
   */
  const reviewsWithGeolocation = reviews.filter(hasGeolocation);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return undefined;

    // Set default center to Manhattan
    mapRef.current = new maplibregl.Map({
      container: containerRef.current,
      style: 'https://tiles.stadiamaps.com/styles/alidade_smooth.json',
      center: [-73.9857, 40.7484],
      zoom: 11.5,
      attributionControl: false,
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      mapRef.current?.remove();
    };
  }, []);

  /**
   * Handles clicking on a marker: updates selection and animates map view to the location.
   *
   * @param {Review} review - The review to select and zoom into.
   */
  const handleMarkerClick = useCallback(
    (review: Review, options: MarkerClickOptions = {}) => {
      const { animate = true } = options;

      if (selected?.reviewId === review.reviewId) return;

      setSelected(review);
      const { latitude, longitude } = review.subcontent as GeoReview;
      const targetZoom = isMobile() ? 12.5 : 13.5;
      const currentZoom = mapRef.current!.getZoom();
      const nextZoom = currentZoom > targetZoom ? currentZoom : targetZoom;

      if (animate) {
        mapRef.current!.flyTo({
          center: [longitude, latitude],
          zoom: nextZoom,
          ...(isMobile() && { offset: [0, -100] }),
          speed: 1.5,
        });
      } else {
        mapRef.current!.jumpTo({
          center: [longitude, latitude],
          zoom: nextZoom,
        });
        if (isMobile()) {
          mapRef.current?.panBy([0, 100], { duration: 0 });
        }
      }
    },
    [selected]
  );

  /**
   * Clears the selected review and marks the deselection as manual
   * (e.g., user intentionally closed the side panel).
   */
  const handleSidePanelClose = () => {
    setSelected(null);
    setSelectionWasManual(true);
    if (reviewsWithGeolocation.length === 1) {
      clearSearch();
    }
  };

  /**
   * Adds map markers for all geolocated reviews.
   * Removes any existing markers before redrawing.
   * Highlights the currently selected review.
   */
  const placeMarkers = useCallback(() => {
    if (!mapRef.current) return;

    // Clear previous
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add markers
    reviewsWithGeolocation.forEach((review) => {
      const { latitude, longitude } = review.subcontent;

      const isSelected = selected?.reviewId === review.reviewId;

      const marker = new maplibregl.Marker({
        color: getColorByRating(review.rating),
        scale: isSelected ? 1.2 : 1,
      })
        .setLngLat([longitude, latitude])
        .addTo(mapRef.current!);

      marker
        .getElement()
        .addEventListener('click', () => handleMarkerClick(review));

      markersRef.current.push(marker);
    });
  }, [handleMarkerClick, reviewsWithGeolocation, selected]);

  /**
   * Auto-selects the only available review if:
   * - there's exactly one result
   * - nothing is currently selected or selected result differs
   * - the selection wasn't manually cleared
   */
  useEffect(() => {
    const hasSingleResult = reviewsWithGeolocation.length === 1;
    const selectedId = selected?.reviewId;

    const shouldAutoSelect =
      hasSingleResult &&
      !selectionWasManual &&
      reviewsWithGeolocation[0].reviewId !== selectedId;

    if (shouldAutoSelect) {
      handleMarkerClick(reviewsWithGeolocation[0], { animate: false });
    }
  }, [reviewsWithGeolocation, selected]);

  useEffect(() => {
    placeMarkers();
  }, [placeMarkers]);

  return (
    <div className={styles.mapWrapper}>
      <div ref={containerRef} className={styles.mapContainer} />

      <SearchBar
        reviews={reviewsWithGeolocation}
        viewType={ViewType.MAP}
        setSelectionWasManual={setSelectionWasManual}
      />
      <MapLegend />
      <MapControls mapRef={mapRef} />

      {selected && (
        <aside className={styles.sidePanel}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => handleSidePanelClose()}
            aria-label="Close panel"
          >
            ×
          </button>
          <ReviewRenderer review={selected} viewType={ViewType.MAP} />
        </aside>
      )}
    </div>
  );
}
