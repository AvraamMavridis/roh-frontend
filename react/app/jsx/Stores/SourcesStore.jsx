'use strict';

var SourcesActions = require('../Actions/SourcesActions.jsx');
var NewsActions = require('../Actions/NewsActions.jsx');
var API = require('../Config/Config.jsx').API;
var Reflux = require('reflux');
var newsUrl = require('../Config/config.jsx').Urls.news;

var SourcesStore = Reflux.createStore({
  listenables: [SourcesActions,NewsActions],

  onRequestSources: function(){
    var that = this;
    SourcesActions.sourcesUpdate([]);
    API.requestSources()
      .then(function(sources){
        that.trigger(sources);
        var i = sources.length;
        while(--i){
          NewsActions.requestNews(newsUrl + '/' + sources[i]);
        }
      }, function(error){
        console.log('error',error);
      });
  }
});

module.exports = SourcesStore;
