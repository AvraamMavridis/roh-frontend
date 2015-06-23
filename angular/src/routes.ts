class RouteConfig{
  constructor($routeProvider:any){
    $routeProvider.when('/home', {
      templateUrl: 'templates/home.html'
    });
  }
}


export = RouteConfig;
