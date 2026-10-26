import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { AppError } from '../utils/errors';

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB, igual que en la Edge Function

export type PreparedPhoto = { uri: string; base64: string };

/**
 * Reduce la foto antes de enviarla: ahorra datos, tiempo y costo de IA.
 * Máx. 1024 px de ancho, JPEG calidad 0.6.
 */
export async function preparePhoto(uri: string): Promise<PreparedPhoto> {
  const ref = await ImageManipulator.manipulate(uri).resize({ width: 1024 }).renderAsync();
  const out = await ref.saveAsync({ format: SaveFormat.JPEG, compress: 0.6, base64: true });
  if (!out.base64) throw new AppError('unknown');
  if (Math.floor((out.base64.length * 3) / 4) > MAX_BYTES) throw new AppError('fileTooBig');
  return { uri: out.uri, base64: out.base64 };
}
