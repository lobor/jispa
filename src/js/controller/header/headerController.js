module.exports = ['$scope', 'stt', function($scope, stt){
  $scope.$on('toggleMenu', function(){
      $scope.$root.openMenu = ($scope.$root.openMenu) ? false : true;
  });
}];