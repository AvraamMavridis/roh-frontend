declare var _:any;

class MediaList{
  constructor(socketIOService:any){
    socketIOService.setup('https://frozen-peak-1788.herokuapp.com/');
    return {
        replace: true,
        templateUrl: './partials/medialist/medialist.html',
        link: function($scope){
          $scope.listOfNews = [];

          socketIOService.on('news arrived', function(data){
            var newlyArrived = _.filter(data, function (item){
              if(_.findWhere($scope.listOfNews, { hash: item.hash})){
                return false;
              }
              return true;
            });
            $scope.listOfNews = _.uniq($scope.listOfNews.concat(newlyArrived), 'hash');
            $scope.listOfNews = _.sortByAll($scope.listOfNews, 'data');
            console.log(_.first($scope.listOfNews));
            $scope.$digest();
          });
        }
    };
  }
}

export = MediaList;
