'use strict';

var API = require('../Config/config.jsx').API;
var NewsActions = require('../Actions/NewsActions.jsx');
var Reflux = require('reflux');

// Creates a DataStore
var NewsStore = Reflux.createStore({
    // Initial setup
    listenables: [NewsActions],
    init: function() {

    },

    onExpandArticle: function(data){
      this.trigger({
        collapsed: data.collapsed,
        action: 'expand',
        id: data.id
      });
    },

    onNewsUpdate: function(data){
      this.trigger(data);
      return;
    },

    onRequestNews: function(url){
      NewsActions.newsUpdate([]);
      API.requestNews(url)
       .then(function(data){
         NewsActions.newsUpdate(data);
       },
       function(error){
         console.log('Error requesting the news', error);
       });
    }

});

module.exports = NewsStore;
