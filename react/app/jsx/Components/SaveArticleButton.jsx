

var SaveArticleButton = React.createClass({

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
      <span className={this.state.classname} onMouseOver={this.mouseOver}></span>
    );
  },

});
