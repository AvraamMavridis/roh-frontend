'use strict';

let Reflux = require('reflux');
let $ = require('jQuery');
let ArticlesActions = require('../actions/ArticlesActions.js');
let config = require('../components/config.js');

var ImageStore = Reflux.createStore({
    listenables: [ArticlesActions],

    /*
    This is triggered when the action fetchImages is called
    @param {object} List of images
    */
    onFetchArticles: function(query){
      let that = this;
      $.ajax({
          type: 'GET',
          url: config.articlesEndpoint,
          async: true,
          contentType: "application/json",
          dataType: 'json',
          success: that.onSuccess,
          error: function(error) {
              that.handleErrors(error);
          }
      });
    },

    onSuccess: function(response){
      console.log(response);
      this.trigger({ articles: response });
    },

    /*
    Handles errors
    @param {object} List of images
    */
    handleErrors: function(){
      // @todo Define handling error strategy
    },
});

module.exports = ImageStore;
