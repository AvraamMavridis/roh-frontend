'use strict';

import React from 'react/addons';



require('./article.scss')

var Image = React.createClass({

  /**
   * Returns the image style of the article
   * @return {object}
   */
  getImageStyle: function(){
    return{
      backgroundImage: 'url(' + this.props.article.image + ')',
    }
  },

  /**
   * Returns the hour that the article was published in a human readable format
   * @return {string}
   */
  getDate: function(){
    let time = new Date(this.props.article.moment.replace(/"/g, ''));
    let minutes = (time.getMinutes()  <10 ? '0': '') + time.getMinutes();
    return `Δημοσιεύθηκε στις ${time.getHours()}:${minutes}`;
  },

  render: function(){
    return(
      <div className="col-xs-10 col-xs-offset-1 article">
        <header className="col-xs-12 no-padding">{ this.props.article.title }</header>
        <div className="article-image" style={this.getImageStyle()}></div>
        <p>{this.props.article.description} </p>
        <p className="article-details">{this.getDate()} από {this.props.article.source}</p>
      </div>
    )
  }

});

module.exports = Image;
