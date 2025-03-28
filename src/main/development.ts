/* eslint global-require: off, no-console: off */

export const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

export function setupDevelopmentTools() {
  if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
  }

  if (isDebug) {
    require('electron-debug')();
  }
}
