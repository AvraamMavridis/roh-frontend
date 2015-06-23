var MediaList = (function () {
    function MediaList(socketIOService) {
        socketIOService.setup('http://Avraams-MacBook-Pro.local:5000');
        return {
            replace: true,
            templateUrl: './partials/medialist/medialist.html',
            link: function ($scope) {
                $scope.listOfNews = [];
                socketIOService.on('news arrived', function (data) {
                    var newlyArrived = _.filter(data, function (item) {
                        if (_.findWhere($scope.listOfNews, { hash: item.hash })) {
                            return false;
                        }
                        return true;
                    });
                    console.log(newlyArrived);
                    if(!_.isEmpty(newlyArrived)){
                      $scope.listOfNews = _.uniq($scope.listOfNews.concat(newlyArrived), 'hash');
                      $scope.listOfNews = _.sortByAll($scope.listOfNews, 'data');
                      $scope.listOfNews = $scope.listOfNews.reverse();
                      $scope.$digest();
                    }
                });
            }
        };
    }
    return MediaList;
})();
module.exports = MediaList;
