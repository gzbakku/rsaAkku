const electron = require('electron');
const app = electron.app;
const browser = electron.BrowserWindow;
const ipc = require('hadron-ipc');

let win;

function createWindow(){

  let windowSize = {w:400,h:600};
  // windowSize = {w:800,h:600};

  win = new browser({
    width: windowSize.w,
    height: windowSize.h,
    frame:false,
    transparent: true,
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadFile('electric.html');
  // win.webContents.openDevTools();
}

ipc.respondTo('close', (sender) => {
  app.quit();
});

app.on('ready', createWindow);
