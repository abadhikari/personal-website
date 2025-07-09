import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { LngLatLike, type Map, Marker } from 'maplibre-gl';

import { isMobile } from '../../../../utils/deviceType';

import LocateIcon from './LocateIcon';

import * as styles from '../../styles/ReviewsMap.module.css';

interface MapControlsProps {
  mapRef: React.MutableRefObject<Map | null>;
}

/**
 * MapControls provides interactive UI elements for controlling the map,
 * including zoom in/out buttons and a locate-me feature that centers the
 * map on the user's current geolocation and drops a marker.
 *
 * - Zoom buttons update the map zoom level by ±1.
 * - The locate button triggers the Geolocation API, centers the map, and drops an emoji marker.
 *
 * This component is positioned relative to the map view and styled using CSS Modules.
 *
 * @component
 * @param {MapControlsProps} props
 * @returns {JSX.Element}
 */
export default function MapControls({ mapRef }: MapControlsProps) {
  const zoomIn = useCallback(() => {
    const currentZoom = mapRef.current?.getZoom();
    if (currentZoom !== undefined) {
      mapRef.current?.zoomTo(currentZoom + 1);
    }
  }, [mapRef]);

  const zoomOut = useCallback(() => {
    const currentZoom = mapRef.current?.getZoom();
    if (currentZoom !== undefined) {
      mapRef.current?.zoomTo(currentZoom - 1);
    }
  }, [mapRef]);

  const zoomOutToGlobeView = useCallback(() => {
    const center: LngLatLike | undefined = isMobile() ? [-40, 25] : [0, 20];
    const zoom = isMobile() ? 0.7 : 1.5;
    if (!mapRef.current) return;
    mapRef.current.flyTo({
      center,
      zoom,
      bearing: 0,
      pitch: 0,
      speed: 2,
      curve: 1.5,
      essential: true,
    });
  }, [mapRef]);

  /**
   * Creates a DOM element representing the user location pin (an emoji).
   * @returns {HTMLDivElement} The styled emoji marker element.
   */
  const createUserPin = () => {
    const userPinElement = document.createElement('div');
    userPinElement.innerText = '🫃';
    userPinElement.style.fontSize = '2rem';
    return userPinElement;
  };

  /**
   * Uses the Geolocation API to find the user's current position.
   * If successful, it flies the map to the location and drops a marker.
   * Displays toast notifications on failure.
   */
  const locateUser = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const center: LngLatLike | undefined = [longitude, latitude];

        mapRef.current?.flyTo({
          center,
          zoom: 14,
          essential: true,
        });

        // Drop user pin
        new Marker({ element: createUserPin() })
          .setLngLat(center)
          .addTo(mapRef.current!);
      },
      () => {
        toast.error('Unable to retrieve your location');
      },
      { enableHighAccuracy: true }
    );
  }, [mapRef]);

  return (
    <div className={styles.mapControls}>
      <button
        type="button"
        onClick={locateUser}
        className={`${styles.mapButton} ${styles.locateButton}`}
        title="Find my location"
      >
        <LocateIcon />
      </button>
      <div className={styles.mapZoomButtons}>
        <button
          type="button"
          onClick={zoomIn}
          className={`${styles.mapButton} ${styles.zoomButton}`}
        >
          +
        </button>
        <button
          type="button"
          onClick={zoomOut}
          className={`${styles.mapButton} ${styles.zoomButton}`}
        >
          −
        </button>
      </div>
      <button
        type="button"
        onClick={zoomOutToGlobeView}
        className={`${styles.mapButton} ${styles.globeButton}`}
        title="Global View"
      >
        🌎
      </button>
    </div>
  );
}
