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


app.io.route('launch-cmd', function(req) {
  console.log(req.data);
  // exec('npm run compileJS', function(error, stdout, stderr){
  //   console.log(stdout);
  //   req.io.respond(error ? false : true);
  // });
});

app.io.route('speak', function(req) {
  exec('pico2wave -l fr-FR -w ./test.wav "' + req.data + '" && aplay ./test.wav', function(){
    
  });
});

app.io.route('search', function(req) {
  var s = req.data;
  jsdom.env({
    url: "https://www.google.com/search?hl=fr&site=imghp&tbm=isch&q=" + s.q,
    scripts: ["http://code.jquery.com/jquery.js"],
    headers: {
      "user-agent": "Mozilla/5.0 (Linux; U; Android 2.2; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
    },
    done: function (err, window) {
      if(err) {
        req.io.respond({error: err});
        return false;
      }
      // http://images.google.fr/imgres?imgurl=http://www.newyorker.com/wp-content/uploads/2015/10/Jabr-AreCatsDomesticated-1200.jpg&imgrefurl=http://www.newyorker.com/tech/elements/are-cats-domesticated&h=804&w=1200&tbnid=9Cz0mmdJav0MAM:&docid=nhYCekApS9GWlM&hl=fr&ei=o57UVs-UEoTeau7GqMAN&tbm=isch
      // http://images.google.fr/imgres?imgurl=http://www.newyorker.com/wp-content/uploads/2015/10/Jabr-AreCatsDomesticated-1200.jpg
      var links = window.$('a[href*="/url?q="]'),
          responses = [];
      links.each(function(index, link){
        var urlParse = url.parse(link.href);
        // responses.push({
        //   alt: this.alt,
        //   src: urlParse.query.replace('q=', ''),
        // })
        responses.push(urlParse.query.replace('q=', ''))
      });
      
      // req.io.respond({result: window.$("html").html()});
      req.io.respond({result: responses});
      // console.log( window.$("body").html());
      // req.io.respond({result: window.$("img")});
      // console.log("there have been", window.$("a").length - 4, "io.js releases!");
    }
  });
});





app.listen(8080);






