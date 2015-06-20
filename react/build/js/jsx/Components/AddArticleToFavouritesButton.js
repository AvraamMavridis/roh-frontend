
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
