/* global ) */
import { Speech } from './speech';
import { Listen } from './listen';
import { t } from './../languages/utils';

var AppClassifier = require('./../classifier/app/app.js');

var msgUnderstand = "je n'ai pas compris",
  path = "./front/src/js/factory/stt/",
  // natural = require('natural'),
  natural = require("limdu"),
  // speak = require("speakeasy-nlp"),
  Q = require('q');

export class IA {
  constructor(options) {
    if (options) {
      if (options.inject) {
        this.inject = options.inject;
      }
    }

    // this.analyseSentence = speak

    this.actif = false;
    this.interval = false;

    this.speech = new Speech();
    this
      .speech
      .setDebug(true);

    navigator.webkitGetUserMedia({ audio: true }, function () {
      this.listen = new Listen();
      this
        .listen
        .setDebug(true)
        .on('onresult', this.eventResult.bind(this))
        .start();
    }.bind(this), function () {
      this.speech.speak("Il n'y a pas de micro");
    })

    this.initClassifier();
    
    
    // this.loadPlugin();

    

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
      resulsSize = results.length;

    while (i < resulsSize) {
      var resultSpeeh = results[i];

      if (/^(cherche|recherche|affiche|va)/.test(resultSpeeh)) {
        result = 'functionSearch';
        break;
      }
      //   console.log(resultSpeeh);
      //   console.log(this.classifier.classify(resultSpeeh, 1));
      
      // if (msgUnderstand !== this.classifier.classify(resultSpeeh)) {
      var classifications = this.classifier.classify(resultSpeeh, 1);
      console.log(classifications);
      // console.log(resultSpeeh, classifications);
      // console.log(classifications);
      if (classifications.classes.length) {
        result = classifications.classes[0];
        break;
      }
      i++;
    }

    Q()
      .then(function () {
        if (result && /^function/.test(result)) {
          return AppClassifier['function'][result].call(vm, resultSpeeh, result);
        }
        else {
          return result;
        }
      })
      .then(function (result) {
        if (result)
          vm.speech.speak(t(result));
      });
  }

  loadPlugin() {

  }

  initClassifier() {
    var WordExtractor = function (input, features) {
      input.split(" ").forEach(function (word) {
        features[word] = 1;
      });
    };

    var TextClassifier = natural.classifiers.multilabel.BinaryRelevance.bind(0, {
      binaryClassifierType: natural.classifiers.Winnow.bind(0, { retrain_count: 10 })
    });

    this.classifier = new natural.classifiers.EnhancedClassifier({
      classifierType: TextClassifier,
      featureExtractor: WordExtractor,
      pastTrainingSamples: [],
    });

    var classi = AppClassifier.docs,
      i = 0, size = classi.length;
    var test = [];
    while (i < size) {
      var c = classi[i];

      if (Array.isArray(c.text)) {
        for(var d = 0; d < c.text.length; d++){
          test[test.length] = {
            text: c.text[d],
            label: c.label
          };
        }
      }
      else{
        test[test.length] = {
          text: c.text,
          label: c.label
        }
      }
      i++;
    }
    
    var result = [];
    for(var k = 0; k < test.length; k++){
      var text = test[k].text;
      // if(!/function/g.test(label)){
        text = t(text);
        if(Array.isArray(text)){
          for(var j = 0; j < text.length; j++){
            result.push({
              text: text[j],
              label: t(test[k].label)
            })
          }
        }
        else{
          result.push({
            text: text,
            label: t(test[k].label)
          });
        }
    }
    this.setClassifier(result);

    return this;
  }

  setClassifier(array) {
    for(var i = 0; i < array.length; i++){
      this.classifier.trainOnline(array[i].text, array[i].label);
    }
    this.classifier.retrain();
  }

  // initClassifier() {
  //   console.log(AppClassifier);
  //   this.classifier = new natural.BayesClassifier();

  //   for (var classifier of AppClassifier.docs) {
  //     if (Array.isArray(classifier.text)) {
  //       for (var text of classifier.text)
  //         this.classifier.addDocument(text, classifier.label);
  //     }
  //     else {
  //       this.classifier.addDocument(classifier.text, classifier.label);
  //     }
  //   }
  //   this.classifier.train();

  //   return this;
  // }
}