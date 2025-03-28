/* eslint no-console: off */
import { ipcMain, clipboard, Rectangle } from 'electron';
import {
  getMainWindow,
  showWindow,
  hideWindow,
  toggleWindow,
  quitApp,
} from './window';
import { handleKeyboardSwitch } from './tray';
import { Keyboard } from '../types';

export function setupIpcHandlers() {
  ipcMain.on('screenshot', (_event, rect: Rectangle) => {
    const mainWindow = getMainWindow();
    mainWindow?.webContents
      .capturePage(rect)
      .then((img) => clipboard.writeImage(img, 'clipboard'));
  });

  ipcMain.on('switch-keyboard', (_event, selectedKeyboard: Keyboard) => {
    const mainWindow = getMainWindow();
    if (mainWindow) {
      handleKeyboardSwitch(mainWindow, selectedKeyboard);
    }
  });

  ipcMain.on('show-window', () => {
    showWindow().catch(console.log);
  });

  ipcMain.on('hide-window', () => {
    hideWindow();
  });

  ipcMain.on('toggle-window', () => {
    toggleWindow();
  });

  ipcMain.on('quit-app', () => {
    quitApp();
  });
}
