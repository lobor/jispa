import { IA } from './ia/ia.js';
module.exports = ['$injector', function ($injector) {
  var ia = new IA({inject:$injector});
  console.log(ia);
  
  // return {
  //   speak: ia.speak
  // }
  return ia;
}];