import * as Location from 'expo-location';

export type Coords = { latitude: number; longitude: number };

/** Devuelve la ubicación actual o null si no hay permiso o no se pudo obtener. */
export async function getCoords(): Promise<Coords | null> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return null;
    const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
    return { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
  } catch {
    return null;
  }
}
