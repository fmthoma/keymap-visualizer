/* eslint global-require: off, no-console: off */
import path from 'path';
import { BrowserWindow, shell, Menu, app } from 'electron';
import { resolveHtmlPath } from './util';
import { icons } from './resources';
import { initializeTray } from './tray';
import { installExtensions } from './development';

const isDevUnpackaged =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

let mainWindow: BrowserWindow | null = null;
let isQuitting = false;

export function getMainWindow(): BrowserWindow | null {
  return mainWindow;
}

export async function createWindow() {
  if (isDevUnpackaged) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1280,
    height: 1024,
    icon: icons.Crkbd,
    webPreferences: {
      preload: isDevUnpackaged
        ? path.join(__dirname, '../../.erb/dll/preload.js')
        : path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  Menu.setApplicationMenu(null);

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  mainWindow.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault();
      if (mainWindow && !mainWindow.isDestroyed()) mainWindow.hide();
    }
  });

  // Initialize tray after window is created
  initializeTray(mainWindow);

  return mainWindow;
}

export async function showWindow() {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
  } else {
    await createWindow();
  }
}

export function hideWindow() {
  mainWindow?.hide();
}

export function toggleWindow() {
  if (mainWindow && mainWindow.isFocused()) {
    hideWindow();
  } else {
    showWindow();
  }
}

export function quitApp() {
  isQuitting = true;
  mainWindow?.close();
  app.quit();
}
