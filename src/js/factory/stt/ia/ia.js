import { Speech } from './speech';
import { Listen } from './listen';

var AppClassifier = require('./../classifier/app/app.js');
// import { LoadPlugin } from './../classifier/loadClassifiers';
// import electron from 'electron-prebuild';

var msgUnderstand = "je n'ai pas compris",
    path = "./front/src/js/factory/stt/",
    natural = require('natural'),
    Q = require('q');
  
export class IA {
  constructor() {
    this.listen = new Listen();
    this
      .listen
      .setDebug(true);

    this.initClassifier();
    this.loadPlugin();

    this.listen.start();


    this.speech = new Speech();
    this.speech.setDebug(true);

    this.listen.on('onresult', this.eventResult.bind(this));

  }

  eventResult(results, SRResult) {
    // console.debug(results, SRResult);
    
    var vm = this,
      i = 0,
      result = msgUnderstand,
      resulsSize = results.length,
      value, old;

    while (i < resulsSize) {
      var resultSpeeh = results[i];
      if (msgUnderstand !== this.classifier.classify(resultSpeeh)) {
        var classifications = this.classifier.getClassifications(resultSpeeh);
        // console.debug(classifications);
        for (var k in classifications) {
          var classif = classifications[k];
          if (undefined === value) {
            old = classif;
            value = classif;
          }
          else if (value > classif.value) {
            // console.debug(classif.label);
            break;
          }
          else if (value == classif.value) {
            // var compare = [];
            // var icompare = 0;
            // for (var indexDoc in this.classifier.docs) {
            //   var doc = this.classifier.docs[indexDoc];

            //   if (doc.label === old.label || doc.label === classif.label) {
            //     var tokenizerResults = this.tokenizer.tokenize(resultSpeeh);
	          //      console.log(tokenizerResults); 
            //     for (var tokI in tokenizerResults) {
            //       var tok = tokenizerResults[tokI];
            //       // console.log(tok, doc.text[tokI]);
            //       if(undefined === compare[icompare])
            //         compare[icompare] = 0;
            //       console.log(tok, doc.text[tokI]);
            //       compare[icompare] += (this.metaphone.compare(tok, doc.text[tokI])) ? 1 : 0;
            //     }
            //     console.log(icompare);
            //     icompare++;

            //     if (2 === compare.length) {
                  
            //       if(compare[0] > compare[1]){
            //         value = compare[0];
            //       }
            //       else if (compare[0] > compare[1]){
            //         value = compare[1];
            //       }
            //       else{
            //         value = "j'hesite entre plusieurs commandes";
            //       }
                  
            //       console.log(compare);
            //       // break;
            //       // console.debug('_________________');
            //       // console.debug(classif.value);
            //       // console.debug(old);
            //       // console.debug(doc);
            //       // console.debug(compare);
            //       // console.debug('_________________');
            //       // break;
            //     }
            //     //  metaphone.compare(wordA, wordB)
            //     // doc, classif.label
            //   }
             
            //   //  this.metaphone.process(doc, )
            // }
            //  for(){
             
            //  }
            value = "j'hesite entre plusieurs commandes";
            break;
          }
        }
        result = value;
        //  console.debug(this.classifier.textToFeatures(resultSpeeh));
        //  result = this.classifier.classify(resultSpeeh);
        break;
        //  console.debug(this.classifier.getClassifications(resultSpeeh));
        //  if()
        //  i = results.length;
      }
      i++;
    }

    if (msgUnderstand === result) {
      console.log(this.classifier.getClassifications(results[0]));
    }

    Q()
      .then(function () {
        if (result.label && /^function/.test(result.label)) {
          // console.log('launch function');
          // if(!/(Time)$/.test(result))
          //   vm.speech.speak('je lance la commande : ' + result.replace('function', ''));
          return vm[result.label].call(vm, resultSpeeh, result);
        }
        else {
          return result.label || result;
        }
      })
      .then(function (result) {
        console.log(result);
        // console.log('speech with function');
        vm.speech.speak(result);
      });
  }

  functionCompile() {
    this.speech.speak('je lance la compilation');
    var defer = Q.defer();
    let electron = require('electron');
    let ipcRenderer = electron.ipcRenderer;

    ipcRenderer.send('launch-cmd', 'npm run compile');

    ipcRenderer.on('launch-cmd-reply', function (event, arg) {
      if (arg.error) {
        defer.resolve('Une erreur est apparue lors de la compilation');
      }
      else {
        defer.resolve('La compilation est finit');
      }
    })
    return defer.promise;
  }
  
  // functionRestart(){
  //   var defer = Q.defer();
  //   let electron = require('electron');
  //   let ipcRenderer = electron.ipcRenderer;
    
  //   ipcRenderer.send('restart');
    
  //   ipcRenderer.on('restart-reply', function(event, arg){
  //     // if(arg.error){
  //     //   defer.resolve('Une erreur est apparue lors de la compilation');
  //     // }
  //     // else{
  //     //   defer.resolve('La compilation est finit');
  //     // }
  //   })
  //   return defer.promise;
  // }
  
  functionSaveCommands() {
    var defer = Q.defer();
    this.classifier.save('front/src/js/factory/stt/commands/classifier.json', function (err, classifier) {
      if (err) {
        defer.resolve('Il y a eu une erreur lors de la sauvegarde');
      }
      else {
        defer.resolve('Les commandes ont été enregistré');
      }
    });
    return defer.promise;
  }

  functionLoadCommands() {
    var defer = Q.defer(),
      vm = this;
    natural.BayesClassifier.load('./front/src/js/factory/stt/commands/classifier.json', null, function (err, classifier) {
      if (err) {
        console.log(/ENOENT/.test(err));
        var msg = '';
        if ('ENOENT' === err.code) {
          msg = ", il semblerait que le fichier n'existe pas";
        }
        defer.resolve('Il y a eu une erreur lors du chargement' + msg);
      }
      else {
        defer.resolve('Les commandes ont été chargées');
        vm.classifier = natural.BayesClassifier.restore(JSON.parse(JSON.stringify(classifier)));
      }
    });
    return defer.promise;
  }

  functionAddCommands(text) {
    text = text
      .replace(/ ?ajout(e)?(r)? (une?|le|la) command(e)?(s)?/g, '')
      .trim();
      
    natural.BayesClassifier.load('./front/src/js/factory/stt/commands/addCommands.json', null, function(err, classifier) {
      this.classifier = classifier;
      this.classifier.train();
      this.train = text.trim();
      // console.log(this.classifier);
      // this.classifier = classifier;
    }.bind(this));
      
    // this.classifier.restore({});
    return "que dois-je répondre a : " + text + " ?";
  }
  
  functionSupCommands(text) {
    text = text
      .replace(/ ?supprime(e)?(r)? (une?|le|la) command(e)?(s)?/g, '')
      .trim();
      
    
    console.log(this.classifier);
    
    
    for(var iC in this.classifier.docs){
      var doc = this.classifier.docs[iC];
      console.log(this.classifier.classify(doc.text.join(' ')));
      if(this.classifier.classify(doc.text.join(' ')) === this.classifier.classify(text)){
        console.log(text);
        this.classifier.removeDocument(this.classifier.classify(doc.text.join(' ')));
        this.classifier.train();
      }
    }
    console.log(this.classifier);
    // natural.BayesClassifier.load('./front/src/js/factory/stt/commands/addCommands.json', null, function(err, classifier) {
    //   this.classifier = classifier;
    //   this.classifier.train();
    //   this.train = text;
    //   // console.log(this.classifier);
    //   // this.classifier = classifier;
    // }.bind(this));
    
    this.classifier.save('./front/src/js/factory/stt/commands/classifier.json', function (err, newClassifier) {
      console.log(newClassifier);
      this.classifier = newClassifier;
      this.speech.speak("la commande a bien été supprimé");
    }.bind(this))	;
      
    // this.classifier.restore({});
    return "suppression en cours de la commande : " + text + " ?";
  }
  
  
  functionAddCommandsResponse(text){
    var vm = this;
    natural.BayesClassifier.load('./front/src/js/factory/stt/commands/classifier.json', null, function (err, oldClassifier) {
      oldClassifier.addDocument(vm.train, text);
      oldClassifier.train();
      
      oldClassifier.save('front/src/js/factory/stt/commands/classifier.json', function (err, newClassifier) {
        newClassifier.train();
        vm.classifier = newClassifier;
        vm.speech.speak("la commande a bien été enregistré");
      });
    });
    return "la commande est en cours d'enregistrement";
  }

  functionTime() {
    var moment = require('moment');
    return 'Il est ' + moment().format('HH:mm');
  }

  loadPlugin() {
    
  }
  
  initClassifier() {
    console.log(AppClassifier);
    this.classifier = new natural.BayesClassifier();
    // this.metaphone = natural.Metaphone;
    // this.tokenizer = new natural.WordTokenizer();
    
    for(var classifier of AppClassifier){
      this.classifier.addDocument(classifier.text, classifier.label);
    }
    this.classifier.train();
    
    return this;
  }
}