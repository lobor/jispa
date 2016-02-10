var pico = require('picotts')
 
pico.say('Salut toi comment vas-tu ?', 'fr-FR', function(err) {
  console.log(err);
  if (!err)
	  console.log('Correctly played')
})