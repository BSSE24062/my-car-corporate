export interface LatLngPoint {
  lat: number;
  lng: number;
}

export interface PlaceSuggestionItem {
  placeId: string;
  mainText: string;
  secondaryText: string;
  fullText: string;
}

export interface ResolvedPlace {
  placeId?: string;
  address: string;
  mainText: string;
  coords: LatLngPoint;
}

export interface ComputedRouteData {
  distanceMeters: number;
  distanceText: string;
  durationSeconds: number;
  durationText: string;
  path: LatLngPoint[];
  encodedPolyline: string;
  pickupCoords: LatLngPoint;
  dropoffCoords: LatLngPoint;
  pickupAddress: string;
  dropoffAddress: string;
  googleMapsUrl: string;
}

export interface RouteSummaryPayload {
  distanceText: string;
  durationText: string;
  etaText: string;
  pickupCoords: LatLngPoint;
  dropoffCoords: LatLngPoint;
  encodedPolyline: string;
  googleMapsUrl: string;
}

/* Minimal runtime shapes for Google Maps JS API (v=weekly) without requiring @types/google.maps */
interface GoogleLatLngLike {
  lat: number | (() => number);
  lng: number | (() => number);
}

interface NewPlacePrediction {
  placeId: string;
  text?: { text?: string };
  mainText?: { text?: string };
  secondaryText?: { text?: string };
}

interface NewAutocompleteSuggestion {
  placePrediction?: NewPlacePrediction;
}

interface NewPlaceInstance {
  formattedAddress?: string;
  displayName?: string;
  location?: GoogleLatLngLike | null;
  fetchFields: (opts: { fields: string[] }) => Promise<void>;
}

interface LegacyPrediction {
  place_id: string;
  description: string;
  structured_formatting?: {
    main_text?: string;
    secondary_text?: string;
  };
}

interface PlacesLibrary {
  AutocompleteSessionToken: new () => object;
  AutocompleteSuggestion?: {
    fetchAutocompleteSuggestions: (req: {
      input: string;
      includedRegionCodes?: string[];
      language?: string;
      region?: string;
      sessionToken?: object;
    }) => Promise<{ suggestions?: NewAutocompleteSuggestion[] }>;
  };
  Place?: new (opts: { id: string }) => NewPlaceInstance;
  AutocompleteService?: new () => {
    getPlacePredictions: (req: {
      input: string;
      componentRestrictions?: { country: string | string[] };
      sessionToken?: object;
    }) => Promise<{ predictions: LegacyPrediction[] }>;
  };
}

interface GeocoderResultItem {
  place_id?: string;
  formatted_address?: string;
  geometry?: {
    location?: GoogleLatLngLike;
  };
}

interface GeocodingLibrary {
  Geocoder: new () => {
    geocode: (req: {
      placeId?: string;
      address?: string;
      region?: string;
      componentRestrictions?: { country: string };
    }) => Promise<{ results?: GeocoderResultItem[] }>;
  };
}

interface NewComputedRoute {
  distanceMeters?: number;
  durationMillis?: number;
  path?: GoogleLatLngLike[];
  localizedValues?: {
    distance?: string | { text?: string };
    duration?: string | { text?: string };
  };
}

interface LegacyDirectionsRoute {
  overview_path?: GoogleLatLngLike[];
  legs?: Array<{
    distance?: { text?: string; value?: number };
    duration?: { text?: string; value?: number };
    duration_in_traffic?: { text?: string; value?: number };
  }>;
}

interface RoutesLibrary {
  Route?: {
    computeRoutes: (req: {
      origin: LatLngPoint;
      destination: LatLngPoint;
      travelMode: string;
      routingPreference?: string;
      fields: string[];
    }) => Promise<{ routes?: NewComputedRoute[] }>;
  };
  DirectionsService?: new () => {
    route: (req: {
      origin: LatLngPoint;
      destination: LatLngPoint;
      travelMode: string;
    }) => Promise<{ routes?: LegacyDirectionsRoute[] }>;
  };
}

export interface GoogleMapStyleRule {
  featureType?: string;
  elementType?: string;
  stylers: Array<Record<string, string | number>>;
}

export interface GoogleMapInstance {
  fitBounds: (
    bounds: GoogleLatLngBoundsInstance,
    padding?: { top: number; right: number; bottom: number; left: number }
  ) => void;
  setCenter: (center: LatLngPoint) => void;
  setZoom: (zoom: number) => void;
}

export interface GoogleMarkerInstance {
  setMap: (map: GoogleMapInstance | null) => void;
}

export interface GooglePolylineInstance {
  setMap: (map: GoogleMapInstance | null) => void;
}

export interface GoogleLatLngBoundsInstance {
  extend: (point: LatLngPoint) => void;
}

export interface MapsLibrary {
  Map: new (
    el: HTMLElement,
    opts: {
      center: LatLngPoint;
      zoom: number;
      disableDefaultUI?: boolean;
      zoomControl?: boolean;
      fullscreenControl?: boolean;
      mapTypeControl?: boolean;
      streetViewControl?: boolean;
      gestureHandling?: string;
      styles?: GoogleMapStyleRule[];
    }
  ) => GoogleMapInstance;
  Polyline: new (opts: {
    path: LatLngPoint[];
    geodesic?: boolean;
    strokeColor: string;
    strokeOpacity: number;
    strokeWeight: number;
    zIndex?: number;
    map?: GoogleMapInstance;
  }) => GooglePolylineInstance;
}

export interface CoreLibrary {
  LatLngBounds: new () => GoogleLatLngBoundsInstance;
  SymbolPath: {
    CIRCLE: number;
  };
}

export interface LegacyMarkerConstructor {
  new (opts: {
    position: LatLngPoint;
    map: GoogleMapInstance;
    title?: string;
    label?: {
      text: string;
      color: string;
      fontWeight?: string;
      fontSize?: string;
    };
    icon?: {
      path: number;
      scale: number;
      fillColor: string;
      fillOpacity: number;
      strokeColor: string;
      strokeWeight: number;
    };
    zIndex?: number;
  }): GoogleMarkerInstance;
}

interface GoogleMapsNamespace {
  importLibrary: (name: string) => Promise<unknown>;
  Marker?: LegacyMarkerConstructor;
}

declare global {
  interface Window {
    google?: {
      maps?: GoogleMapsNamespace;
    };
    __eliteGoogleMapsInit?: () => void;
  }
}

export const GOOGLE_MAPS_API_KEY = (
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
).trim();

export function isGoogleMapsConfigured(): boolean {
  return Boolean(
    GOOGLE_MAPS_API_KEY &&
      !GOOGLE_MAPS_API_KEY.toLowerCase().includes('your_') &&
      GOOGLE_MAPS_API_KEY.length > 15
  );
}

let mapsLoaderPromise: Promise<GoogleMapsNamespace> | null = null;

/**
 * Dynamically loads the Google Maps JavaScript API (`v=weekly`, Australia region)
 * once per browser session and returns `window.google.maps`.
 */
export function loadGoogleMapsApi(): Promise<GoogleMapsNamespace> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google Maps can only load in the browser.'));
  }

  if (!isGoogleMapsConfigured()) {
    return Promise.reject(new Error('Google Maps API key is not configured.'));
  }

  if (window.google?.maps?.importLibrary) {
    return Promise.resolve(window.google.maps);
  }

  if (mapsLoaderPromise) {
    return mapsLoaderPromise;
  }

  mapsLoaderPromise = new Promise<GoogleMapsNamespace>((resolve, reject) => {
    const existingScript = document.getElementById('elite-google-maps-sdk') as HTMLScriptElement | null;
    if (existingScript) {
      const checkReady = () => {
        if (window.google?.maps?.importLibrary) {
          resolve(window.google.maps);
        } else {
          reject(new Error('Google Maps SDK loaded without importLibrary.'));
        }
      };
      existingScript.addEventListener('load', checkReady, { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Google Maps SDK.')), {
        once: true,
      });
      return;
    }

    window.__eliteGoogleMapsInit = () => {
      if (window.google?.maps) {
        resolve(window.google.maps);
      } else {
        mapsLoaderPromise = null;
        reject(new Error('Google Maps namespace unavailable after initialization.'));
      }
    };

    const script = document.createElement('script');
    script.id = 'elite-google-maps-sdk';
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      GOOGLE_MAPS_API_KEY
    )}&v=weekly&loading=async&region=AU&language=en-AU&callback=__eliteGoogleMapsInit`;
    script.onerror = () => {
      mapsLoaderPromise = null;
      reject(new Error('Unable to load Google Maps script.'));
    };
    document.head.appendChild(script);
  });

  return mapsLoaderPromise;
}

function toLatLngPoint(loc: GoogleLatLngLike | null | undefined): LatLngPoint | null {
  if (!loc) return null;
  const lat = typeof loc.lat === 'function' ? loc.lat() : loc.lat;
  const lng = typeof loc.lng === 'function' ? loc.lng() : loc.lng;
  if (typeof lat !== 'number' || typeof lng !== 'number' || Number.isNaN(lat) || Number.isNaN(lng)) {
    return null;
  }
  return { lat, lng };
}

export async function createAutocompleteSessionToken(): Promise<object | undefined> {
  if (!isGoogleMapsConfigured()) return undefined;
  try {
    const maps = await loadGoogleMapsApi();
    const placesLib = (await maps.importLibrary('places')) as PlacesLibrary;
    return new placesLib.AutocompleteSessionToken();
  } catch {
    return undefined;
  }
}

/**
 * Fetches Uber/inDrive-style autocomplete suggestions restricted to Australia (`au`).
 * Supports Places API (New) with automatic fallback to legacy AutocompleteService.
 */
export async function fetchAustralianPlaceSuggestions(
  input: string,
  sessionToken?: object
): Promise<PlaceSuggestionItem[]> {
  const trimmed = input.trim();
  if (trimmed.length < 2 || !isGoogleMapsConfigured()) {
    return [];
  }

  const maps = await loadGoogleMapsApi();
  const placesLib = (await maps.importLibrary('places')) as PlacesLibrary;

  // 1. Primary: Places API (New) — AutocompleteSuggestion
  if (placesLib.AutocompleteSuggestion?.fetchAutocompleteSuggestions) {
    try {
      const { suggestions = [] } =
        await placesLib.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: trimmed,
          includedRegionCodes: ['au'],
          language: 'en-AU',
          region: 'au',
          sessionToken,
        });

      const mapped: PlaceSuggestionItem[] = [];
      for (const item of suggestions) {
        const pred = item.placePrediction;
        if (!pred?.placeId) continue;
        const fullText = pred.text?.text || '';
        const mainText = pred.mainText?.text || fullText.split(',')[0] || fullText;
        const secondaryText =
          pred.secondaryText?.text ||
          fullText.slice(mainText.length).replace(/^,\s*/, '');
        if (fullText || mainText) {
          mapped.push({
            placeId: pred.placeId,
            mainText,
            secondaryText,
            fullText: fullText || `${mainText}${secondaryText ? `, ${secondaryText}` : ''}`,
          });
        }
      }
      if (mapped.length > 0) {
        return mapped.slice(0, 6);
      }
    } catch {
      // Fall through to legacy AutocompleteService if Places API (New) is not enabled
    }
  }

  // 2. Fallback: Legacy Places AutocompleteService
  if (placesLib.AutocompleteService) {
    const service = new placesLib.AutocompleteService();
    const response = await service.getPlacePredictions({
      input: trimmed,
      componentRestrictions: { country: 'au' },
      sessionToken,
    });
    return (response.predictions || []).slice(0, 6).map((p) => ({
      placeId: p.place_id,
      mainText: p.structured_formatting?.main_text || p.description.split(',')[0] || p.description,
      secondaryText: p.structured_formatting?.secondary_text || '',
      fullText: p.description,
    }));
  }

  return [];
}

/**
 * Resolves a selected suggestion (or typed Australian address) into exact coordinates & formatted label.
 */
export async function resolvePlaceSelection(
  suggestion: PlaceSuggestionItem
): Promise<ResolvedPlace | null> {
  const maps = await loadGoogleMapsApi();
  const placesLib = (await maps.importLibrary('places')) as PlacesLibrary;

  // 1. Primary: Places API (New) Place.fetchFields
  if (placesLib.Place) {
    try {
      const place = new placesLib.Place({ id: suggestion.placeId });
      await place.fetchFields({
        fields: ['formattedAddress', 'displayName', 'location'],
      });
      const coords = toLatLngPoint(place.location);
      if (coords) {
        const formatted = place.formattedAddress || suggestion.fullText;
        const display = place.displayName || suggestion.mainText;
        const address =
          display && !formatted.toLowerCase().includes(display.toLowerCase())
            ? `${display}, ${formatted}`
            : formatted;
        return {
          placeId: suggestion.placeId,
          address,
          mainText: display,
          coords,
        };
      }
    } catch {
      // Fall back to Geocoder below
    }
  }

  // 2. Fallback: Geocoder by placeId
  const geocodingLib = (await maps.importLibrary('geocoding')) as GeocodingLibrary;
  const geocoder = new geocodingLib.Geocoder();
  const res = await geocoder.geocode({ placeId: suggestion.placeId });
  const first = res.results?.[0];
  const coords = toLatLngPoint(first?.geometry?.location);
  if (!coords) return null;

  return {
    placeId: suggestion.placeId,
    address: suggestion.fullText || first?.formatted_address || suggestion.mainText,
    mainText: suggestion.mainText,
    coords,
  };
}

/**
 * Geocodes a free-text Australian address when a user types manually without clicking a suggestion.
 */
export async function geocodeAustralianAddress(rawAddress: string): Promise<ResolvedPlace | null> {
  const trimmed = rawAddress.trim();
  if (trimmed.length < 4 || !isGoogleMapsConfigured()) return null;

  try {
    const maps = await loadGoogleMapsApi();
    const geocodingLib = (await maps.importLibrary('geocoding')) as GeocodingLibrary;
    const geocoder = new geocodingLib.Geocoder();
    const res = await geocoder.geocode({
      address: trimmed,
      region: 'AU',
      componentRestrictions: { country: 'AU' },
    });
    const first = res.results?.[0];
    const coords = toLatLngPoint(first?.geometry?.location);
    if (!coords) return null;

    return {
      placeId: first?.place_id,
      address: first?.formatted_address || trimmed,
      mainText: trimmed.split(',')[0] || trimmed,
      coords,
    };
  } catch {
    return null;
  }
}

export function formatDistanceMeters(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  const km = meters / 1000;
  return km >= 100 ? `${Math.round(km)} km` : `${km.toFixed(1)} km`;
}

export function formatDurationSeconds(seconds: number): string {
  const totalMinutes = Math.max(1, Math.round(seconds / 60));
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (hours === 0) {
    return `${totalMinutes} min${totalMinutes === 1 ? '' : 's'}`;
  }
  if (mins === 0) {
    return `${hours} hr${hours === 1 ? '' : 's'}`;
  }
  return `${hours} hr ${mins} min`;
}

/**
 * Computes human-readable Estimated Time of Arrival (ETA) either from the user's
 * selected `pickupTime` (`HH:mm`) or from the current live clock.
 */
export function computeEtaDisplay(
  durationSeconds: number,
  pickupDate?: string,
  pickupTime?: string
): { etaTime: string; etaSubtitle: string; etaFullText: string } {
  const formatClock = (d: Date) =>
    d.toLocaleTimeString('en-AU', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

  if (pickupTime && /^\d{1,2}:\d{2}$/.test(pickupTime.trim())) {
    const [hStr, mStr] = pickupTime.trim().split(':');
    const hours = parseInt(hStr, 10);
    const minutes = parseInt(mStr, 10);
    const base = pickupDate ? new Date(`${pickupDate}T00:00:00`) : new Date();
    if (!Number.isNaN(base.getTime())) {
      base.setHours(hours, minutes, 0, 0);
      const arrival = new Date(base.getTime() + durationSeconds * 1000);
      const etaTime = formatClock(arrival);
      const departLabel = formatClock(base);
      return {
        etaTime,
        etaSubtitle: `From ${departLabel} pickup`,
        etaFullText: `${etaTime} (based on ${departLabel} pickup)`,
      };
    }
  }

  const arrivalNow = new Date(Date.now() + durationSeconds * 1000);
  const etaTime = formatClock(arrivalNow);
  return {
    etaTime: `~${etaTime}`,
    etaSubtitle: 'If departing now',
    etaFullText: `~${etaTime} (live estimate if departing now)`,
  };
}

/**
 * Downsamples a coordinate path so Static Maps URLs remain compact while preserving route shape.
 */
function downsamplePath(points: LatLngPoint[], maxPoints = 110): LatLngPoint[] {
  if (points.length <= maxPoints) return points;
  const result: LatLngPoint[] = [points[0]];
  const step = (points.length - 1) / (maxPoints - 1);
  for (let i = 1; i < maxPoints - 1; i++) {
    result.push(points[Math.round(i * step)]);
  }
  result.push(points[points.length - 1]);
  return result;
}

function encodeSignedNumber(num: number): string {
  let sgnNum = num < 0 ? ~(num << 1) : num << 1;
  let encoded = '';
  while (sgnNum >= 0x20) {
    encoded += String.fromCharCode((0x20 | (sgnNum & 0x1f)) + 63);
    sgnNum >>= 5;
  }
  encoded += String.fromCharCode(sgnNum + 63);
  return encoded;
}

/**
 * Encodes a sequence of coordinates using Google's Encoded Polyline Algorithm Format.
 */
export function encodePolyline(points: LatLngPoint[]): string {
  let prevLat = 0;
  let prevLng = 0;
  let result = '';

  for (const point of points) {
    const lat = Math.round(point.lat * 1e5);
    const lng = Math.round(point.lng * 1e5);
    result += encodeSignedNumber(lat - prevLat);
    result += encodeSignedNumber(lng - prevLng);
    prevLat = lat;
    prevLng = lng;
  }

  return result;
}

export function buildGoogleMapsDirectionsUrl(
  pickupAddress: string,
  dropoffAddress: string,
  pickupCoords?: LatLngPoint,
  dropoffCoords?: LatLngPoint
): string {
  const params = new URLSearchParams({
    api: '1',
    origin: pickupAddress || (pickupCoords ? `${pickupCoords.lat},${pickupCoords.lng}` : ''),
    destination:
      dropoffAddress || (dropoffCoords ? `${dropoffCoords.lat},${dropoffCoords.lng}` : ''),
    travelmode: 'driving',
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/**
 * Computes the optimal driving route between Pickup and Destination.
 * Uses Google Routes API (`Route.computeRoutes`) with automatic fallback to `DirectionsService`.
 */
export async function calculateDrivingRoute(
  pickup: ResolvedPlace,
  dropoff: ResolvedPlace
): Promise<ComputedRouteData> {
  const maps = await loadGoogleMapsApi();
  const routesLib = (await maps.importLibrary('routes')) as RoutesLibrary;
  const googleMapsUrl = buildGoogleMapsDirectionsUrl(
    pickup.address,
    dropoff.address,
    pickup.coords,
    dropoff.coords
  );

  // 1. Primary: Routes API (New) — Route.computeRoutes
  if (routesLib.Route?.computeRoutes) {
    try {
      const { routes = [] } = await routesLib.Route.computeRoutes({
        origin: pickup.coords,
        destination: dropoff.coords,
        travelMode: 'DRIVING',
        routingPreference: 'TRAFFIC_AWARE',
        fields: ['durationMillis', 'distanceMeters', 'path', 'localizedValues'],
      });

      const best = routes[0];
      if (best) {
        const distanceMeters = best.distanceMeters ?? 0;
        const durationSeconds = Math.round((best.durationMillis ?? 0) / 1000);
        const rawPath = (best.path || [])
          .map((p) => toLatLngPoint(p))
          .filter((p): p is LatLngPoint => p !== null);
        const path = rawPath.length >= 2 ? rawPath : [pickup.coords, dropoff.coords];

        const locDist = best.localizedValues?.distance;
        const locDur = best.localizedValues?.duration;
        const distanceText =
          (typeof locDist === 'string' ? locDist : locDist?.text) ||
          formatDistanceMeters(distanceMeters);
        const durationText =
          (typeof locDur === 'string' ? locDur : locDur?.text) ||
          formatDurationSeconds(durationSeconds);

        return {
          distanceMeters,
          distanceText,
          durationSeconds,
          durationText,
          path,
          encodedPolyline: encodePolyline(downsamplePath(path)),
          pickupCoords: pickup.coords,
          dropoffCoords: dropoff.coords,
          pickupAddress: pickup.address,
          dropoffAddress: dropoff.address,
          googleMapsUrl,
        };
      }
    } catch {
      // Fall back to DirectionsService below
    }
  }

  // 2. Fallback: Legacy DirectionsService
  if (routesLib.DirectionsService) {
    const directionsService = new routesLib.DirectionsService();
    const result = await directionsService.route({
      origin: pickup.coords,
      destination: dropoff.coords,
      travelMode: 'DRIVING',
    });

    const best = result.routes?.[0];
    const leg = best?.legs?.[0];
    if (best && leg) {
      const distanceMeters = leg.distance?.value ?? 0;
      const durationSeconds = leg.duration_in_traffic?.value ?? leg.duration?.value ?? 0;
      const rawPath = (best.overview_path || [])
        .map((p) => toLatLngPoint(p))
        .filter((p): p is LatLngPoint => p !== null);
      const path = rawPath.length >= 2 ? rawPath : [pickup.coords, dropoff.coords];

      return {
        distanceMeters,
        distanceText: leg.distance?.text || formatDistanceMeters(distanceMeters),
        durationSeconds,
        durationText:
          leg.duration_in_traffic?.text ||
          leg.duration?.text ||
          formatDurationSeconds(durationSeconds),
        path,
        encodedPolyline: encodePolyline(downsamplePath(path)),
        pickupCoords: pickup.coords,
        dropoffCoords: dropoff.coords,
        pickupAddress: pickup.address,
        dropoffAddress: dropoff.address,
        googleMapsUrl,
      };
    }
  }

  throw new Error('Unable to compute driving route between selected locations.');
}

export const LUXURY_DARK_MAP_STYLES: GoogleMapStyleRule[] = [
  { elementType: 'geometry', stylers: [{ color: '#131720' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#131720' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#9aa3b2' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#e2e8f0' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8a94a6' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#172026' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#242b38' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#181d27' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#333c4e' }],
  },
  {
    featureType: 'transit.station.airport',
    elementType: 'geometry.fill',
    stylers: [{ color: '#212838' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0b0f17' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#536075' }],
  },
];

