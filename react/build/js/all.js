'use strict';

var Reflux = require('reflux');

var NewsActions = Reflux.createActions(['newsUpdate','requestNews','expandArticle']);

module.exports = NewsActions;

var Reflux = require('reflux');

var SourcesActions = Reflux.createActions(['requestSources', 'sourcesUpdate']);

module.exports = SourcesActions;

var Reflux = require('reflux');

var UsersActions = Reflux.createActions(['userAuthenticate','logout']);

module.exports = UsersActions;


var articlesUrl = require('../Config/config.jsx').Urls.articles;


var AddArticleToFavouritesButton = React.createClass({displayName: "AddArticleToFavouritesButton",

  getInitialState: function(){
    return{
      classname: 'mdi-action-favorite',
      clicked: false
    }
  },

  saveArticle: function(status){
    var method = status ? 'POST' : 'DELETE';
    var article = this.props.item;
    article.username = $.cookie('username');
    article.token = $.cookie('token');
    console.log(article);

    $.ajax({
      url:  articlesUrl,
      type: method,
      data: article
    });
  },

  mouseOver: function(){
    this.setState({
      classname: 'icon-btn mdi-action-favorite mdi-material-red'
    });
  },

  mouseOut: function(){
    this.setState({
      classname: this.state.clicked? 'icon-btn mdi-action-favorite mdi-material-red' : 'icon-btn mdi-action-favorite'
    });
  },

  mouseClick: function(){
    this.setState({
      clicked: !this.state.clicked,
      classname: !this.state.clicked? 'icon-btn mdi-action-favorite mdi-material-red' : 'icon-btn mdi-action-favorite'
    });

    this.saveArticle(!this.state.clicked);
  },

  render: function(){
    return(
      React.createElement("a", {className: "btn icon-btn-wrapper add-article-to-favourites-wrapper btn-fab btn-raised pull-right"}, 
      React.createElement("span", {className: this.state.classname + ' icon-btn save-article', 
            onMouseOver: this.mouseOver, 
            onMouseOut: this.mouseOut, 
            onClick: this.mouseClick}
      )
      )
    );
  },

});

module.exports = AddArticleToFavouritesButton;


var NewsActions = require('../Actions/NewsActions.jsx');

var ExpandArticleButton = React.createClass({displayName: "ExpandArticleButton",
  getInitialState: function(){
    return {
      id: 'expandButton-' + this.props.id,
      className:'mdi-navigation-unfold-more',
      collapsed: true
    };
  },

  mouseClick: function(){
    this.setState({
      className: this.state.collapsed ? 'mdi-navigation-unfold-less' : 'mdi-navigation-unfold-more',
      collapsed: !this.state.collapsed
    });
    this.forceUpdate();
    NewsActions.expandArticle({
      collapsed: this.state.collapsed,
      id: this.props.id
    });
  },

  render: function(){
    return(
      React.createElement("a", {href: "javascript:void(0)", className: "btn icon-btn-wrapper btn-fab btn-raised pull-right", onClick: this.mouseClick}, 
      React.createElement("span", {className: this.state.className + ' icon-btn', 
        id: this.state.id
        }
      )
      )
    );
  },

  componentDidUpdate: function() {

  }
});

module.exports = ExpandArticleButton

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

'use strict';


var ProfileDropdown = require('./ProfileDropdown.jsx')

var NavBar = React.createClass({displayName: "NavBar",
  render: function() {
    return (
      React.createElement("div", {className: "navbar"}, 
      React.createElement("div", {className: "navbar-brand"}, "Latest News"), 
      React.createElement(ProfileDropdown, null)
      )
    );
  }
});

module.exports = NavBar

'use strict';

var Reflux = require('reflux');
var NewsRow = require('./NewsRow.jsx');
var NewsStore = require('../Stores/NewsStore.jsx');

var NewsList = React.createClass({displayName: "NewsList",
  mixins:[Reflux.listenTo(NewsStore, 'newsUpdate')],

  getInitialState: function() {
    return {
      newslist: []
    };
  },

  newsUpdate: function(news){
    var news = _.union(this.state.newslist, news);
    this.setState({ newslist: news});
  },

  render: function(){
    var newslist = this.state.newslist
    return(
      React.createElement("div", {className: "jumbotron col-md-8 col-md-offset-2"}, 
        
          newslist.map(function(item, index){
            return React.createElement(NewsRow, {key: index, item: item, id: index})
          })
        
      )
    )
  }
});

module.exports = NewsList;

'use strict';

var NewsStore = require('../Stores/NewsStore.jsx');
var ExpandArticleButton = require('../Components/ExpandArticleButton.jsx');
var AddArticleToFavouritesButton = require('../Components/AddArticleToFavouritesButton.jsx');
var Reflux = require('reflux')

var NewsRow = React.createClass({displayName: "NewsRow",

  mixins:[Reflux.listenTo(NewsStore, 'articleReact')],

  getDefaultProps: function(){
    return{
      className: 'panel newsrow'
    }
  },

  getInitialState: function(){
    return {
      className: this.props.className,
      title: this.props.item.title.length > 80 ? this.props.item.title.slice(0,80) + '...' : this.props.item.title,
      collapsed: true,
      summaryClass: ''
    }
  },

  articleReact: function(data){
    if(this.props.id === data.id){
      this.setState({
        className: data.collapsed ? this.props.className + ' expanded' : this.props.className,
        collapsed: data.collapsed,
        summaryClass: data.collapsed ? 'visible' : '' ,
      })
    }
  },

  render: function(){
    return(
        React.createElement("div", {className: this.state.className, id: 'newsrow-' + this.props.id}, 
            React.createElement("div", {className: "panel-heading"}, 
                React.createElement("h2", {className: "panel-title"},  this.state.title), 
                React.createElement("span", {className: "label pull-right time"}, this.props.item.displayTime)
            ), 
            React.createElement("div", {className: "panel-body"}, 
                  React.createElement(ExpandArticleButton, {id: this.props.id}), 
                  React.createElement(AddArticleToFavouritesButton, {item: this.props.item}), 
                  React.createElement("p", {className: this.state.summaryClass}, 
                    "Nullam et quam eros. Integer non luctus ante. Quisque luctus elit vel nisi pellentesque pretium. Mauris in fermentum odio, vel ultrices quam. Suspendisse potenti. Ut nibh nunc, varius vitae gravida ut, luctus ut mi. Nullam semper lectus neque, non finibus nisi vestibulum id."
                  )
            )
        )
    );
  }
});

module.exports = NewsRow

//<a href={this.props.item.link} className="btn btn-material-lime btn-sm pull-right">Διαβάστε περισσότερα</a>


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

'use strict';

var NewsStore = require('../Stores/NewsStore.jsx');
var SourcesStore = require('../Stores/SourcesStore.jsx');

var ProgressBar = React.createClass({displayName: "ProgressBar",
  mixins:[Reflux.listenTo(NewsStore, 'progressUpade'),
          Reflux.listenTo(SourcesStore,'setNumberOfSourcesUpdate')],

  // Set the number of sources
  setNumberOfSourcesUpdate: function(sources){
    this.setState({
      numberOfSources: sources.length,
      sourcesProceed: 0
    });
  },

  // Update the progress bar
  progressUpade: function(){
    this.setState({
      sourcesProceed: this.state.sourcesProceed < this.state.numberOfSources ? ++this.state.sourcesProceed : this.state.sourcesProceed
    });

    this.setState({
      progress: this.state.progress < 100 ? this.state.sourcesProceed * (Math.ceil(100/this.state.numberOfSources)) : this.state.progress
    });
  },

  // Return the initial state
  getInitialState: function() {
    return {
      numberOfSources: 0,
      sourcesProceed: 0,
      progress: 0
    };
  },

  // Render component
  render: function(){
    return(
      React.createElement("div", {className: "progress col-md-8 col-md-offset-2 no-padding"}, 
        React.createElement("div", {className: "progress-bar progress-bar-striped active", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": "100", style: {width: this.state.progress + '%'}}, 
          React.createElement("span", {className: "sr-only"}, " Complete")
        )
      )
    );
  },

  componentDidUpdate: function(){
    if(this.isMounted() && this.state.sourcesProceed === this.state.numberOfSources){
      var that = this;
      setTimeout(function(){
        $(that.getDOMNode()).animate({
          opacity: 0,
          height: '-=20'
        },500);
      }, 500);
    }
    return 'block';
  }
});

React.render(React.createElement(ProgressBar, null), document.getElementById('progressbar'));



var SaveArticleButton = React.createClass({displayName: "SaveArticleButton",

  getInitialState: function(){
    return{
      classname: 'mdi-action-favorite mdi-material-red'
    }
  },

  mouseOver: function(){
    this.setState({
      classname: 'icon-btn mdi-action-favorite mdi-material-pink'
    })
  },

  render: function(){
    return(
      React.createElement("span", {className: this.state.classname, onMouseOver: this.mouseOver})
    );
  },

});

'use strict';

var baseUrl = 'http://guarded-springs-1667.herokuapp.com';

var requestParams = {
  news: {
    type: 'GET',
    dataType: 'json',
    url: baseUrl + '/news'
  },
  sources: {
    type: 'GET',
    dataType: 'json',
    url: baseUrl + '/sources'
  }
};

var Config = {
  API: {
    requestNews: function(url,type){
      var request = requestParams.news;
      request.url = (typeof url === 'undefined') ? requestParams.news.url : url;
      request.type = (typeof type === 'undefined') ? requestParams.news.type : type;
      return $.ajax(request);
    },
    requestSources: function(url, type){
      var request = requestParams.sources;
      request.url = (typeof url === 'undefined') ? requestParams.sources.url : url;
      request.type = (typeof type === 'undefined') ? requestParams.sources.type : type;
      return $.ajax(request);
    }
  },

  Urls: {
    signup: baseUrl + '/signup',
    login: baseUrl + '/login',
    validate: baseUrl + '/validate',
    articles: baseUrl + '/articles',
    news: baseUrl + '/news'
  }
}

module.exports = Config;

// Internal Dependencies
var NavBar = require('../Components/NavBar.jsx');

var Account = React.createClass({displayName: "Account",

  render: function(){
    return(
        React.createElement("div", null, "OOOOH YES")
    );
  }
})

module.exports = Account;

// Internal Dependencies
var NavBar = require('../Components/NavBar.jsx');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var SourcesActions = require('../Actions/SourcesActions.jsx');
var SourcesStore = require('../Stores/SourcesStore.jsx');
var Login = require('../Components/Login.jsx');

var Home = React.createClass({displayName: "Home",

  render: function(){
    SourcesActions.requestSources();
    return(
      React.createElement("div", null, 
        React.createElement(NavBar, null), 
        React.createElement(Login, null), 
        React.createElement(RouteHandler, null)
      )
    );
  }
})

module.exports = Home;

var Home = require('./home.jsx');
var Account = require('./account.jsx');
var Router = require('react-router');
var NewsList = require('../Components/NewsList.jsx');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;


var routes = (
  React.createElement(Route, {handler: Home, path: "/"}, 
    React.createElement(Route, {name: "account", handler: Account}), 
    React.createElement(DefaultRoute, {handler: NewsList})
  )
);


Router.run(routes, function (Handler) {
  React.render(React.createElement(Handler, null), document.body);
});

'use strict';

var API = require('../Config/config.jsx').API;
var NewsActions = require('../Actions/NewsActions.jsx');
var Reflux = require('reflux');

// Creates a DataStore
var NewsStore = Reflux.createStore({
    // Initial setup
    listenables: [NewsActions],
    init: function() {

    },

    onExpandArticle: function(data){
      this.trigger({
        collapsed: data.collapsed,
        action: 'expand',
        id: data.id
      });
    },

    onNewsUpdate: function(data){
      this.trigger(data);
      return;
    },

    onRequestNews: function(url){
      NewsActions.newsUpdate([]);
      API.requestNews(url)
       .then(function(data){
         NewsActions.newsUpdate(data);
       },
       function(error){
         console.log('Error requesting the news', error);
       });
    }

});

module.exports = NewsStore;

'use strict';

var SourcesActions = require('../Actions/SourcesActions.jsx');
var NewsActions = require('../Actions/NewsActions.jsx');
var API = require('../Config/Config.jsx').API;
var Reflux = require('reflux');
var newsUrl = require('../Config/config.jsx').Urls.news;

var SourcesStore = Reflux.createStore({
  listenables: [SourcesActions,NewsActions],

  onRequestSources: function(){
    var that = this;
    SourcesActions.sourcesUpdate([]);
    API.requestSources()
      .then(function(sources){
        that.trigger(sources);
        var i = sources.length;
        while(--i){
          NewsActions.requestNews(newsUrl + '/' + sources[i]);
        }
      }, function(error){
        console.log('error',error);
      });
  }
});

module.exports = SourcesStore;

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
