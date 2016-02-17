'use strict';

// require('./server');
const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    enableLargerThanScreen: true
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/layout.html');

  // Open the DevTools.
  var webContents = mainWindow.webContents;
  
  webContents.openDevTools();
  
  ipcMain.on('launch-cmd', function(event, cmd) {
    var exec = require('child_process').exec;
    exec(cmd, function(error, stdout, stderr){
      event.sender.send('launch-cmd-reply', {error:error, stdout:stdout, stderr:stderr});
    });
  });

  ipcMain.on('restart', function(event) {
    webContents.reload();
  });
 
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    // mainWindow = null;
  });
});