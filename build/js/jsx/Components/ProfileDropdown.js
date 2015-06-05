
var UsersStore = require('../Stores/UsersStore.jsx');
var Reflux = require('reflux');
var UsersActions = require('../Actions/UsersActions.jsx');

var ProfileDropdown = React.createClass({displayName: "ProfileDropdown",

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
      React.createElement("div", {className: "profile-dropdown dropdown col-md-offset-10"}, 
        React.createElement("button", {className: "btn btn-default dropdown-toggle", type: "button", id: "dropdownMenu1", "data-toggle": "dropdown", "aria-expanded": "true"}, 
          "Χρηστης", 
          React.createElement("span", {className: "caret"})
        ), 
        React.createElement("ul", {className: "dropdown-menu profile-dropdown-menu", role: "menu", "aria-labelledby": "dropdownMenu1"}, 
          React.createElement("span", {className:  this.state.isAuthorized? 'hidden' : 'show'}, 
          React.createElement("li", {className: "profile-dropdown-item", role: "presentation", onClick: this.showModal}, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "javascript:void(0);"}, "Σύνδεση"))
          ), 
          React.createElement("span", {className:  this.state.isAuthorized? 'show btn-group-vertical no-margin' : 'hidden'}, 
            React.createElement("li", {className: "profile-dropdown-item", role: "presentation"}, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#/account"}, "Προφιλ")), 
            React.createElement("li", {className: "profile-dropdown-item", role: "presentation"}, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "javascript:void(0);", onClick: this.logout}, "Αποσυνδεση"))
          )
        )
      )
    );
  }
})

module.exports = ProfileDropdown;
