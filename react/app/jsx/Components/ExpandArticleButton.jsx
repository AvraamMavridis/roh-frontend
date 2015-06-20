
var NewsActions = require('../Actions/NewsActions.jsx');

var ExpandArticleButton = React.createClass({
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
      <a href="javascript:void(0)" className="btn icon-btn-wrapper btn-fab btn-raised pull-right" onClick={this.mouseClick}>
      <span className={this.state.className + ' icon-btn'}
        id={this.state.id}
        >
      </span>
      </a>
    );
  },

  componentDidUpdate: function() {

  }
});

module.exports = ExpandArticleButton
