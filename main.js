/* eslint strict: 0 */
'use strict';

const electron = require('electron');
const app = electron.app;
const crashReporter = electron.crashReporter;
const menubar = require('menubar');

const options = {
  development: {
    index: `file://${__dirname}/app/hot-dev-app.html`,
    width: 1024,
    height: 728,
    tooltip: '豆瓣酱',
    'show-dock-icon': true,
  },
  production: {
    index: `file://${__dirname}/app/app.html`,
    width: 100,
    height: 100,
    tooltip: '豆瓣酱',
    'show-dock-icon': true,
  }
};

const mb = menubar(options[process.env.NODE_ENV || 'development']);

crashReporter.start();

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

mb.on('ready', () => {});

mb.on('after-create-window', () => {
  if (process.env.NODE_ENV === 'development') {
    mb.window.openDevTools();
  }
});
