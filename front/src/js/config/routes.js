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
              template: require("./../controller/login/templates/login.html"),
              controller: 'loginController'
            },
            "header": { 
              template: require("./../controller/login/templates/header.html"),
            },
          }
        })
        .state('home', {
          url: "/",
          views: {
            "header": { 
              template: require("./../controller/header/templates/header.html"),
              controller: 'headerController'
            },
            "footer": { 
              template: require("./../controller/footer/templates/layout.html"),
              controller: "footerController"
            },
            "content@": { 
              template: '',
            },
          }
        })
        .state('home.config', {
          url: 'config',
          views: {
            "content@": {
              template: require("./../controller/config/templates/config.html"),
              controller: 'configController'
            }
          }
        });
    }];