// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'screenshot' | 'switch-keyboard' | 'ipc-example';

export type Keyboard = 'Crkbd' | 'Ergodox';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  takeScreenshot(rect: Electron.Rectangle) {
    ipcRenderer.send('screenshot', rect);
  },
  switchKeyboard(keyboard: Keyboard) {
    ipcRenderer.send('switch-keyboard', keyboard);
  },
  onSwitchKeyboard(handler: (keyboard: Keyboard) => void) {
    const subscription = (_event: IpcRendererEvent, keyboard: Keyboard) => handler(keyboard);
    ipcRenderer.on('switch-keyboard', subscription);
    return () => {
      ipcRenderer.removeListener('switch-keyboard', subscription);
    };
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
