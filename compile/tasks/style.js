var stylus = require('stylus'),
  Q = require('q'),
  nib = require('nib'),
  fs = require('fs');
  
module.exports = function style(result) {
  var file = fs.readFileSync('./front/src/styl/style.styl', 'utf-8');
  result.content = 'launch css';
  result.render();
  console.log('launch css');
  stylus(file)
    .set('paths', ['./front/src/styl/'])
    .use(nib())
    .render(function (err, css) {
      if (err) console.log('[ERROR]', err);
      fs.writeFile('./front/assets/css/style.css', css, function (err) {
        if (err) console.log('[ERROR]', err);
        result.content = 'ok css';
        result.render();
        console.log('ok css');
      });
    });
};
