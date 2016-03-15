var Q = require('q');

module.exports = {
  docs: [
    {
      "label": "je n'ai pas compris",
      "text": [
        "vf"
      ]
    },
    {
      "label": "hi",
      "text": [
        "hi",
        "hello"
      ]
    },
    {
      "label": "fine thank you",
      "text": "how are you"
    },
    {
      "label": "functionAge",
      "text": "how old are you"
    },
    {
      "label": "functionName",
      "text": [
        "what's your name"
      ]
    },
    {
      "label": "it's you",
      "text": [
        "ass hole",
      ]
    },
    {
      "label": "functionWeather",
      "text": "give-me the weather"
    },
    {
      "label": "functionOnline",
      "text": "you are online",
    },
    {
      "label": "functionSearch",
      "text": "look for on internet"
    },
    {
      "label": "functionCloseWindow",
      "text": "close the window"
    },
    {
      "label": "functionCompile",
      "text": "build the javascript"
    },
    {
      "label": "functionRestart",
      "text": "reload the url"
    },
    {
      "label": "functionTime",
      "text": "what time is it"
    },
  ],
  "function": {
    functionAge(){
      var result = moment.range(window.Settings.firstLoad, new Date());
      var text = '';
      
      if(result.diff('years')){
        text += result.diff('years') + ' ans';
      }
      else if(result.diff('months')){
        text += result.diff('months') + ' mois';
      }
      else if(result.diff('days')){
        text += result.diff('days') + ' jours';
      }
      else if(result.diff('hours')){
        text += result.diff('hours') + ' heure';
      }
      else if(result.diff('minutes')){
        text += result.diff('minutes') + ' minutes';
      }
      return "j'ai " + text;
    },
    
    
    
    functionWeather(result, classifier){
      var defer = Q.defer(),
          ls = this.inject.get('ls'),
          city = result;
          
      classifier = this.classifier.backClassify(classifier);
      for(var i = 0; i < classifier.length; i++){
        city = city.replace(classifier[i], '');
      }
      
      city = city.replace(' à ', '');
      if('' === city)
        city = "chelles";
        
      ls
        .get(`meteo::${city}`, {
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&units=metric&appid=922acb7e29082fc1af198d2040aa4b3d`,
          }, function(data){
            defer.resolve(`Aujourd'hui il fait ${data.main.temp.toFixed(0)} degrés avec un temps ${data.weather[0].description}`);
          }, function(){
            defer.resolve("i could not retrieve weather");
          });
          
      return defer.promise;
    },
    
    
    
    functionCloseWindow(result){
      if(this.win){
        this.win.destroy();
        return 'i close the window';
      }
      else{
        return 'any window is open';
      }
    },
    functionSearch(result){
      this.speech.speak('i run search');
      
      if(!this.win){
        const BrowserWindow = require('electron').remote.BrowserWindow;
        this.win = new BrowserWindow({ width: 800, height: 600, show: false });
        this.win.on('closed', function() {
          this.win = null;
        }.bind(this));
      }
      
      var query = result.replace(/(affiche ?|affiches ?|cherche ?|recherche ?|va ?)?(-moi)?(des |les |la |le |de |une |un |sur )?(photos |images |vidéos |informations )?(de )?/g, '')
      var params = '';
      var siteName = '';
      
      if(/va/g.test(result)){
        siteName = query;
      }
      else{
        console.log(5);
        siteName = 'google';
        var tbm, site; 
        if(/vidéo/g.test(result)){
          site = 'imghp';
          tbm = 'vid';
        }
        else if(/(photos|images)/g.test(result)){
          site = 'imghp';
          tbm = 'isch';
        }
        else{
          site = '';
          tbm = '';
          query = result.replace(/^(affiche ?|affiches ?|cherche ?|recherche ?)?(-moi ?)/g, '');
        }
        console.log(siteName, tbm, site, query);
        params = `search?hl=fr&site=${site}&tbm=${tbm}&q=${query}`;
      }
      
      var url = `https://www.${siteName}.com/${params}`;
      console.log(url);
      // 'https://www.google.com/search?hl=fr&site=' + search.site + '&tbm=' + search.tbm + '&q=' + result
      
      this.win.loadURL(url);
      this.win.show();
      return '';
    },
    functionOnline() {
      return navigator.onLine ? "yes" : "no";
    },
    functionCompile() {
      var defer = Q.defer();
      this.speech.speak('i run the compilation');
      io.emit('launch-cmd', 'npm run compileJS', function(arg){
        if(arg){
          defer.resolve('the compilation is finished');
        }
        else{
          defer.resolve('an error occurred while compiling');
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
      return "Je m'appelle " + window.Settings.name;
    }
  }
};