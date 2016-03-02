const ipcMain = require('electron').ipcMain,
      exec = require('child_process').exec;

ipcMain.on('launch-cmd', function(event, cmd) {
  console.log(cmd);
  exec('npm run compileJS', function(error, stdout, stderr){
    console.log(stdout);
    event.sender.send('response-launch-cmd', error ? false : true);
  });
});

ipcMain.on('restart', function(event) {
  webContents.reload();
});