'use strict';

var NewsStore = require('../Stores/NewsStore.jsx');
var ExpandArticleButton = require('../Components/ExpandArticleButton.jsx');
var AddArticleToFavouritesButton = require('../Components/AddArticleToFavouritesButton.jsx');
var Reflux = require('reflux')

var NewsRow = React.createClass({

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
        <div className={this.state.className} id={'newsrow-' + this.props.id }>
            <div className="panel-heading">
                <h2 className="panel-title">{ this.state.title }</h2>
                <span className="label pull-right time">{this.props.item.displayTime}</span>
            </div>
            <div className="panel-body">
                  <ExpandArticleButton id={this.props.id} />
                  <AddArticleToFavouritesButton item={this.props.item} />
                  <p className={this.state.summaryClass}>
                    Nullam et quam eros. Integer non luctus ante. Quisque luctus elit vel nisi pellentesque pretium. Mauris in fermentum odio, vel ultrices quam. Suspendisse potenti. Ut nibh nunc, varius vitae gravida ut, luctus ut mi. Nullam semper lectus neque, non finibus nisi vestibulum id.
                  </p>
            </div>
        </div>
    );
  }
});

module.exports = NewsRow

//<a href={this.props.item.link} className="btn btn-material-lime btn-sm pull-right">Διαβάστε περισσότερα</a>
