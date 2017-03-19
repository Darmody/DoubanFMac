const { app, BrowserWindow, ipcMain } = require('electron')

let mainWin
let lyricsWin

const HOST = 'http://localhost:8080'
const HEIGHT = 659
const WIDTH = 800
const createWindow = (options, url = HOST) => {
  const win = new BrowserWindow(options)

  win.loadURL(url)

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
  }, `${HOST}/app`)
  lyricsWin = createWindow({
    width: 0,
    height: HEIGHT,
    frame: false,
    parent: mainWin,
    hasShadow: false,
    movable: false,
    resizable: false,
  }, `${HOST}/lyrics`)

  // events
  ipcMain.on('lyricsWindow', (event, message) => {
    const opening = () => {
      const mainPosition = mainWin.getPosition()
      const lyricsPosition = lyricsWin.getPosition()
      const lyricsPositionX = (mainPosition[0] + WIDTH) - 10

      if (
        (lyricsPositionX !== lyricsPosition[0]) ||
        (mainPosition[1] !== lyricsPosition[1])
      ) {
        lyricsWin.setPosition(lyricsPositionX, mainPosition[1])
      }

      lyricsWin.setSize(300, HEIGHT, true)
    }
    const closing = () => {
      lyricsWin.setSize(0, HEIGHT, true)
      mainWin.focus()
    }

    const toggling = () => {
      if (lyricsWin.getSize()[0] === 0) {
        opening()
      } else {
        closing()
      }
    }

    switch (message) {
      case 'close': closing(); break
      case 'open': opening(); break
      case 'toggle':
      default: toggling()
    }
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
