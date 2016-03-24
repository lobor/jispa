
export class PicoTTS{
  constructor() {
    console.log(this);
    this.toto = 0;
  }
  
  speak(speech){
    io.emit('speak', speech.text);
    // return this;
  }
}