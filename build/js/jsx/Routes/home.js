// Internal Dependencies
var NavBar = require('../Components/NavBar.jsx');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var SourcesActions = require('../Actions/SourcesActions.jsx');
var SourcesStore = require('../Stores/SourcesStore.jsx');
var Login = require('../Components/Login.jsx');

var Home = React.createClass({displayName: "Home",

  render: function(){
    SourcesActions.requestSources();
    return(
      React.createElement("div", null, 
        React.createElement(NavBar, null), 
        React.createElement(Login, null), 
        React.createElement(RouteHandler, null)
      )
    );
  }
})

module.exports = Home;
