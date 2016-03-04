var Q = require('q');
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
    
module.exports = {
  docs: [
    {
      "label": "je n'ai pas compris",
      "text": [
        "vf"
      ]
    },
    {
      "label": "salut",
      "text": [
        "salut",
        "bonjour"
      ]
    },
    {
      "label": "functionName",
      "text": "comment tu t'appelles"
    },
    {
      "label": "je suis en développement",
      "text": "dans quel etat es tu"
    },
    {
      "label": "functionOnline",
      "text": "il y a internet",
    },
    {
      "label": "functionOnline",
      "text": "test internet",
    },
    {
      "label": "functionSearch",
      "text": "cherche des photos de",
    },
    {
      "label": "functionSearch",
      "text": "cherche des videos de",
    },
    {
      "label": "functionCloseWindow",
      "text": "ferme la fenetre",
    },
    {
      "label": "je suis en développement",
      "text": "dans quel etat es tu"
    },
    {
      "label": "functionCompile",
      "text": [
        "compil",
        "compile",
        "javascript"
      ]
    },
    {
      "label": "functionRestart",
      "text": [
        "reboot",
        "restart",
        "relance toi"
      ]
    },
    {
      "label": "functionTime",
      "text": [
        "quelle heure il est",
        "il est quelle heure"
      ]
    },
    {
      "label": "functionTime",
      "text": "donne moi l'heure"
    },
  ],
  "function": {
    functionCloseWindow(result){
      if(this.win){
        this.win.destroy();
        return 'je ferme la fenetre';
      }
      else{
        return 'aucune fenetre est ouverte';
      }
    },
    functionSearch(result){
      this.speech.speak('je lance la recherche');
      
      if(!this.win){
        const BrowserWindow = require('electron').remote.BrowserWindow;
        this.win = new BrowserWindow({ width: 800, height: 600, show: false });
        this.win.on('closed', function() {
          this.win = null;
        }.bind(this));
      }
      console.log(result);
      this.win.loadURL('https://www.google.com/search?hl=fr&site=imghp&tbm=isch&q=' + result.replace('affiche des photos de ', ''));
      this.win.show();
      return '';
    },
    functionOnline() {
      return navigator.onLine ? "Il y a internet" : "Il n'y a pas internet";
    },
    functionCompile() {
      var defer = Q.defer();
      this.speech.speak('je lance la compilation');
      io.emit('launch-cmd', 'npm run compileJS', function(arg){
        if(arg){
          defer.resolve('La compilation est finit');
        }
        else{
          defer.resolve('Une erreur est apparue lors de la compilation');
        }
      });
      return defer.promise;
    },
  
    functionRestart(){
      window.location.reload();
      return '';
    },
  
    functionTime() {
      var moment = require('moment');
      return 'Il est ' + moment().format('HH:mm');
    },
    
    functionName(){
      return "Je m'appelle Jaspi";
    }
  }
};