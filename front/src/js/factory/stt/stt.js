module.exports = ['$state', '$http', 'sttCmd', function ($state, $http, sttCmd) {
  var stt = {
      stt: annyang,
      commands: sttCmd.commands,
      "setDebug": function(bool){
        this.stt.debug(bool);
        return this;
      },
      "init": function(){
        return this
          .setCommands()
          .setLanguage()
          .initEvent();
      },
      "start": function(){
        this.stt.start({
          autoRestart: false,
          continuous: true
        });
      },
      "initEvent": function(){
        // console.log('TTS: Init event');
        this.stt.addCallback('result', function (understand) {
          sttCmd.createElement(understand[0], true);
          // console.log('compris', arguments);
        });
        
        this.stt.addCallback('start', function () {
          // console.log('TTS: start micro');
          // createElement('Je vous écoute', false);
        });
        
        this.stt.addCallback('resultNoMatch', function () {
          console.log('Pas compris', arguments);
          // sttCmd.createElement(sttCmd.random(responseRamdom.comprehension), false);
          sttCmd.createElement("Je n'ai pas compris", false);
        });
        return this;
      },
      "setLanguage": function(){
        this.stt.setLanguage('fr-FR');
        return this;
      },
      "setCommands": function(){
        this.stt.addCommands(this.commands, false);
        return this;
      }
    };
  return stt.init();
}];