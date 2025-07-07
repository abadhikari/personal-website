import { useEffect, useRef, useState } from 'react';
import maplibregl, { Map as MapLibre } from 'maplibre-gl';

import { isMobile } from '../../../../utils/deviceType';
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
  const autoSelectRef = useRef(true);

  const [selected, setSelected] = useState<Review | null>(null);

  const reviewsWithGeolocation = reviews.filter(hasGeolocation);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Set default center to Manhattan
    mapRef.current = new maplibregl.Map({
      container: containerRef.current,
      style: 'https://tiles.stadiamaps.com/styles/alidade_smooth.json',
      center: [-73.9857, 40.7484],
      zoom: 11.5,
      attributionControl: false,
    });
  }, []);

  const handleMarkerClick = (review: Review) => {
    setSelected(review);
    const { latitude, longitude } = review.subcontent as GeoReview;
    const targetZoom = isMobile() ? 12.5 : 13.5;
    const currentZoom = mapRef.current!.getZoom();
    mapRef.current!.flyTo({
      center: [longitude, latitude],
      zoom: currentZoom > targetZoom ? currentZoom : targetZoom,
      offset: [0, -100],
    });
  };

  useEffect(() => {
    const hasSingleResult = reviewsWithGeolocation.length === 1;
    const selectedId = selected?.reviewId;

    const shouldAutoSelect =
      hasSingleResult &&
      autoSelectRef.current &&
      (!selectedId || !(reviewsWithGeolocation[0].reviewId === selectedId));

    if (shouldAutoSelect) {
      handleMarkerClick(reviewsWithGeolocation[0]);
      autoSelectRef.current = false;
    }
  }, [reviewsWithGeolocation, selected]);

  useEffect(() => {
    autoSelectRef.current = true;
  }, [reviews]);

  useEffect(() => {
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
  }, [reviews, selected]);

  useEffect(
    () => () => {
      markersRef.current.forEach((marker) => marker.remove());
      mapRef.current?.remove();
    },
    []
  );

  return (
    <div className={styles.mapWrapper}>
      <div ref={containerRef} className={styles.mapContainer} />

      <SearchBar reviews={reviewsWithGeolocation} viewType={ViewType.MAP} />
      <MapLegend />
      <MapControls mapRef={mapRef} />

      {selected && (
        <aside className={styles.sidePanel}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => {
              setSelected(null);
              autoSelectRef.current = false;
            }}
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
