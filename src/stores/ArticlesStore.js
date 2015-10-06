'use strict';

let Reflux = require('reflux');
let $ = require('jQuery');
let ArticlesActions = require('../actions/ArticlesActions.js');

var ImageStore = Reflux.createStore({
    listenables: [ArticlesActions],
    imagelist: [],

    /*
    Builds the query url
    @param {string} url
    */
    buildRequestUrl: function(query){
      let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=cc1eb78b0a27dbb2c66cf986b2e48caf&format=json&text=${query}&extras=owner_name,geo&jsoncallback=?`
      return url;
    },

    /*
    This is triggered when the action fetchImages is called
    @param {object} List of images
    */
    onFetchArticles: function(query){
      let that = this;
      $.ajax({
          type: 'GET',
          url: that.buildRequestUrl(query),
          async: false,
          jsonpCallback: 'jsonCallback',
          contentType: "application/json",
          dataType: 'jsonp',
          success: function(response) {
              that.updateListOfImages(response.photos.photo);
          },
          error: function(error) {
              that.handleErrors(error);
          }
      });
    },

    /*
    Handles errors
    @param {object} List of images
    */
    handleErrors: function(){
      // @todo Define handling error strategy
    },

    /*
    Update the list of images and broadcast the change to the listeners
    @param {object} List of images
    */
    updateListOfImages: function(listOfImages){
      listOfImages = listOfImages.map(function(image){
        image.url = `http://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_b.jpg`;
        image.key = `${image.server}-${image.id}-${image.secret}`;
        return image;
      });
      this.trigger({ listOfImages }); // Send the list of images to the listeners
    },

    /*
    Returns the initial state of the store
    @return {object} List of images
    */
    getInitialState: function(){
      this.listOfImages = {}
      return this.listOfImages;
    }
});

module.exports = ImageStore;
