import { IA } from './ia/ia.js';

var ElectronSettings = require('electron-settings');
window.moment = require('moment');
require('moment-range');
require('moment/locale/fr');


class Rasp{
  constructor(){
    console.log('Init RaspApp');
		this.ia = new IA();
  }
}



let settings = new ElectronSettings({
  configDirPath: './'
});

if (!settings.get('lang')) {
  settings.set('lang', 'fr');
}

if (!settings.get('firstLoad')) {
  settings.set('firstLoad', new Date().getTime());
}

if (!settings.get('name')) {
  settings.set('name', 'jaspi');
}

window.Settings = settings.get();

window.moment.locale(settings.get('lang'));

let app = new Rasp();