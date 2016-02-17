import { IA } from './ia.js';
module.exports = [function () {
  var ia = new IA();
  console.log(ia);
  return ia;
  // window.su = new SpeechSynthesisUtterance()
  // window.su.onstart = function(){
  //   stt.stt.pause();
  //   console.debug('start speech');
  // }
  // window.su.onend = function(){
  //   console.debug('end speech');
  //   window.beepTime = setTimeout(function(){
  //     window.beep();
  //     stt.stt.removeCommands();
  //     stt.stt.addCommands(stt.commands);
  //   }, 10000);
  //   if(false === stt.stt.isListening()){
  //     stt.stt.resume();
  //   }
  // }
  
  // var stt = {
  //     stt: annyang,
  //     createElement: sttCmd.createElement,
  //     commands: {
  //       ':name *commands':  {
  //         "regexp": /^(raspi|respire|mappy) (.+)$/,
  //         "callback": function(name, commands){
  //           stt.stt.removeCommands();
  //           stt.stt.addCommands(sttCmd.commands);
  //           stt.stt.customCallCommands([commands]);
  //         }
  //       },
  //     },
  //     commandsLater: sttCmd.commands,
  //     "setDebug": function(bool){
  //       this.stt.debug(bool);
  //       return this;
  //     },
  //     "init": function(){
  //       return this
  //         .setCommands()
  //         .setLanguage()
  //         .initEvent();
  //     },
  //     "start": function(){
  //       this.stt.start({
  //         autoRestart: false,
  //         continuous: true
  //       });
  //     },
  //     "initEvent": function(){
      
  //       return this;
  //     },
  //     "setLanguage": function(){
  //       this.stt.setLanguage('fr-FR');
  //       return this;
  //     },
  //     "setCommands": function(){
  //       stt.stt.removeCommands();
  //       this.stt.addCommands(this.commands);
  //       return this;
  //     }
  //   };
  // return stt.init();
}];