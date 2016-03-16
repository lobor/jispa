import controller from './../controller/config.js';

module.exports = ['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
      $urlRouterProvider.otherwise("/");
      
      var i = controller.length - 1;
      while(-1 < i){
        $stateProvider.state(controller[i].state, controller[i].conf);
        i--;
      }
    }];