module.exports = ['$scope', '$http', '$state', function($scope, http, $state){
  $scope.login = function submitAuth(data){
    http({
        url: '/auth',
        method: 'POST',
        data: {username: data.username, password: data.password}
      })
      .then(function successRequestAuth(response){
        if(response.data.token){
          window.location.href = '/';
        }
      }, function errorRequestAuth(){
        
      })
  };
}];