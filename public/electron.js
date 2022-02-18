const path = require('path');

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const fs = require('fs')
const ipcMain = require('electron').ipcMain

var win
function createWindow() {
  // Create the browser window.
    win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js") // use a preload script
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function hasWallet() {
    return fs.existsSync(path.join(__dirname, "data.enc.json"))
}

function isLoggedIn() {
    return fs.existsSync(path.join(__dirname, "data.dec.json"))
}

ipcMain.on('toMain', (ev,arg) => {
    console.log(hasWallet())
    console.log("ELECTRON: " + arg.action)
    if (arg.action == 'hasWallet') {
        win.webContents.send("fromMain", {type: "hasWallet", "hasWallet":hasWallet()});
    } 
    if (arg.action == 'isLoggedIn') {
        win.webContents.send("fromMain", {type: "isLoggedIn", "isLoggedIn":isLoggedIn()});
    }
})