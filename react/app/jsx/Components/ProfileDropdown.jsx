
var UsersStore = require('../Stores/UsersStore.jsx');
var Reflux = require('reflux');
var UsersActions = require('../Actions/UsersActions.jsx');

var ProfileDropdown = React.createClass({

  mixins:[Reflux.listenTo(UsersStore, 'isAuthorized')],

  getInitialState: function(){
    return{
      isAuthorized: false
    }
  },

  isAuthorized: function(data){
    this.setState({
      isAuthorized: data.isAuthorized
    });
  },

  showModal: function(){
    if(!this.state.isAuthorized){
      $('#myModal').modal('show');
    }
  },

  logout: function(){
    this.setState({
      isAuthorized: false
    });
    UsersActions.logout();
  },

  render: function(){

    return(
      <div className="profile-dropdown dropdown col-md-offset-10">
        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
          Χρηστης
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu profile-dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
          <span className={ this.state.isAuthorized? 'hidden' : 'show'}>
          <li className="profile-dropdown-item" role="presentation" onClick={this.showModal}><a role="menuitem" tabIndex="-1" href="javascript:void(0);">Σύνδεση</a></li>
          </span>
          <span className={ this.state.isAuthorized? 'show btn-group-vertical no-margin' : 'hidden'}>
            <li className="profile-dropdown-item" role="presentation"><a role="menuitem" tabIndex="-1" href="#/account">Προφιλ</a></li>
            <li className="profile-dropdown-item" role="presentation"><a role="menuitem" tabIndex="-1" href="javascript:void(0);" onClick={this.logout}>Αποσυνδεση</a></li>
          </span>
        </ul>
      </div>
    );
  }
})

module.exports = ProfileDropdown;
