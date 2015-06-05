'use strict';

var Reflux = require('reflux');
var NewsRow = require('./NewsRow.jsx');
var NewsStore = require('../Stores/NewsStore.jsx');

var NewsList = React.createClass({
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
      <div className="jumbotron col-md-8 col-md-offset-2">
        {
          newslist.map(function(item, index){
            return <NewsRow key={index} item={item} id={index}/>
          })
        }
      </div>
    )
  }
});

module.exports = NewsList;
