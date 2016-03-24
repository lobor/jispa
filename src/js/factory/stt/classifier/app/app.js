var Q = require('q');

module.exports = {
  docs: [
    {
      "label": "hi",
      "text": "hi",
    },
    {
      "label": "i's me",
      "text": "who's speak",
    },
    {
      "label": "yes",
      "text": "tu es là",
    },
    {
      "label": "hello",
      "text": "hello"
    },
    {
      "label": "fine thank you",
      "text": "how are you"
    },
    {
      "label": "functionMeet",
      "text": "rappelle-moi que j'ai rendez-vous à "
    },
    {
      "label": "functionAge",
      "text": "how old are you"
    },
    {
      "label": "functionBirthday",
      "text": "when are you born"
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
      "label": "functionBrowseUrl",
      "text": "go to"
    },
    {
      "label": "functionCloseSearch",
      "text": [
        "close the window",
        "close the look for",
        "leaves search"
      ]
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
    functionMeet(result, classifier){
      var defer = Q.defer(),
          date = result;
      
      classifier = this.classifier.backClassify(classifier);
      for(var i = 0; i < classifier.length; i++){
        date = date.replace(classifier[i], '');
      }
      
      this.speak({
        template: "i record your appointments ${date}",
        values: {
          date: date
        }
      });
      
      date = date.replace('h', '');
      
      var t = 5 * 60 * 1000;
      setTimeout(function() {
        defer.resolve("you are going to be late");
      }, t);
      
      return defer.promise;
    },
    
    functionBirthday(){
      var result = moment(window.Settings.firstLoad);
      return {
        template: "je suis né le ${text} à ${hour} heures ${minutes}",
        values: {
          text: result.format('dddd D MMMM YYYY'),
          hour: result.format('H'),
          minutes: result.format('m')
        }
      };
    },
    
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
        text += result.diff('hours') + ' heures';
      }
      else if(result.diff('minutes')){
        text += result.diff('minutes') + ' minutes';
      }
      return {
        template: "i am ${text}",
        values: {
          text: text
        }
      };
    },
    
    
    
    functionWeather(result, classifier){
      var defer = Q.defer(),
          ls = this.inject.get('ls'),
          city = result,
          dates = [{
            reg: "demain",
            
          }],
          date, reg;
          
          console.log(city);
      
      classifier = this.classifier.backClassify(classifier);
      for(var i = 0; i < classifier.length; i++){
        city = city.replace(classifier[i], '');
      }
      
      city = city.replace(' à ', '');
      
      if('' === city)
        city = "chelles";
        
      ls
        .get(`meteo::${city}`, {
            url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=fr&units=metric&appid=922acb7e29082fc1af198d2040aa4b3d`,
          }, function(data){
            var coordination = 'un temps',
                weather = data.list[0];
                
            if(/légères/.test(weather.weather[0].description)){
              coordination = 'une';
            }
            defer.resolve(`Aujourd'hui il fait ${weather.main.temp.toFixed(0)} degrés avec ${coordination} ${weather.weather[0].description}`);
          }, function(){
            defer.resolve("i could not retrieve weather");
          });
          
      return defer.promise;
    },
    
    
    
    functionCloseSearch(result){
      this.inject.get('$state').go('home');
      return 'i close the window';
    },
    
    functionBrowseUrl(result){
      var query = result.replace(/(va ?)?(sur )?/g, '');
      var siteName = query
      
      this.inject.get('$state').go('home.browse', {url: `https://www.${siteName}.com/`, result: query});
      
      return {
        template: "let's go to ${query}",
        values: {
          query: query
        }
      };
    },
    
    functionSearch(result){
      this.speak('i run search');
      
      var query = result.replace(/(affiche ?|affiches ?|cherche ?|recherche ?|trouve ?|va ?)?(-moi)?(des |les |la |le |de |une |un |sur )?(photos |images |vidéos |informations )?(de )?/g, '')
      var params = '';
      var siteName = '';
      
      if(/va/g.test(result)){
        siteName = query;
      }
      else{
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
        this.setClassifier('browse');
        console.log(siteName, tbm, site, query);
        params = `search?hl=fr&site=${site}&tbm=${tbm}&q=${query}`;
      }
      
      this.inject.get('$state').go('home.browse', {url: `https://www.${siteName}.com/${params}`, result: query});
      return '';
    },
    functionOnline() {
      return navigator.onLine ? "yes" : "no";
    },
    functionCompile() {
      var defer = Q.defer();
      this.speak('i run the compilation');
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