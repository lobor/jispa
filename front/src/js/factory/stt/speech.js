export class Speech{
  constructor(options){
    this.options = {};
    this.debug = false;
    Object.assign(this.options, options, {lang: "fr"});
    this.speech = new SpeechSynthesisUtterance();
    this.synth = window.speechSynthesis;
    
    this._getVoice();
    this._setBeep();
    
    // this.synth.speak(window.su);
    
    // window.su.text = msg;
      
    // window.su.onstart = function(){
    //   stt.stt.pause();
    //   console.debug('start speech');
    // }
    
    
    this.speech.onstart = this.constructor._onSpeech.bind(this);
    this.speech.onend = this.constructor._endSpeech.bind(this);
    
    // this.speaker = new 
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
  
  _setVoices(){
    if(undefined !== this.options.lang){
      this.speech.lang = this.options.lang; 
    }
  }
  
  _getVoice(){
    var vm = this;
    vm.synth.onvoiceschanged = function(){
      vm._setVoices(vm.synth.getVoices());
    };
  }
}