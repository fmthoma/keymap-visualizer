import path from 'path';
import { app } from 'electron';

const isDevUnpackaged = !app.isPackaged && __dirname.includes('.erb/dll');

const RESOURCES_PATH = isDevUnpackaged
  ? path.join(__dirname, '../../assets')
  : path.join(process.resourcesPath, 'assets');

export function getAssetPath(...paths: string[]): string {
  return path.join(process.env.RESOURCES_PATH ?? RESOURCES_PATH, ...paths);
}

export const icons = {
  Crkbd: getAssetPath('crkbd.png'),
  Ergodox: getAssetPath('ergodox.png'),
} as const;
