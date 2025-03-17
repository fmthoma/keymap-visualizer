/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, Menu, Tray } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import * as net from 'net';
import * as fs from 'fs';
import { resolveHtmlPath } from './util';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

const SOCKET_FILE = '/tmp/keymap.sock';

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

let keepInBackground: boolean = true;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');
  
    console.log(`RESOURCES_PATH: ${RESOURCES_PATH}`);
    console.log(`process.env.RESOURCES_PATH: ${process.env.RESOURCES_PATH}`);

  const getAssetPath = (...paths: string[]): string => {
    return path.join(process.env.RESOURCES_PATH ?? RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1280,
    height: 1024,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
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
    if (keepInBackground) {
      e.preventDefault();
      if (mainWindow && !mainWindow.isDestroyed()) mainWindow.hide();
    }
  });

  mainWindow.on('closed', () => {
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.hide();
  });

  tray = new Tray(getAssetPath('icon.png'));
  tray.setToolTip('Keymap Visualizer');
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: 'Open', click: () => mainWindow?.show() },
      { type: 'separator' },
      {
        label: 'Quit',
        click: () => {
          keepInBackground = false;
          app.quit();
        },
      },
    ]),
  );
  tray.on('click', () => {
    if (mainWindow && mainWindow.isFocused()) mainWindow.hide();
    else mainWindow?.show();
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (!keepInBackground && process.platform !== 'darwin') {
    app.quit();
  }
});

const singleInstanceLock = app.requestSingleInstanceLock();

if (!singleInstanceLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.show();
    } else {
      createWindow();
    }
  });
  app
    .whenReady()
    .then(() => {
      createWindow();
      app.on('activate', () => {
        if (mainWindow) mainWindow.show();
        else createWindow();
      });
    })
    .catch(console.log);
}

app.on('ready', () => {
  if (fs.existsSync(SOCKET_FILE)) {
    fs.unlinkSync(SOCKET_FILE);
  }

  net
    .createServer((stream) => {
      stream.on('data', (data) => {
        switch (data.toString()) {
          case 'restore':
            if (mainWindow) mainWindow.show();
            else createWindow();
            break;
          case 'hide':
            mainWindow?.hide();
            break;
          case 'toggle':
            if (mainWindow && mainWindow.isFocused()) mainWindow.hide();
            else mainWindow?.show();
            break;
          default:
            console.log(`Unknown message: "${data.toString()}`);
            break;
        }
      });
    })
    .listen(SOCKET_FILE);
});
