'use strict';

let React = require('react');

require('./facebookloginbutton.scss');

let FacebookLoginButton = React.createClass({

  componentWillMount: function () {
          window['statusChangeCallback'] = this.statusChangeCallback;
          window['checkLoginState'] = this.checkLoginState;
  },

  componentDidMount: function () {
      var s = '<div class="fb-login-button" ' +
          'data-scope="public_profile,email" data-size="large" ' +
          'data-show-faces="false" data-auto-logout-link="true" ' +
          'onlogin="checkLoginState"></div>';

      var div = document.getElementById('social-login-button-facebook')
      div.innerHTML = s;
  },

  componentWillUnmount: function () {
      delete window['statusChangeCallback'];
      delete window['checkLoginState'];
  },

  statusChangeCallback: function(response) {
     console.log(response);
  },

  // Callback for Facebook login button
  checkLoginState: function() {
      console.log('checking login state...');
      FB.getLoginStatus(function(response) {
         statusChangeCallback(response);
      });
  },
  
  render: function() {

      return (
          <div id='social-login-button-facebook'></div>
      );
  }
});

module.exports = FacebookLoginButton;
