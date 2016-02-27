module.exports = ['$scope', 'stt', function($scope, stt){
  // var msg,
  //       micro = angular.element(document.getElementById('micro-icon')),
  //       microEnable = 'ion-android-microphone',
  //       microDisable = 'ion-android-microphone-off';

  // window.beep = function beep() {
  //   new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU' + Array(1e3).join(123)).play()
  // }
  // stt.stt.addCallback('start', function () {
  //   console.debug('TTS: start micro');
  //   micro.removeClass(microDisable).addClass(microEnable);
  // });
  
  // stt.stt.addCallback('result', function(){
  //   console.log('clear timeout');
  //   clearTimeout(window.beepTime);
  // });
  
  // stt.stt.addCallback('resultMatch', function (understand) {
  //   // msg = "J'ai compris";
  //   // console.log(arguments);
  // });
  
  // stt.stt.addCallback('resultNoMatch', function (understand) {
  //   msg = "Je n'ai pas compris";
  //   console.log(understand);
  //   window.beepTime = setTimeout(function(){
  //     msg = undefined;
  //     window.beep();
  //     stt.stt.removeCommands();
  //     stt.stt.addCommands(stt.commands);
  //   }, 10000);
  // });
  
  // stt.stt.addCallback('end', function () {
  //   console.debug('TTS: end micro');
  //   micro.removeClass(microEnable).addClass(microDisable);
  //   if(undefined !== msg){
  //     stt.createElement(msg, false);
  //     msg = undefined;
  //   }
  // });
      
  // stt.setDebug(true).start();
  
  $scope.$on('toggleMenu', function(){
      $scope.$root.openMenu = ($scope.$root.openMenu) ? false : true;
  });
}];