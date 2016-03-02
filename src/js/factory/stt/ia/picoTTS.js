export class PicoTTS{
  constructor(){
    return this;
  }
  
  speak(msg){
    io.emit('speak', msg);
  }
}