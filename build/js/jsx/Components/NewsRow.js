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
