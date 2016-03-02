module.exports = ['$scope', 'st', function($scope, st){
  var vm = $scope;
  st.emit('st', {}, {$scope: $scope}, function(data){
    var config = [
        'webcam',
        'micro'
      ],
      i = config.length - 1;
    while(i >= 0){
      vm[config[i]] = data[config[i]];
      i--;
    }
  })
}];