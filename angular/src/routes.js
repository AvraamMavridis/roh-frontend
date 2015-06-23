var RouteConfig = (function () {
    function RouteConfig($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'templates/home.html'
        });
    }
    return RouteConfig;
})();
module.exports = RouteConfig;
