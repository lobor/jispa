import { PicoTTS } from './picoTTS.js';
export class Speech{
  constructor(options){
    this.options = {};
    this.debug = false;
    Object.assign(this.options, options, {lang: "fr"});
    
    this._getVoice();
    this._setBeep();
  }
  
  on(event, cb){
    this.speech.on(event, cb);
  }
  
  speak(msg){
    this.speech.text = msg;
    this.synth.speak(this.speech);
  }
  
  setDebug(debug){
    this.debug = true;
  }
  
  log(...args){
    if(true === this.debug)
      console.log(...args);
  }
  
  _setBeep(){
    this.beep = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU' + Array(1e3).join(123));
  }
  
  static _endSpeech(){
    let vm = this;
    vm.log('end speech');
    // vm.beepTime = setTimeout(function(){
      // vm.beep.play();
      // stt.stt.removeCommands();
      // stt.stt.addCommands(stt.commands);
    // }, 10000);
    //   if(false === stt.stt.isListening()){
    //     stt.stt.resume();
    // 	  }
  }
  
  static _onSpeech(){
    // stt.stt.pause();
    this.log('start speech');
  }
  
  initPicoTTS(){
    this.log('init picoTTS')
    this.synth = new PicoTTS();
  }
  
  _setVoices(){
    if(false){
    // if(undefined !== this.options.lang && 0 !== this.options.lang.length){
      this.speech.lang = this.options.lang; 
      
      var Speech = window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance;
      this.speech = new Speech();
      
      this.speech.onstart = this.constructor._onSpeech.bind(this);
      this.speech.onend = this.constructor._endSpeech.bind(this);
    }
    else if(0 !== this.options.lang.length){
      this.initPicoTTS();
    }
  }
  
  _getVoice(){
    this.synth = window.speechSynthesis;
    var vm = this;
    vm.synth.onvoiceschanged = function(){
      vm._setVoices(vm.synth.getVoices());
    };
  }
}