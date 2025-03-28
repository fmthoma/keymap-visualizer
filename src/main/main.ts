/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import { app } from 'electron';
import * as net from 'net';
import * as fs from 'fs';
import {
  createWindow,
  showWindow,
  hideWindow,
  toggleWindow,
  getKeepInBackground,
} from './window';
import { setupIpcHandlers } from './ipc';

const SOCKET_FILE = '/tmp/keymap.sock';

let socketServer: net.Server | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (!getKeepInBackground() && process.platform !== 'darwin') {
    app.quit();
  }
});

const singleInstanceLock = app.requestSingleInstanceLock();

if (!singleInstanceLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    showWindow().catch(console.log);
  });
  app
    .whenReady()
    .then(createWindow)
    .then(() => {
      app.on('activate', () => {
        showWindow().catch(console.log);
      });
    })
    .catch(console.log);
}

app.on('ready', () => {
  if (fs.existsSync(SOCKET_FILE)) {
    fs.unlinkSync(SOCKET_FILE);
  }

  socketServer = net
    .createServer((stream) => {
      stream.on('data', (data) => {
        switch (data.toString()) {
          case 'restore':
            showWindow().catch(console.log);
            break;
          case 'hide':
            hideWindow();
            break;
          case 'toggle':
            toggleWindow();
            break;
          default:
            console.log(`Unknown message: "${data.toString()}`);
            break;
        }
      });
    })
    .listen(SOCKET_FILE);

  setupIpcHandlers();
});

app.on('before-quit', () => {
  if (socketServer) {
    socketServer.close();
    socketServer = null;
  }
  if (fs.existsSync(SOCKET_FILE)) {
    fs.unlinkSync(SOCKET_FILE);
  }
});
