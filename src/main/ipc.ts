/* eslint no-console: off */
import { ipcMain, clipboard, Rectangle } from 'electron';
import { getMainWindow } from './window';
import { handleKeyboardSwitch } from './tray';
import { icons } from './resources';

export function setupIpcHandlers() {
  ipcMain.on('ipc-example', async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    event.reply('ipc-example', msgTemplate('pong'));
  });

  ipcMain.on('screenshot', (_event, rect: Rectangle) => {
    const mainWindow = getMainWindow();
    mainWindow?.webContents
      .capturePage(rect)
      .then((img) => clipboard.writeImage(img, 'clipboard'));
  });

  ipcMain.on(
    'switch-keyboard',
    (_event, selectedKeyboard: keyof typeof icons) => {
      const mainWindow = getMainWindow();
      if (mainWindow) {
        handleKeyboardSwitch(mainWindow, selectedKeyboard);
      }
    },
  );
}
