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

function createTrayMenu(mainWindow: BrowserWindow, keyboard: Keyboard): Menu {
  return Menu.buildFromTemplate([
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
  tray.setContextMenu(createTrayMenu(mainWindow, 'Crkbd'));
  setupTrayClickHandler(mainWindow);
}

export function handleKeyboardSwitch(
  mainWindow: BrowserWindow,
  selectedKeyboard: Keyboard,
) {
  if (!Object.keys(icons).includes(selectedKeyboard)) return;
  tray?.setContextMenu(createTrayMenu(mainWindow, selectedKeyboard));
  tray?.setImage(icons[selectedKeyboard]);
  mainWindow?.setIcon(icons[selectedKeyboard]);
}
