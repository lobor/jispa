import { Speech } from './speech';
import { Listen } from './listen';
// import electron from 'electron-prebuild';

var msgUnderstand = "je n'ai pas compris";

var natural =  require('natural'),
    Q = require('q');
export class IA {
  constructor() {
    this.listen = new Listen();
    this
      .listen
      .setDebug(true);
    
    this.initClassifier();
    
    this.listen.start();
    
    
    this.speech = new Speech();
    this.speech.setDebug(true);
    
    this.listen.on('onresult', this.eventResult.bind(this));
    
    
    // var tokenizer = new natural.WordTokenizer();
    // console.log(tokenizer.tokenize("Salut comment vas-tu ?"));
    
    
  
    
    
    
    // var nounInflector = new natural.NounInflector();
    // nounInflector.addIrregular('spécial', 'spéciaux');
    // nounInflector.addIrregular('cheval', 'chevaux');
    // // console.log(nounInflector.singularize('nombres'));
    // console.log(nounInflector.singularize('chevaux'));
    // console.log(nounInflector.pluralize('spécial'));
    // console.log(nounInflector.pluralize('cheval'));
    // this.speech.speak(classifier.classify('i am '));
    // this.speech.speak(classifier.classify('ça va'));
  }
  
  eventResult(results) {
    
    var vm = this,
        i = 0,
        result = msgUnderstand;
        
   while(i < results.length){
     if(msgUnderstand !== this.classifier.classify(results[i])){
       result = this.classifier.classify(results[i]);
       i = results.length;
     }
     i++;
   }
   
   if(msgUnderstand === result){
     console.log(this.classifier.getClassifications(results[0]));
   }
   
    Q()
      .then(function() {
        if(/^function/.test(result)){
          console.log('launch function');
          if(!/(Time)$/.test(result))
            vm.speech.speak('je lance la commande : ' + result.replace('function', ''));
          return vm[result].call(vm);
        }
        else{
          return result;
        }
      })
      .then(function(result){
        console.log('speech with function');
        vm.speech.speak(result);
      });
  }
  
  functionCompile(){
    var defer = Q.defer();
    let electron = require('electron');
    let ipcRenderer = electron.ipcRenderer;
    
    ipcRenderer.send('launch-cmd', 'npm run compile');
    
    ipcRenderer.on('launch-cmd-reply', function(event, arg){
      if(arg.error){
        defer.resolve('Une erreur est apparue lors de la compilation');
      }
      else{
        defer.resolve('La compilation est finit');
      }
    })
    return defer.promise;
  }
  
  functionRestart(){
    var defer = Q.defer();
    let electron = require('electron');
    let ipcRenderer = electron.ipcRenderer;
    
    ipcRenderer.send('restart');
    
    ipcRenderer.on('restart-reply', function(event, arg){
      // if(arg.error){
      //   defer.resolve('Une erreur est apparue lors de la compilation');
      // }
      // else{
      //   defer.resolve('La compilation est finit');
      // }
    })
    return defer.promise;
  }
  
  functionSaveCommands(){
    var defer = Q.defer();
    this.classifier.save('front/src/js/factory/stt/commands/classifier.json', function(err, classifier) {
        console.log(err);
      if(err){
        defer.resolve('Il y a eu une erreur lors de la sauvegarde');
      }
      else{
        defer.resolve('Les commandes ont été enregistré');
      }
    });
    return defer.promise;
  }
  
  functionLoadCommands(){
    var defer = Q.defer(),
        vm = this;
    natural.BayesClassifier.load('./front/src/js/factory/stt/commands/classifier.json', null, function(err, classifier) {
      if(err){
        console.log(err.code);
        console.log(/ENOENT/.test(err));
        var msg = '';
        if('ENOENT' === err.code){
          msg = ", il semblerait que le fichier n'existe pas";
        }
        defer.resolve('Il y a eu une erreur lors du chargement' + msg);
      }
      else{
        defer.resolve('Les commandes ont été chargées');
        vm.classifier = natural.BayesClassifier.restore(JSON.parse(JSON.stringify(classifier)));
      }
    });
    return defer.promise;
  }
  
  functionTime(){
    var moment = require('moment');
    return 'Il est ' + moment().format('HH:mm');
  }
  
  initClassifier(){
    // this.classifier = new natural.BayesClassifier();
    
    natural.BayesClassifier.load('./front/src/js/factory/stt/commands/classifier.json', null, function(err, classifier) {
      this.classifier = classifier;
    }.bind(this));
    
    // this.classifier.addDocument('vf', "je n'ai pas compris");
    // this.classifier.addDocument(['salut', 'bonjour'], 'salut' + '');
    
    // this.classifier.addDocument(['compil', 'compil le javascript'], 'functionCompile');
    // this.classifier.addDocument(['reboot', 'restart', 'relance toi'], 'functionRestart');
    // this.classifier.addDocument('demarre', 'functionRestart');
    // this.classifier.addDocument('redemarre', 'functionRestart');
    
    // this.classifier.addDocument(['quelle heure il est', 'il est quelle heure'], 'functionTime');
    // this.classifier.addDocument("donne moi l'heure", 'functionTime');
    
    // this.classifier.addDocument("enregistre les commandes", 'functionSaveCommands');
    // this.classifier.addDocument("charge les commandes", 'functionLoadCommands');
    
    // this.classifier.train();
    return this;
  }
}