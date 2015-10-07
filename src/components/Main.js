'use strict';

require('normalize.css');
require("font-awesome-webpack");
require('bootstrap/dist/css/bootstrap.css');
require('styles/App.scss');

import React from 'react/addons';

let Reflux = require('reflux');
let _ = require('lodash');
let Article = require('./Article/Article');
let Sidebar = require('./Sidebar/Sidebar');
let ArticleActions = require('../actions/ArticlesActions.js');
let ArticlesStore = require('../stores/ArticlesStore.js');

var AppComponent = React.createClass({
  // Listen to changes on  Image Store
  mixins: [Reflux.connect(ArticlesStore)],

  componentDidMount: function(){
    ArticleActions.fetchArticles();
  },

  render: function() {
    let arts = _.map(this.state.articles, function(article){return(
      <Article article={article} key={Math.random()}/>
    )});
    return (
      <div className="container-fluid">
        <Sidebar/>
        <div className="articles-container">
          {arts}
        </div>
      </div>
    );
  }
});

module.exports = AppComponent;
