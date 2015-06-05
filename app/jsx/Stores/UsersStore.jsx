'use strict';

var UsersActions = require('../Actions/UsersActions.jsx');
var Reflux = require('reflux');

// Creates a DataStore
var NewsStore = Reflux.createStore({
    // Initial setup
    listenables: [UsersActions],

    onUserAuthenticate: function(isAuthorized){
      this.trigger({
        isAuthorized: isAuthorized
      });
    },

    onLogout: function(){
      this.trigger({
        isAuthorized: false
      });
    }
});

module.exports = NewsStore;
