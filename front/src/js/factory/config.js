module.exports = [
  {
    name: 'st',
    factory: require('./socket.js')
  },
  {
    name: 'stt',
    factory: require('./stt/stt.js')
  },
  {
    name: 'sttCmd',
    factory: require('./stt/commands/commands.js')
  }
];