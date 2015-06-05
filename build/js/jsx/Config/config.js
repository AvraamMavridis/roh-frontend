'use strict';

var requestParams = {
  news: {
    type: 'GET',
    dataType: 'json',
    url: 'http://localhost:8001/news'
  },
  sources: {
    type: 'GET',
    dataType: 'json',
    url: 'http://localhost:8001/sources'
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
    signup: 'http://localhost:8001/signup',
    login: 'http://localhost:8001/login',
    validate: 'http://localhost:8001/validate'
  }
}

module.exports = Config;
