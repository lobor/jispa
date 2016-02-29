import { Speech } from './speech';
import { Listen } from './listen';

var AppClassifier = require('./../classifier/app/app.js');

var msgUnderstand = "je n'ai pas compris",
  path = "./front/src/js/factory/stt/",
  natural = require('natural'),
  Q = require('q');

export class IA {
  constructor(options) {
    if(options){
      if(options.inject){
        this.inject = options.inject;
      }
    }
    
    
    this.actif = false;
    this.interval = false;

    this.listen = new Listen();
    this
      .listen
      .setDebug(true);

    this.initClassifier();
    // this.loadPlugin();

    this.listen.start();


    this.speech = new Speech();
    this.speech.setDebug(true);

    this.listen.on('onresult', this.eventResult.bind(this));

  }
  
  // setActif(state){
  //   this.actif = state;
  //   if(false === state){
  //     this.speech.beep.play();
  //   }
  //   return this;
  // }
  
  setIntervalName() {
    console.log('setIntervalName');
    this.interval = setInterval(function () {
      console.log('clearInterval');
      this.actif = false;
      clearInterval(this.interval);
      this.speech.beep.play();
    }.bind(this), 10000);
  }

  eventResult(results, SRResult) {
    // if(false === this.actif){
    //   let name = /(Jaspi|Jasper|gspi|j'espère)/g;
    //   for(var i in results){
    //     if(true === name.test(results[i])){
    //       this.setIntervalName();
    //       this.actif = true;
    this.parseResults(results, SRResult);
    //       break;
    //     }
    //   }
    // }
    // else{
    //   this.parseResults(results, SRResult);
    //   if(false !== this.interval){
    //     clearInterval(this.interval);
    //   }
    //   this.setIntervalName();
    // }
  }

  parseResults(results, SRResult) {
    var vm = this,
      i = 0,
      result = msgUnderstand,
      resulsSize = results.length,
      value, old;

    while (i < resulsSize) {
      var resultSpeeh = results[i];
      if (msgUnderstand !== this.classifier.classify(resultSpeeh)) {
        var classifications = this.classifier.getClassifications(resultSpeeh);
        for (var k in classifications) {
          var classif = classifications[k];
          if (undefined === value) {
            old = classif;
            value = classif;
          }
          else if (value > classif.value) {
            break;
          }
          else if (value == classif.value) {
            value = "j'hesite entre plusieurs commandes";
            break;
          }
        }
        result = value;
        break;
      }
      i++;
    }

    if (msgUnderstand === result) {
      console.log(this.classifier.getClassifications(results[0]));
    }

    Q()
      .then(function () {
        if (result.label && /^function/.test(result.label)) {
          return AppClassifier['function'][result.label].call(vm, resultSpeeh, result);
        }
        else {
          return result.label || result;
        }
      })
      .then(function (result) {
        console.log(result);
        vm.speech.speak(result);
      });
  }

  loadPlugin() {

  }

  initClassifier() {
    console.log(AppClassifier);
    this.classifier = new natural.BayesClassifier();

    for (var classifier of AppClassifier.docs) {
      this.classifier.addDocument(classifier.text, classifier.label);
    }
    this.classifier.train();

    return this;
  }
}