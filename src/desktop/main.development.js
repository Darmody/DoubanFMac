const { app, BrowserWindow, ipcMain } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWin
let lyricsWin

const createWindow = (options) => {
  // Create the browser window.
  const win = new BrowserWindow(options)

  // and load the index.html of the app.
  win.loadURL('http://localhost:8080')

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWin = null
  })

  return win
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  mainWin = createWindow({
    width: 800, height: 600, hasShadow: false, titleBarStyle: 'hidden',
  })
  lyricsWin = createWindow({
    width: 0, height: 600, frame: false, parent: mainWin, hasShadow: false
  })

  // events
  ipcMain.on('lyricsWindow', (event, message) => {
    const opening = () => {
      const mainPosition = mainWin.getPosition()
      const lyricsPosition = lyricsWin.getPosition()

      if (
        ((mainPosition[0] + 790) !== lyricsPosition[0]) ||
        (mainPosition[1] !== lyricsPosition[1])
      ) {
        lyricsWin.setPosition(mainPosition[0] + 790, mainPosition[1])
      }

      lyricsWin.setSize(300, 600, true)
    }
    const closing = () => {
      lyricsWin.setSize(0, 600, true)
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
