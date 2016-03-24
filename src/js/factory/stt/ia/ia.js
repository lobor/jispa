/* global ) */
import { Speech } from './speech';
import { Listen } from './listen';
import { t } from './../languages/utils';

var Classifiers = require('./../classifier/load.js');
var msgUnderstand = "i don't understand",
  path = "./front/src/js/factory/stt/",
  natural = require("limdu"),
  Q = require('q');

export class IA {
  constructor(options) {
    var vm = this;
    if (options) {
      if (options.inject) {
        vm.inject = options.inject;
      }
    }

    vm.actif = false;
    vm.interval = false;

    vm.speech = new Speech();
    vm
      .speech
      .setDebug(true);

    navigator.webkitGetUserMedia({ audio: true }, function () {
      // var micro = document.getElementById('micro-icon');
      // micro.className = micro.className.replace('-off', '');
      
      msgUnderstand = t(msgUnderstand);
      vm.listen = new Listen();
      vm
        .listen
        .setDebug(true)
        .on('text', function eventResult(results) {
          vm.parseResults(results);
        })
        .start();
    }, function () {
      console.log('nok');
      vm.speak("Il n'y a pas de micro");
    })

    vm.initClassifier();
  }
  
  setIntervalName() {
    console.log('setIntervalName');
    this.interval = setInterval(function () {
      console.log('clearInterval');
      this.actif = false;
      clearInterval(this.interval);
      this.speech.beep.play();
    }.bind(this), 10000);
  }

  parseResults(resultSpeeh, SRResult) {
    var vm = this,
      result = msgUnderstand;
      
    var classifications = this.classifier.classify(resultSpeeh.toLowerCase(), 1);
    if (classifications.classes.length) {
      for(var j = 0; j < classifications.classes.length; j++){
        var result = classifications.classes[j];
        console.log('understand:', resultSpeeh);
        
        Q(result)
          .then(function (scope) {
            if(/^function/.test(scope)) {
              var el = Classifiers[vm.themeClassActive]['function'][scope] || Classifiers['app']['function'][scope];
              return el.call(vm, resultSpeeh, scope);
            }
            return scope;
          })
          .then(function(scope){
            vm.speak(scope);
          })
      }
    }
  }
  
  speak(msg){
    if('string' === typeof msg){
      msg = t(msg);
    }
    else if('object' === typeof msg){
      var values = msg.values;
      var template = msg.template;
      msg = t(template);
      
      for(var key in values){
        msg = msg.replace('${' + key + '}', values[key])
      }
    }
    else{
      console.error('The commands should return object or string');
      msg = t('an error occurred');
    }
    console.log('speak: ', msg);
    this.speech.speak(msg);
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
    
    this.setClassifier();
    return this;
  }

  setClassifier(classifier) {
    this.themeClassActive = classifier || 'app';
    console.debug('load classifier:', this.themeClassActive);
    
    var classi = Classifiers[this.themeClassActive].docs,
      i = 0, 
      size = classi.length;
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
      text = t(text);
      if(Array.isArray(text)){
        for(var j = 0; j < text.length; j++){
          result.push({
            text: text[j],
            // label: t(test[k].label)
            label: test[k].label
          })
        }
      }
      else{
        result.push({
          text: text,
          label: test[k].label
        });
      }
    }
    for(var i = 0; i < result.length; i++){
      this.classifier.trainOnline(result[i].text, result[i].label);
    }
    
    this.classifier.retrain();
  }
}