'use strict';


var ProfileDropdown = require('./ProfileDropdown.jsx')

var NavBar = React.createClass({displayName: "NavBar",
  render: function() {
    return (
      React.createElement("div", {className: "navbar"}, 
      React.createElement("div", {className: "navbar-brand"}, "Latest News"), 
      React.createElement(ProfileDropdown, null)
      )
    );
  }
});

module.exports = NavBar
