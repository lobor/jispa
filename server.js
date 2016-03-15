var app  = require('express.io')(),
    exec = require('child_process').exec,
    Q    = require('q'),
    jsdom = require("jsdom"),
    url = require('url');
    
app.http().io();

app.get(/(\.js|\.css|\.woff(\?v=2.0.1 )?|\.ttf)/, function (req, res) {
	res.sendfile(__dirname + req.url.replace(/\?.+/g,''));
});


app.get('*', function (req, res) {
  res.sendfile(__dirname + '/layout.html');
});


// app.io.route('launch-cmd', function(req) {
//   console.log(req.data);
//   // exec('npm run compileJS', function(error, stdout, stderr){
//   //   console.log(stdout);
//   //   req.io.respond(error ? false : true);
//   // });
// });

app.io.route('speak', function(req) {
  console.log(req.data);
  exec('pico2wave -l fr-FR -w ./test.wav "' + req.data + '" && aplay ./test.wav', function(){
    
  });
});



app.listen(8080);






