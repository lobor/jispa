var exec = require('child_process').exec;
module.exports = function restartNode(){
  exec('sudo /etc/init.d/node-app restart', function(error, stdout, stderr){
    // if(error) throw error;
    
    console.log(stdout);
  });
};
