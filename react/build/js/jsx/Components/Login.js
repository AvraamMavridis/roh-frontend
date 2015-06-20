'use strict';

//External Dependencies
var _ = require('lodash');
var Reflux = require('reflux');

// Internal Dependencies
var config = require('../Config/config.jsx').Login;
var UsersActions = require('../Actions/UsersActions.jsx');
var UsersStore = require('../Stores/UsersStore.jsx');

var signupUrl = require('../Config/config.jsx').Urls.signup;
var loginUrl = require('../Config/config.jsx').Urls.login;
var validateUrl = require('../Config/config.jsx').Urls.validate;

var Login = React.createClass({displayName: "Login",

  mixins: [
    React.addons.LinkedStateMixin,
    Reflux.listenTo(UsersStore, 'isAuthorized')
  ],

  // Listen to UsersStore events and react
  isAuthorized: function(data){
    if(data.isAuthorized != this.state.isAuthorized){
      this.setState({
        isAuthorized: data.isAuthorized
      });
    }
  },

  requestAuth: function(url, data){
    console.log(url)
    return $.post(url, data);
  },

  // Set the cookies after the user successfully authenticate
  setCookies: function(data){
    $.cookie('username', data.username, { expires: 1, path: '/' });
    $.cookie('token', data.token, { expires: 1, path: '/' });
  },

  getInitialState: function(){
    UsersActions.userAuthenticate(false);
    return{
      username: '',
      password: '',
      buttonlabel: 'Συνδεση',
      errorMessage: '',
      errorClass: 'error-hide',
      token: $.cookie('token'),
      isAuthorized: false
    }
  },

  // Reset the error messages on focus in the input form
  resetErrorCodes: function(){
    this.setState({
      errorClass: 'error-hide'
    });
  },

  login: function(){
    var that = this;
    this.requestAuth(loginUrl, { username: this.state.username, password: this.state.password })
      .success(function(data){
        $('#myModal').modal('hide');
        that.setState({
          buttonlabel: that.state.username,
          token: data.token,
          isAuthorized: true
        })
        that.setCookies(data);
        UsersActions.userAuthenticate(true);
      })
      .fail(function(){
        that.setState({
          errorMessage: 'Λανθασμένο username ή password',
          errorClass: 'error-show'
        })
      });
  },


  signup: function(){
    var that = this;
    this.requestAuth(signupUrl, { username: this.state.username, password: this.state.password })
      .success(function(data){
        $('#myModal').modal('hide');
        that.setState({
          buttonlabel: that.state.username,
          token: data.token,
          isAuthorized: true
        })
        that.setCookies(data);
        UsersActions.userAuthenticate(true);
      })
      .fail(function() {
          that.setState({
            errorMessage: 'Ο χρήστης ' + that.state.username + ' υπάρχει.',
            errorClass: 'error-show'
          })
      });
  },

  componentDidMount: function(){
    var isAuthorized = false;
    var that = this;
    var data = { token:  $.cookie('token') };
    this.requestAuth(validateUrl, data)
        .success(function(data){
          that.setState({
            token: data.token,
            isAuthorized: true,
            buttonlabel: data.username,
            username: data.username
          });
          UsersActions.userAuthenticate(true);
        })
        .fail(function(){ that.setState({ isAuthorized: false}); });
  },

  render: function(){
    return(
      React.createElement("div", {id: "myModal", className: "modal fade login", role: "dialog"}, 
        React.createElement("div", {className: "modal-dialog"}, 

          React.createElement("div", {className: "modal-content"}, 
            React.createElement("div", {className: "modal-header"}, 
              React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal"}, "×"), 
              React.createElement("h4", {className: "modal-title"}, "Σύνδεση")
            ), 
            React.createElement("div", {className: "modal-body"}, 
                React.createElement("form", {className: "form-horizontal col-md-12"}, 
                    React.createElement("fieldset", null, 
                        React.createElement("div", {className: "form-group"}, 
                            React.createElement("label", {htmlFor: "inputUsername", className: "col-md-2 control-label"}, "Username"), 
                            React.createElement("div", {className: "col-md-10"}, 
                              React.createElement("input", {onFocus: this.resetErrorCodes, valueLink: this.linkState('username'), type: "text", className: "form-control", id: "inputUsername", ref: "inputUsername", placeholder: "π.χ. omorfantras29"})
                            ), 
                            React.createElement("label", {htmlFor: "inputPassword", className: "col-md-2 control-label"}, "Password"), 
                            React.createElement("div", {className: "col-md-10"}, 
                              React.createElement("input", {onFocus: this.resetErrorCodes, valueLink: this.linkState('password'), type: "password", className: "form-control", id: "inputPassword", ref: "inputPassword", placeholder: "********"})
                            ), 
                            React.createElement("span", {className: this.state.errorClass}, this.state.errorMessage), 
                            React.createElement("div", {onClick: this.signup, className: "btn btn-default col-md-4 pull-right login-button"}, "Εγγραφη"), 
                            React.createElement("div", {onClick: this.login, className: "btn btn-default col-md-4 pull-right login-button"}, "Εισοδος")
                        )
                    )
                )
            )
          )

        )
      )
    );
  }
});


module.exports = Login;
