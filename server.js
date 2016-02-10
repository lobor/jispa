var express  = require('express.io'),
    app  = express(),
    jwt    = require('jsonwebtoken'),
    exec    = require('child_process').exec,
    session = require('express-session');
app.http().io();

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 3600000 * 5 }}))
// app.use(expressJwt({secret: 'secret'}).unless({path: ['/', /(\.js|\.css|\.ttf?v=2.0.0|\.wof?v=2.0.0|\.html)/, '/login', '/auth']}));
app.use(express.json());
app.use(express.urlencoded());



app.get(/(\.js|\.css|\.ttf?v=2.0.0|\.wof?v=2.0.0|\.html)/, function (req, res) {
	res.sendfile('.' + req.url.replace('?v=2.0.0', ''));
});

app.post('/auth', function (req, res) {
  if (!(req.body.username === 'user' && req.body.password === 'password')) {
    res.send(401, 'Wrong user or password');
    return;
  }
  var profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    id: 123
  };
  req.session.views = profile;
  res.json({ token: true });
});

app.get('*', function (req, res) {
  if(undefined === req.session.views && '/login' !== req.originalUrl){
    res.status(401);
    res.redirect('/login');
  }
  else{
    
    if('/login' !== req.originalUrl){
      app.io.route('talk', function(req){
        exec('sudo espeak -v fr-fr -s 165 -g 2 -a 200 -p 60 "' + req.data.msg + '"', function(error, stdout, stderr){
          
        });
      });
      // console.log(3);
      // app.io.route('salut', function(req, res){
      //   console.log(3);
      //   exec('espeak -v fr-fr "Salut Lionel"', function(error, stdout, stderr){
      //   //   console.log(4);
      //     // req.io.respond(error);
      //   })
      // });
      
      // app.io.route('understand', function(req, res){
      //   exec('espeak -v fr-fr "Je n\'ai pas compris"', function(){
      //     // req.io.respond(true);
      //   })
      // });
      
      app.io.route('st', function(req, res){
        exec('lsusb', function(error, stdout, stderr){
          var rtn = {
            webcam:false,
            micro:false
          };
          if(error){
            rtn = {error: true};
          }
          else{
            var device = stdout.split('\n'),
                i = device.length - 1;
            while(i >= 0){
              if(/Logitech/.test(device[i])){
                rtn = {
                  'webcam':true,
                  'micro':true
                };
                i = 0;
              }
              i--;
            }
          }
          req.io.respond(rtn);
        })
      });
    }
    
    
    res.sendfile('./front/src/js/html/layout.html');
  }
});



app.listen(80);
