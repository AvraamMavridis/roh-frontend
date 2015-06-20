'use strict';

var baseUrl = 'http://guarded-springs-1667.herokuapp.com';

var requestParams = {
  news: {
    type: 'GET',
    dataType: 'json',
    url: baseUrl + '/news'
  },
  sources: {
    type: 'GET',
    dataType: 'json',
    url: baseUrl + '/sources'
  }
};

var Config = {
  API: {
    requestNews: function(url,type){
      var request = requestParams.news;
      request.url = (typeof url === 'undefined') ? requestParams.news.url : url;
      request.type = (typeof type === 'undefined') ? requestParams.news.type : type;
      return $.ajax(request);
    },
    requestSources: function(url, type){
      var request = requestParams.sources;
      request.url = (typeof url === 'undefined') ? requestParams.sources.url : url;
      request.type = (typeof type === 'undefined') ? requestParams.sources.type : type;
      return $.ajax(request);
    }
  },

  Urls: {
    signup: baseUrl + '/signup',
    login: baseUrl + '/login',
    validate: baseUrl + '/validate',
    articles: baseUrl + '/articles',
    news: baseUrl + '/news'
  }
}

module.exports = Config;
