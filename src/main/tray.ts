import {
  Tray,
  Menu,
  BrowserWindow,
  ipcMain,
  MenuItemConstructorOptions,
} from 'electron';
import { icons } from './resources';
import { Keyboard, keyboards } from '../types';

let tray: Tray | null = null;

function setupTrayMenu(mainWindow: BrowserWindow, keyboard: Keyboard) {
  const trayContextMenu = Menu.buildFromTemplate([
    { label: 'Open', click: () => ipcMain.emit('show-window') },
    { type: 'separator' },
    ...keyboards.map(
      (kb) =>
        ({
          label: kb,
          type: 'radio',
          checked: keyboard === kb,
          click: () => {
            mainWindow?.webContents.send('switch-keyboard', kb);
            tray?.setImage(icons[kb]);
            mainWindow?.setIcon(icons[kb]);
          },
        }) as MenuItemConstructorOptions,
    ),
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => ipcMain.emit('quit-app'),
    },
  ]);
  tray?.setContextMenu(trayContextMenu);
}

function setupTrayClickHandler(mainWindow: BrowserWindow) {
  tray?.on('click', () => {
    if (mainWindow && mainWindow.isFocused()) {
      ipcMain.emit('hide-window');
    } else {
      ipcMain.emit('show-window');
    }
  });
}

export function initializeTray(mainWindow: BrowserWindow) {
  tray = new Tray(icons.Crkbd);
  tray.setToolTip('Keymap Visualizer');
  setupTrayMenu(mainWindow, 'Crkbd');
  setupTrayClickHandler(mainWindow);
}

export function handleKeyboardSwitch(
  mainWindow: BrowserWindow,
  selectedKeyboard: Keyboard,
) {
  if (!Object.keys(icons).includes(selectedKeyboard)) return;
  setupTrayMenu(mainWindow, selectedKeyboard);
  tray?.setImage(icons[selectedKeyboard]);
  mainWindow?.setIcon(icons[selectedKeyboard]);
}
