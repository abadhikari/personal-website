import { useEffect, useRef, useState } from 'react';
import maplibregl, { Map as MapLibre } from 'maplibre-gl';

import { GeoReview, Review } from '../../types/reviewTypes';
import ViewType from '../../types/viewType';
import ReviewRenderer from '../ReviewRenderer';

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

type ReviewsMapProps = { reviews: Review[] };

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

  const [selected, setSelected] = useState<Review | null>(null);

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

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear previous
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Add markers
    reviews.filter(hasGeolocation).forEach((r) => {
      const { latitude, longitude } = r.subcontent;

      const marker = new maplibregl.Marker({
        color: getColorByRating(r.rating),
      })
        .setLngLat([longitude, latitude])
        .addTo(mapRef.current!);

      marker.getElement().addEventListener('click', () => {
        setSelected(r);
        mapRef.current!.flyTo({
          center: [longitude, latitude],
          zoom: 13,
          offset: [0, -100],
        });
      });

      markersRef.current.push(marker);
    });
  }, [reviews]);

  useEffect(
    () => () => {
      markersRef.current.forEach((m) => m.remove());
      mapRef.current?.remove();
    },
    []
  );

  return (
    <div className={styles.mapWrapper}>
      <div ref={containerRef} className={styles.mapContainer} />

      <MapLegend />
      <MapControls mapRef={mapRef} />

      {selected && (
        <aside className={styles.sidePanel}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setSelected(null)}
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
