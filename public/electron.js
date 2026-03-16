const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference to prevent garbage collection
let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 500,
    minHeight: 400,
    title: 'Todo App',
    webPreferences: {
      nodeIntegration: false,      // Security best practice
      contextIsolation: true,      // Security best practice
    },
  });

  // Decide what to load:
  // - In development: load from React dev server (localhost:3000)
  // - In production: load from built files
  
  const startUrl =
  //   process.env.ELECTRON_START_URL || 'http://localhost:3000';
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../build/index.html'),
      protocol: 'file:',
      slashes: true,
    });

  mainWindow.loadURL(startUrl);

  // Uncomment this line to open DevTools automatically during development:
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Create window when Electron is ready
app.on('ready', createWindow);

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Re-create window on macOS when dock icon is clicked
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
