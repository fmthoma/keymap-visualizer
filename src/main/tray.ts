import { Tray, Menu, BrowserWindow, ipcMain } from 'electron';
import { icons } from './resources';

let tray: Tray | null = null;

function setupTrayMenu(
  mainWindow: BrowserWindow,
  keyboard: keyof typeof icons,
) {
  const trayContextMenu = Menu.buildFromTemplate([
    { label: 'Open', click: () => ipcMain.emit('show-window') },
    { type: 'separator' },
    {
      label: 'Crkbd',
      type: 'radio',
      checked: keyboard === 'Crkbd',
      click: () => {
        mainWindow?.webContents.send('switch-keyboard', 'Crkbd');
        tray?.setImage(icons.Crkbd);
        mainWindow?.setIcon(icons.Crkbd);
      },
    },
    {
      label: 'Ergodox',
      type: 'radio',
      checked: keyboard === 'Ergodox',
      click: () => {
        mainWindow?.webContents.send('switch-keyboard', 'Ergodox');
        tray?.setImage(icons.Ergodox);
        mainWindow?.setIcon(icons.Ergodox);
      },
    },
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
  selectedKeyboard: keyof typeof icons,
) {
  if (!Object.keys(icons).includes(selectedKeyboard)) return;
  setupTrayMenu(mainWindow, selectedKeyboard);
  tray?.setImage(icons[selectedKeyboard]);
  mainWindow?.setIcon(icons[selectedKeyboard]);
}
