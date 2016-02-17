module.exports = ['$state', '$http', 'moment', function($state, $http, moment){
  var responseRamdom = {
    "usual": [
      "On fait quoi aujourd'hui ?",
      "Quoi de neuf ?",
    ],
    "state": [
      "Ca va merci",
      "Pas très bien aujourd'hui",
      "Pas très bien",
      "Bof bof",
      "Super bien",
      "Je pète la forme",
    ],
    "insulte": [
      'Je vais être clair, je vais te taper',
      'Laisse moi tranquil',
      'Va là-bas',
      'tchuuiiiip',
      'tchuip',
      'tchip',
    ],
    "comprehension":[
      "Je n'ai pas compris",
      "Tu peux répéter s'il de plait",
      "Je ne comprends pas",
      "Comment ?",
      "Quoi ?",
    ]
  };
  function random(items){
      return items[Math.floor(Math.random()*items.length)];
    }
  var _ = {
    random: random
  };
  var synth = window.speechSynthesis,
      voices;
      
  synth.onvoiceschanged = function(){
    voices = synth.getVoices();
  };
  
  
      
  
  function createElement (msg, style){
    var li = document.createElement('li');
    li.className = "animated"
    li.innerHTML = msg;
    if(style){
      li.className += " fadeInLeft"
      li.style.textAlign = 'right';
    }
    else{
      li.className += " fadeInRight";
      if(undefined !== window.su){
        window.su.lang = "fr";
        window.su.text = msg;
        synth.speak(window.su);
      }
      else{
        
      }
      // meSpeak.speak(msg);
    }
    if(undefined === service.talk)
      service.talk = document.getElementsByClassName('talk-to-talk')[0];
    service.talk.appendChild(li);
  }
    var	service = {
      random: random,
      talk : document.getElementsByClassName('talk-to-talk')[0],
      createElement: createElement,
      commands: {
          // navigation site
          'menu *page':  function(page){
            var state = 'home';
            if (false === /(accueil|home)/.test(page.toLowerCase())){
              state += '.' + page;
            }
            $state.go(state);
            createElement("page " + page, false);
          },
          
          // Api key google search: AIzaSyBrQy7Ju5oAndxcNQKP9kGqFvAeXcR3Yto
          // "recherche des images de :subject": function(subject){
          //   var search = require('image-search');
            //   $http({
        //     url: 'https://www.googleapis.com/customsearch/v1?key=AIzaSyBrQy7Ju5oAndxcNQKP9kGqFvAeXcR3Yto&q=' + subject
        //   })
        // },
        
        // TODO : il manque la nomination des jours comme mercredi, lundi prochain etc...
        'donne-moi la météo': meteo,
        'quel temps :temps (:jour)': {
          'regexp': /^quel temps (fait-il|il fait|fera-t-il|il fera) ?(aujourd'hui|demain)?$/, 
          'callback': meteo
        },
        
        
        
        // identité robot
        "comment :name": {
          'regexp': /^comment (tu t'appelles|t'appelles-tu)$/, 
          'callback': createElement.bind(undefined, "Je m'appelle Raspi", false),
        },
        "raspi": createElement.bind(undefined, "Oui ?", false),
        "je t'aime": createElement.bind(undefined, "Moi aussi je t'aime", false),
        
        // TODO
        "affiche la cam": {
          'regexp': /^affiche la cam$/, 
          'callback': function(){
            
          },
        },
        
        
        // formule usuel
        'bonjour': createElement.bind(undefined, 'Salut comment vas-tu ?', false),
        'salut( raspi)': {
          "regexp":"(salut|bonjour)( raspi)?",
          "callback": function(){
            createElement('Salut comment vas-tu ?', false);
          }
        },
        // 'bonjour (raspi)': {
        //   "regexp":"(salut|bonjour) (raspi)",
        //   "callback": function(){
        //     createElement('Salut comment vas-tu ?', false);
        //   }
        // },
        'tu fais quoi': createElement.bind(undefined, "Rien j'attends", false),
        'comment :state': {
          'regexp': /^comment (vas-tu|tu vas)$/, 
          'callback': createElement.bind(undefined, 'Ca va merci et toi ?', false)
        },
        'répète après moi *repeat': function(repeat){
          createElement(repeat, false)
        },
        'et pourquoi': function(){
          createElement('Parce que je ne suis pas une ensiclopédie', false);
        },
        
        
        // divers
        'laisse-moi tranquil': function(){
          createElement(_.random(responseRamdom.insulte), false);
        },
        'tu passes ou tu viens': function(){
          createElement(_.random(responseRamdom.insulte), false);
        },
        'ah bon': function(){
          createElement(_.random(responseRamdom.insulte), false);
        },
        
        'luke': createElement.bind(undefined, "Je suis ton père", false),
        "qui :ma chié :ça :et :qui ne l'a pas écrasé": {
          'regexp': /^qui (ma|a|à|va|m'a) c\*\*\*\* (ça|cela) (et|mais) (qui|qu'il|il) ne l'a pas écrasé$/, 
          'callback': function(){
            createElement(_.random(responseRamdom.insulte), false);
          }
        },
        
        
        
        
        // TODO: le tts peut traduire des chiffres en lettre ex => dit 2 repond deux, de
        //       Le tts ne traduit pas le 1
        'additionne :one et :tow': {
          "regexp": /additionne [0-9]+ et [0-9]+/,
          "callback": function(one, tow){
            console.log(one, tow);
            console.log(parseFloat(one), parseFloat(tow));
            createElement('le resultat est : ' + (parseFloat(one) + parseFloat(tow)), false);
          }
        },
        'multiplie :one et :tow': function(one, tow){
          createElement('le resultat est : ' + (parseFloat(one) * parseFloat(tow)), false);
        },
        'diviser :one par :tow': function(one, tow){
          createElement('le resultat est : ' + (parseFloat(one) / parseFloat(tow)), false);
        },
        ':soustrait :one a :tow': {
          'regexp': /^(soustrait|enlève)$/, 
          'callback': function(one, tow){
            createElement('le resultat est : ' + (parseFloat(tow) - parseFloat(one)), false);
          }
        },
        
        
        
        
        // Date et heure
        'quel(le) :date': {
          'regexp': /^quel(le)? (date|jour) (nous sommes|sommes-nous|on est)$/, 
          'callback': dateToday
        },
        "la date d'aujourd'hui": {
          'regexp': /^la date d'aujourd'hui$/, 
          'callback': dateToday
        },
        'quelle heure': {
          'regexp': /^quelle heure (il est|est-il)$/, 
          'callback': timeToday
        },
        'il est quelle heure': {
          'regexp': /^il est quelle heure$/, 
          'callback': timeToday
        },
      },
    };
  
    function timeToday(){
      createElement('Il est ' + moment().format('HH:mm'), false);
    }
    
    function dateToday(){
      createElement('Nous sommes le ' + moment().format('DD MM YYYY'), false);
    }
    
    function meteo(temps, jour){
            $http({
                url: 'http://www.infoclimat.fr/public-api/gfs/json?_ll=48.85341,2.3488&_auth=ARtXQAV7ACJfcgYxAHYELVY%2BVWAPeQUiCnYAYw5rUi8HbABhBWVUMlA%2BA34HKAcxVnsGZVphVGRWPQR8CnhSMwFrVzsFbgBnXzAGYwAvBC9WeFU0Dy8FIgphAGIOfVIwB2IAbQV4VDdQOQNnBykHMlZmBmFaelRzVjQEZwpiUjUBYFc0BWUAZV8zBm0ALwQvVmBVMw9hBWgKbgBjDjBSYwcwADAFblQyUD4DYQcpBzJWbQZiWmdUa1YwBGIKZ1IuAX1XSgUVAH9fcAYmAGUEdlZ4VWAPbgVp&_c=69d289c0d05daf6339b59db34cb984af',
              })
              .then(function(response){
                var date = moment(),
                    formatSearch,
                    data = response.data,
                    keys = Object.keys(data),
                    length = keys.length,
                    regexp,
                    text = '',
                    meteoDay;
                    
                if("aujourd'hui" === jour || "" === jour){
                  formatSearch = date.format('YYYY-MM-DD');
                }
                else{
                  text += '';
                }
                
                if("demain" === jour){
                  formatSearch = date.day(1).format('YYYY-MM-DD');
                }
                if("après-demain" === jour){
                  formatSearch = date.day(2).format('YYYY-MM-DD');
                }
                else{
                  
                }
                
                var regexp = new RegExp(formatSearch);
                for(var i = 0; length > i; i++){
                  if(true === regexp.test(keys[i])){
                    console.log(keys[i], data[keys[i]]);
                    meteoDay = data[keys[i]];
                    i = length;
                  }
                };
                
                // meteoDay.temperature
                console.log(meteoDay);
                if(meteoDay){
                  if(meteoDay.pluie){
                    text += 'Il va pleuvoir';
                  }
                  else {
                    text += 'Il ne va pas pleuvoir';
                  }
                  
                  if(meteoDay.pluie_convective){
                    text += ' sous forme d\'averse'
                  }
                  
                  if("oui" === meteoDay.risque_neige){
                    text += ' Il y aura des risques de neige'
                  }
                }
                else{
                  text = "Cette commande m'est inconnue";
                }
                
                createElement(text, false);
              }, function(){
                createElement("Je n'ai pas pu récuperer la météo", false);
              });
          }
    
    return service;
}];