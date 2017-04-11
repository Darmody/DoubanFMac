const { app, BrowserWindow } = require('electron')

let mainWin

const HOST = 'http://localhost:8080'
const HEIGHT = 659
const WIDTH = 800
const createWindow = options => {
  const win = new BrowserWindow(options)

  win.loadURL(HOST)

  win.on('closed', () => {
    mainWin = null
  })

  return win
}

app.on('ready', () => {
  mainWin = createWindow({
    width: WIDTH,
    height: HEIGHT,
    hasShadow: false,
    titleBarStyle: 'hidden',
    resizable: false,
    webPreferences: { webSecurity: false },
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWin === null) {
    createWindow()
  }
})
