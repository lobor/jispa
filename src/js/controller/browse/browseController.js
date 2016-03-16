module.exports = ['$scope', '$stateParams', 'stt', function($scope, $stateParams, stt){
  var webview = document.getElementsByTagName('webview')[0];
  
  if($stateParams.url)
    webview.src = $stateParams.url;
    
  webview.addEventListener("did-fail-load", function(){
    stt.speak("je n'ai pas trouvé la page, voici les résultats de la recherche sur google");
    webview.src = "http://www.google.com/search?q=" + $stateParams.result;
  })
}];