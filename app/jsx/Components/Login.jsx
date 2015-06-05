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

var Login = React.createClass({

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
      <div id='myModal' className='modal fade login' role='dialog'>
        <div className='modal-dialog'>

          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>Σύνδεση</h4>
            </div>
            <div className='modal-body'>
                <form className='form-horizontal col-md-12'>
                    <fieldset>
                        <div className='form-group'>
                            <label htmlFor='inputUsername' className='col-md-2 control-label'>Username</label>
                            <div className='col-md-10'>
                              <input onFocus={this.resetErrorCodes} valueLink={this.linkState('username')} type='text' className='form-control' id='inputUsername' ref='inputUsername' placeholder='π.χ. omorfantras29'/>
                            </div>
                            <label htmlFor='inputPassword' className='col-md-2 control-label'>Password</label>
                            <div className='col-md-10'>
                              <input onFocus={this.resetErrorCodes} valueLink={this.linkState('password')} type='password' className='form-control' id='inputPassword' ref='inputPassword' placeholder='********'/>
                            </div>
                            <span className={this.state.errorClass}>{this.state.errorMessage}</span>
                            <div onClick={this.signup} className='btn btn-default col-md-4 pull-right login-button'>Εγγραφη</div>
                            <div onClick={this.login} className='btn btn-default col-md-4 pull-right login-button'>Εισοδος</div>
                        </div>
                    </fieldset>
                </form>
            </div>
          </div>

        </div>
      </div>
    );
  }
});


module.exports = Login;
