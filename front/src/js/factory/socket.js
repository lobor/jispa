module.exports = [function () {
      var socket = window.io.connect(),
          ls = window.localStorage;
      return {
        on: function on(eventName, callback) {
          socket.on(eventName, callback);
        },
        emit: function emit(eventName, data, ext, cb) {
          var item = ls.getItem(eventName);
          if(!item){
            socket.emit(eventName, data, function(data){
              ls.setItem(eventName, JSON.stringify(data));
              cb(data);
            });
          }
          else {
            cb(JSON.parse(item));
          }
        }
      }
    }]