var app  = require('express')();
    

app.get(/(\.js|\.css)/, function (req, res) {
	res.sendFile(__dirname + req.url);
});


app.get('*', function (req, res) {
  res.sendFile(__dirname + '/layout.html');
});

app.listen(8080);






