'use strict';

let React = require('react');
let $ = require('jQuery');

require('./comments.scss');

let Comments = React.createClass({

  expandComments: function(id){
    $(`#${id}`).slideToggle( "slow" );
  },

  render: function() {
      var id = ~~(Math.random() * 10000);
      return (
          <div className="col-xs-12">
            <div onClick={this.expandComments.bind(this, id)} className="clickable pull-right"><u><strong>Σχόλια</strong></u></div>
            <u id={id} className="col-xs-12 comments-container">
             <li> Something </li>
             <li> Something </li>
             <li> Something </li>
             <li> Something </li>
             <li> Something </li>
            </u>
        </div>
      );
  }
});

module.exports = Comments;
