/* eslint strict: 0 */
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const electron = require('electron');
const storage = require('electron-json-storage');
const app = electron.app;
const globalShortcut = electron.globalShortcut;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const crashReporter = electron.crashReporter;
const config = require('./config');
let menu;
let template;
let mainWindow = null;

crashReporter.start({
  productName: 'doubanFMac',
  companyName: 'darmody',
  submitURL: 'http://github.com/darmody/doubanFMac/issues'
});

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


app.on('ready', () => {
  mainWindow = new BrowserWindow(config.window);

  const webContents = mainWindow.webContents;

  // set global shortcut
  const shortcuts = [
    { key: 'ctrl+alt+p', event: 'controlSong' },
    { key: 'ctrl+alt+l', event: 'likeSong' },
    { key: 'ctrl+alt+u', event: 'dislikeSong' },
    { key: 'ctrl+alt+n', event: 'nextSong' },
    { key: 'ctrl+alt+b', event: 'banSong' },
  ];

  app.shortcutPressed = event => () => {
    webContents.send('shortcut-pressed', event);
  };
  shortcuts.forEach((shortcut) => {
    globalShortcut.register(shortcut.key, app.shortcutPressed(shortcut.event));
  });

  // manipulate cookies for douban
  const getDoubanCookies = (webContents) => {
    storage.get(config.electronStorageKey, (error, data) => {
      if (error) {
        return console.log('Electron storage read error.', error);
      }
      if (data.cookies && data.cookies.length > 0) {
        data.cookies.forEach((cookie) => {
          webContents.session.cookies.set({
            name: cookie[0],
            value: cookie[1],
            url: 'http://douban.fm',
          }, (error) => {
            if (error) console.log('Douban cookie set error.', error);
          });
        });
      }
    });

  };
  const setDoubanCookies = (webContents, originalURL, headers) => {
    if (originalURL !== 'http://douban.fm/j/login') return;

    const cookies = (headers['set-cookie'] || []).map((cookie) => {
      return cookie.split(';')[0].split('=');
    });

    storage.set(config.electronStorageKey, { cookies }, (error) => {
      if (error) console.log('Douban cookie save to storage error', error);
    });
  };

  webContents.on('did-get-response-details', (event, status, newURL, originalURL, code, method, referrer, headers) => {
    setDoubanCookies(webContents, originalURL, headers);
  });

  getDoubanCookies(webContents);

  mainWindow.loadURL(`file://${__dirname}/app/app.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('close', (event) => {
    if (mainWindow.forceClose) return;
    event.preventDefault();
    mainWindow.hide();
  });

  app.on('before-quit', () => {
    mainWindow.forceClose = true;
  });

  app.on('activate', () => {
    mainWindow.show();
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  }

  if (process.platform === 'darwin') {
    template = [{
      label: '豆瓣FMac',
      submenu: [{
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        }
      }]
    }];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }
});