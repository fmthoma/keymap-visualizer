/* eslint no-console: off */
import * as net from 'net';
import * as fs from 'fs';
import { showWindow, hideWindow, toggleWindow } from './window';

const SOCKET_FILE = '/tmp/keymap.sock';

let socketServer: net.Server | null = null;

function handleSocketMessage(data: Buffer) {
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
}

export function initializeSocketServer() {
  if (fs.existsSync(SOCKET_FILE)) {
    fs.unlinkSync(SOCKET_FILE);
  }

  socketServer = net
    .createServer((stream) => {
      stream.on('data', handleSocketMessage);
    })
    .listen(SOCKET_FILE);
}

export function cleanupSocketServer() {
  if (socketServer) {
    socketServer.close();
    socketServer = null;
  }
  if (fs.existsSync(SOCKET_FILE)) {
    fs.unlinkSync(SOCKET_FILE);
  }
}
