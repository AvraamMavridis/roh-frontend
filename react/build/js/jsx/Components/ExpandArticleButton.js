
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
