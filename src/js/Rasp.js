import factory from './factory/config.js';

export class Rasp{
  constructor(){
    console.log('Init RaspApp');
    // require('angular-moment')
    this.angular = require('angular')
      .module('raspberrypi', [require('angular-ui-router')]);
      // .directive('micro', require('./directive/micro/micro.js'))
      // .constant('angularMomentConfig', {
      //     timezone: 'Europe/Paris' 
      // });
    // this.loadController()
      this.loadFactory();
      this.loadRoutes();
    return this;
  }
  
  loadController(){
    console.log('Load Controller');
    
    var i = controller.length - 1;
    while(-1 < i){
      this.angular.controller(controller[i].name, controller[i].controller);
      i--;
    }
    return this;
  }
  
  loadFactory(){
    console.log('Load Factory');
    var i = factory.length - 1;
    while(-1 < i){
      this.angular.factory(factory[i].name, factory[i].factory);
      i--;
    }
    return this;
  }
  
  loadRoutes(){
    this.angular.config(require('./config/routes.js'));
    return this;
  }
}