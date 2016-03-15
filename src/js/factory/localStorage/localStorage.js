
module.exports = ['$http', function ($http) {
  var local = window.localStorage;
  var ls = {
    get: function(name, options, success, error){
      var t = local.getItem(name);
      var expire = local.getItem(name + '::expire');
      if(t && expire >= new Date().getTime()){
        success(JSON.parse(t));
      }
      else{
        $http(options)
          .then(function(response){
            var date = new Date().getTime() + (24 * 3600 * 1000);
            local.setItem(name, JSON.stringify(response.data));
            local.setItem(name + '::expire', date);
            success(response.data);
          }, error);
      }
    }
  }
  
  
  return ls;
}];