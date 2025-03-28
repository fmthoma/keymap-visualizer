import { Tray, Menu, BrowserWindow } from 'electron';
import { icons } from './resources';
import { quitApp } from './window';

let tray: Tray | null = null;

function setupTrayMenu(
  mainWindow: BrowserWindow,
  keyboard: keyof typeof icons,
) {
  const trayContextMenu = Menu.buildFromTemplate([
    { label: 'Open', click: () => mainWindow?.show() },
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
      click: () => quitApp(),
    },
  ]);
  tray?.setContextMenu(trayContextMenu);
}

function setupTrayClickHandler(mainWindow: BrowserWindow) {
  tray?.on('click', () => {
    if (mainWindow && mainWindow.isFocused()) {
      mainWindow.hide();
    } else {
      mainWindow?.show();
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
