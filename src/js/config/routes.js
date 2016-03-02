module.exports = ['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
      $urlRouterProvider.otherwise("/");
      $stateProvider
        .state('login', {
          url: "/login",
          views: {
            "content@": { 
              template: require("html!./../controller/login/templates/login.html"),
              controller: 'loginController'
            },
            "header": { 
              template: require("html!./../controller/login/templates/header.html"),
            },
          }
        })
        .state('home', {
          url: "/",
          views: {
            "header": { 
              template: require("html!./../controller/header/templates/header.html"),
              controller: 'headerController'
            },
            "footer": { 
              template: require("html!./../controller/footer/templates/layout.html"),
              controller: "footerController"
            },
            "content@": { 
              template: require("html!./../controller/home/templates/home.html"),
              controller: "homeController"
            },
          }
        })
        .state('home.config', {
          url: 'config',
          views: {
            "content@": {
              template: require("html!./../controller/config/templates/config.html"),
              controller: 'configController'
            }
          }
        });
    }];