'use strict';

import React from 'react/addons';

//require('./article.scss')

var Image = React.createClass({
  render: function(){
    return(
      <article className="article">
        <header> Something</header>
        <h2> Sommething else </h2>
      </article>
    )
  }

});

module.exports = Image;
