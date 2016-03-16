var load = require('./load'), lang;


// .lang

export function t(trad){
  if(undefined === lang){
    lang = load[window.Settings.lang]
  }
  if(undefined !== lang[trad]){
    trad = lang[trad];
  }
  else if(!/function/.test(trad)){
    console.warn('Not trad for: ' + trad);
  }
  return trad;
}