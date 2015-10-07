'use strict';

let React = require('react');

require('./sidebar.scss');

let Sidebar = React.createClass({
  render: function(){
    return(
      <div className="sidebar">
        I am sidebar
      </div>
    )
  }
});

module.exports = Sidebar;
