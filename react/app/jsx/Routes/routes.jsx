var Home = require('./home.jsx');
var Account = require('./account.jsx');
var Router = require('react-router');
var NewsList = require('../Components/NewsList.jsx');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;


var routes = (
  <Route handler={Home} path="/">
    <Route name="account" handler={Account} />
    <DefaultRoute handler={NewsList}/>
  </Route>
);


Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
