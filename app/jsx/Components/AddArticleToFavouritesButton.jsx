

var AddArticleToFavouritesButton = React.createClass({

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
      url: 'http://localhost:8001/articles',
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
      <a className="btn icon-btn-wrapper add-article-to-favourites-wrapper btn-fab btn-raised pull-right">
      <span className={this.state.classname + ' icon-btn save-article'}
            onMouseOver={this.mouseOver}
            onMouseOut={this.mouseOut}
            onClick={this.mouseClick}>
      </span>
      </a>
    );
  },

});

module.exports = AddArticleToFavouritesButton;
