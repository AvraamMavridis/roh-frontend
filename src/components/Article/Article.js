'use strict';

import React from 'react/addons';



require('./article.scss')

var Image = React.createClass({
  getDefaultProps: function() {
    return {
      title: 'Default title',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageurl: 'http://lorempixel.com/output/city-q-c-640-480-4.jpg'
    };
  },

  getImageStyle: function(){
    return{
      backgroundImage: 'url(' + this.props.imageurl + ')',
    }
  },

  render: function(){
    return(
      <div className="col-xs-10 col-xs-offset-1 article">
        <header className="col-xs-12 no-padding">{ this.props.title }</header>
        <div className="article-image" style={this.getImageStyle()}></div>
        <p>{this.props.description} </p>
      </div>
    )
  }

});

module.exports = Image;
