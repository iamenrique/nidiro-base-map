type KnownPlaceName = 'NYC' | 'MexicoCity' | 'SanFrancisco';
type KnownPlaceData = {lonLat: [lon: number, lat: number]; zoom: number};
export const KnownPlaces: Record<KnownPlaceName, KnownPlaceData> = {
  NYC: {lonLat: [-74.006, 40.7128], zoom: 10},
  SanFrancisco: {lonLat: [-122.4194, 37.7749], zoom: 10},
  MexicoCity: {lonLat: [-99.1332, 19.4326], zoom: 12},
};
