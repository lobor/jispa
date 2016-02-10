module.exports = ['$scope', '$http', function($scope, http){
  $scope.password = '';
  $scope.$on('toggleMenu', function(){
      $scope.$root.openMenu = ($scope.$root.openMenu) ? false : true;
  });
  $scope.$on('hideTalk', function(){
      $scope.$root.openTalk = false;
  });
}];