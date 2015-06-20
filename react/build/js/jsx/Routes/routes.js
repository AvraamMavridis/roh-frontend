var Home = require('./home.jsx');
var Account = require('./account.jsx');
var Router = require('react-router');
var NewsList = require('../Components/NewsList.jsx');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;


var routes = (
  React.createElement(Route, {handler: Home, path: "/"}, 
    React.createElement(Route, {name: "account", handler: Account}), 
    React.createElement(DefaultRoute, {handler: NewsList})
  )
);


Router.run(routes, function (Handler) {
  React.render(React.createElement(Handler, null), document.body);
});
