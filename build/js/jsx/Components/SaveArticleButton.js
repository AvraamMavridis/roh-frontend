

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
