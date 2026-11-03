"use client";

import React, { useEffect, useRef } from 'react';
import { Navigation, Clock, Compass, ExternalLink } from 'lucide-react';
import {
  ComputedRouteData,
  CoreLibrary,
  GoogleMapInstance,
  GoogleMarkerInstance,
  GooglePolylineInstance,
  LUXURY_DARK_MAP_STYLES,
  MapsLibrary,
  loadGoogleMapsApi,
} from '@/lib/google-maps';
import styles from './RouteMapPreview.module.css';

interface RouteMapPreviewProps {
  routeData: ComputedRouteData | null;
  etaTime: string;
  etaSubtitle: string;
  isCalculating: boolean;
  errorMessage: string | null;
}

const RouteMapPreview: React.FC<RouteMapPreviewProps> = ({
  routeData,
  etaTime,
  etaSubtitle,
  isCalculating,
  errorMessage,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<GoogleMapInstance | null>(null);
  const overlaysRef = useRef<Array<GoogleMarkerInstance | GooglePolylineInstance>>([]);

  useEffect(() => {
    if (!routeData) {
      for (const item of overlaysRef.current) {
        item.setMap(null);
      }
      overlaysRef.current = [];
      if (!mapContainerRef.current) {
        mapInstanceRef.current = null;
        mapElementRef.current = null;
      }
      return;
    }

    const containerEl = mapContainerRef.current;
    if (!containerEl) return;

    let cancelled = false;

    const renderMap = async () => {
      try {
        const mapsNamespace = await loadGoogleMapsApi();
        if (cancelled || !mapContainerRef.current) return;

        const mapsLib = (await mapsNamespace.importLibrary('maps')) as MapsLibrary;
        const coreLib = (await mapsNamespace.importLibrary('core')) as CoreLibrary;
        const currentEl = mapContainerRef.current;
        if (cancelled || !currentEl) return;

        // Re-initialize Google Map whenever the underlying DOM container was remounted
        // (e.g. on a 2nd booking/quote in the same session or after clearing locations)
        if (!mapInstanceRef.current || mapElementRef.current !== currentEl) {
          mapInstanceRef.current = new mapsLib.Map(currentEl, {
            center: routeData.pickupCoords,
            zoom: 12,
            disableDefaultUI: true,
            zoomControl: true,
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            gestureHandling: 'cooperative',
            styles: LUXURY_DARK_MAP_STYLES,
          });
          mapElementRef.current = currentEl;
        }

        const map = mapInstanceRef.current;

        // Clear previous route overlays
        for (const item of overlaysRef.current) {
          item.setMap(null);
        }
        overlaysRef.current = [];

        // Outer subtle halo polyline
        const haloLine = new mapsLib.Polyline({
          path: routeData.path,
          geodesic: true,
          strokeColor: '#000000',
          strokeOpacity: 0.55,
          strokeWeight: 8,
          zIndex: 1,
          map,
        });

        // Primary luxury gold route polyline
        const routeLine = new mapsLib.Polyline({
          path: routeData.path,
          geodesic: true,
          strokeColor: '#c9a86a',
          strokeOpacity: 0.96,
          strokeWeight: 4.5,
          zIndex: 2,
          map,
        });

        overlaysRef.current.push(haloLine, routeLine);

        // Pickup (A) & Drop-off (B) markers
        if (mapsNamespace.Marker) {
          const pickupMarker = new mapsNamespace.Marker({
            position: routeData.pickupCoords,
            map,
            title: `Pickup: ${routeData.pickupAddress}`,
            label: {
              text: 'A',
              color: '#000000',
              fontWeight: '800',
              fontSize: '11px',
            },
            icon: {
              path: coreLib.SymbolPath.CIRCLE,
              scale: 11,
              fillColor: '#c9a86a',
              fillOpacity: 1,
              strokeColor: '#0b0e14',
              strokeWeight: 2.5,
            },
            zIndex: 4,
          });

          const dropoffMarker = new mapsNamespace.Marker({
            position: routeData.dropoffCoords,
            map,
            title: `Destination: ${routeData.dropoffAddress}`,
            label: {
              text: 'B',
              color: '#ffffff',
              fontWeight: '800',
              fontSize: '11px',
            },
            icon: {
              path: coreLib.SymbolPath.CIRCLE,
              scale: 11,
              fillColor: '#111827',
              fillOpacity: 1,
              strokeColor: '#c9a86a',
              strokeWeight: 2.5,
            },
            zIndex: 4,
          });

          overlaysRef.current.push(pickupMarker, dropoffMarker);
        }

        // Fit map bounds around the entire driving path
        const bounds = new coreLib.LatLngBounds();
        bounds.extend(routeData.pickupCoords);
        bounds.extend(routeData.dropoffCoords);
        for (const pt of routeData.path) {
          bounds.extend(pt);
        }
        map.fitBounds(bounds, { top: 44, right: 44, bottom: 44, left: 44 });
      } catch {
        // Handled gracefully by parent error state if route API fails
      }
    };

    void renderMap();

    return () => {
      cancelled = true;
    };
  }, [routeData]);

  if (!isCalculating && !routeData && !errorMessage) {
    return null;
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.headerBadge}>
          <Navigation size={14} />
          Best Chauffeur Route &amp; Live ETA
        </span>

        {routeData?.googleMapsUrl && (
          <a
            href={routeData.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalLink}
          >
            <span>Open in Google Maps</span>
            <ExternalLink size={13} />
          </a>
        )}
      </div>

      {errorMessage && !routeData ? (
        <div className={styles.errorBox}>{errorMessage}</div>
      ) : (
        <>
          <div className={styles.mapStage}>
            <div ref={mapContainerRef} className={styles.mapCanvas} />
            {isCalculating && (
              <div className={styles.loadingOverlay}>
                <span className={styles.spinner} />
                <span>Calculating optimal route &amp; travel ETA...</span>
              </div>
            )}
          </div>

          {routeData && (
            <>
              <div className={styles.telemetryGrid}>
                <div className={styles.metricCell}>
                  <span className={styles.metricLabel}>
                    <Compass size={12} />
                    Distance
                  </span>
                  <span className={styles.metricValue}>{routeData.distanceText}</span>
                  <span className={styles.metricSub}>Best driving route</span>
                </div>

                <div className={styles.metricCell}>
                  <span className={styles.metricLabel}>
                    <Clock size={12} />
                    Travel Time
                  </span>
                  <span className={styles.metricValue}>{routeData.durationText}</span>
                  <span className={styles.metricSub}>Traffic-aware estimate</span>
                </div>

                <div className={styles.metricCell}>
                  <span className={styles.metricLabel}>
                    <Navigation size={12} />
                    Est. Arrival (ETA)
                  </span>
                  <span className={`${styles.metricValue} ${styles.metricAccent}`}>{etaTime}</span>
                  <span className={styles.metricSub}>{etaSubtitle}</span>
                </div>
              </div>

              <div className={styles.endpointsBar}>
                <div className={styles.endpointRow}>
                  <span className={styles.badgeA}>A</span>
                  <span className={styles.endpointText}>{routeData.pickupAddress}</span>
                </div>
                <div className={styles.endpointRow}>
                  <span className={styles.badgeB}>B</span>
                  <span className={styles.endpointText}>{routeData.dropoffAddress}</span>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default RouteMapPreview;

