'use strict';

let React = require('react');
let FacebookActions = require('../../actions/FacebookActions.js');
let FacebookStore = require('../../stores/FacebookStore.js');

require('./facebookloginbutton.scss');

let FacebookLoginButton = React.createClass({

  componentWillMount: function () {
    window['statusChangeCallback'] = FacebookActions.statusChange.bind(this);
    window['checkLoginState'] =  FacebookActions.getLoginStatus.bind(this);
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

  render: function() {
      return (
          <div id='social-login-button-facebook'></div>
      );
  }
});

module.exports = FacebookLoginButton;
