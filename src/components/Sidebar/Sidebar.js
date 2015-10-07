'use strict';

let React = require('react');
let FacebookLoginButton = require('../FacebookLoginButton/FacebookLoginButton.js');

require('./sidebar.scss');

let Sidebar = React.createClass({

  render: function(){
    return(
      <div className="sidebar">
        <FacebookLoginButton/>
      </div>
    )
  }
});

module.exports = Sidebar;
