'use strict';

let Reflux = require('reflux');
let FacebookActions = require('../actions/FacebookActions.js');

var FacebookStore = Reflux.createStore({
    listenables: [FacebookActions],

    /*
    This is triggered when the action getUserDetails is called
    @return void
    */
    onGetUserDetails: function(){
      FB.api('/me', function(response) {
        console.log('>>>>>>>>>>', response)
      });
    },

    /*
    This is triggered when the action getUserDetails is called
    @return void
    */
    onGetLoginStatus: function(){
      console.log('checking login state...');
      FB.getLoginStatus(function(response) {
         console.log('>>>>>>>>>>', response)
      });
    },

    /*
    This is triggered when the action statusChange action (callback) is called
    @param {object} Facebook response
    @return void
    */
    onStatusChange: function(response){
      console.log('statusChange');
    }
});

module.exports = FacebookStore;
