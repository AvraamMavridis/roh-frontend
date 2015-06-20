// Internal Dependencies
var NavBar = require('../Components/NavBar.jsx');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var SourcesActions = require('../Actions/SourcesActions.jsx');
var SourcesStore = require('../Stores/SourcesStore.jsx');
var Login = require('../Components/Login.jsx');

var Home = React.createClass({

  render: function(){
    SourcesActions.requestSources();
    return(
      <div>
        <NavBar/>
        <Login/>
        <RouteHandler/>
      </div>
    );
  }
})

module.exports = Home;
