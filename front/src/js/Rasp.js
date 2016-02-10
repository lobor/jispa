// var factory = require();
var controller = require('./controller/config.js');
var factory = require('./factory/config.js');
module.exports = function Rasp(){
  var vm = {
    "init": function initRasp(){
      console.log('Init RaspApp');
      vm.angular = require('angular')
        .module('raspberrypi', [require('angular-ui-router'), require('angular-moment')])
        .run(['amMoment', function(amMoment){
          amMoment.changeLocale('fr');
          // stt.setDebug(true).start();
          // $timeout(, 0);
        }])
        .directive('micro', require('./directive/micro/micro.js'))
        .constant('angularMomentConfig', {
            timezone: 'Europe/Paris' 
        });
      vm.loadController()
        .loadRoutes()
        .loadFactory();
      return vm;
    },
    "loadController": function loadController(){
      console.log('Load Controller');
      
      var i = controller.length - 1;
      while(-1 < i){
        vm.angular.controller(controller[i].name, controller[i].controller);
        i--;
      }
      return vm;
    },
    "loadFactory": function loadFactory(){
      console.log('Load Factory');
      var i = factory.length - 1;
      while(-1 < i){
        vm.angular.factory(factory[i].name, factory[i].factory);
        i--;
      }
      return vm;
    },
    "loadRoutes": function loadRoutes(){
      vm.angular.config(require('./config/routes.js'));
      return vm;
    }
  }
  return vm.init();
};