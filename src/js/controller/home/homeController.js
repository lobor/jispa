module.exports = ['ls', '$scope', function(ls, $scope){
  $scope.date = moment().format('MM MMM YYYY');
  $scope.city = 'chelles';
  ls
    .get(`meteo::chelles`, {
        url: `http://api.openweathermap.org/data/2.5/forecast?q=chelles&lang=fr&units=metric&appid=922acb7e29082fc1af198d2040aa4b3d`,
      }, function(data){
        var weather = data.list[0].weather[0],
            temp = data.list[0].main.temp;
        $scope.temp = temp;
      }, function(){
        console.error('meteo probleme controller home');
      });
}];