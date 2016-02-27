export class Listen {
  constructor() {
    this.stt = new webkitSpeechRecognition();
    this.init = false;
    // Set the max number of alternative transcripts to try and match with a command
    this.stt.maxAlternatives = 5;

    // In HTTPS, turn off continuous mode for faster results.
    // In HTTP,  turn on  continuous mode for much slower results, but no repeating security notices
    this.stt.continuous = root.location.protocol === 'http:';

    // Sets the language to the default 'en-US'. This can be changed with annyang.setLanguage()
    this.stt.lang = 'fr-FR';
    this.stt.continuous = true;

    this.stt.onstart = this.constructor._eventStart.bind(this);
    this.stt.onend = this.constructor._eventEnd.bind(this);

    // this.stt.onresult = this.constructor._eventResult;
  }

  static _eventResult(event, cb, eventStt) {
    
    var SpeechRecognitionResult = eventStt.results[eventStt.resultIndex];
    var results = [];
    for (var k = 0; k<SpeechRecognitionResult.length; k++) {
      results[k] = SpeechRecognitionResult[k].transcript;
    }
    this.log(results);
    cb(results, SpeechRecognitionResult);
    // diagnostic.textContent = 'Result received: ' + color;
    // bg.style.backgroundColor = color;
  }
  
  on(event, cb){
    
    // this.stt
    // var SpeechRecognitionResult = event.results[event.resultIndex];
    // var results = [];
    // for (var k = 0; k<SpeechRecognitionResult.length; k++) {
    //   results[k] = SpeechRecognitionResult[k].transcript;
    // }
    
    if('onresult' === event){
      this.stt.onresult = this.constructor._eventResult.bind(this, event, cb);
    }
    
    // this.log(results);
  }

  start() {
    this.lastStartedAt = new Date().getTime();
    if (false === this.init) {
      try {
        this.init = true;
        this.stt.start();
      }
      catch (e) {
        this.error('SpeechRecognition already start');
      }
    }
    else {
      this.error('SpeechRecognition already start');
    }
    return this;
  }

  stop() {
    this.stt.stop();
    this.init = false;
    return this;
  }

  static _eventStart() {
    this.log('listen start');
  }

  static _eventEnd() {
    this.log('listen end');
    var timeSinceLastStart = new Date().getTime() - this.lastStartedAt;
    if (timeSinceLastStart < 1000) {
      setTimeout(this.stt.start, 1000 - timeSinceLastStart);
    } else {
      this.stt.start();
    }
  }

  setDebug(debug) {
    this.debug = true;
    return this;
  }

  log(...args) {
    if (true === this.debug)
      console.log(...args);
    return this;
  }

  error(...args) {
    if (true === this.debug)
      console.error(...args);
    return this;
  }
}