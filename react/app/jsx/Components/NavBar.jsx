'use strict';


var ProfileDropdown = require('./ProfileDropdown.jsx')

var NavBar = React.createClass({
  render: function() {
    return (
      <div className='navbar'>
      <div className='navbar-brand'>Latest News</div>
      <ProfileDropdown/>
      </div>
    );
  }
});

module.exports = NavBar
