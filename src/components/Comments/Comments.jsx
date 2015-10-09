'use strict';

let React = require('react');

require('./comments.scss');

let Comments = React.createClass({

  render: function() {
      return (
          <u className="col-xs-12 comments-container">
           <li> Something </li>
           <li> Something </li>
           <li> Something </li>
           <li> Something </li>
           <li> Something </li>
          </u>
      );
  }
});

module.exports = Comments;
