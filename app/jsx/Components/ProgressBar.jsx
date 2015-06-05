'use strict';

var NewsStore = require('../Stores/NewsStore.jsx');
var SourcesStore = require('../Stores/SourcesStore.jsx');

var ProgressBar = React.createClass({
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
      <div className='progress col-md-8 col-md-offset-2 no-padding'>
        <div className='progress-bar progress-bar-striped active' role='progressbar' aria-valuemin='0' aria-valuemax='100' style={{width: this.state.progress + '%'}}>
          <span className='sr-only'> Complete</span>
        </div>
      </div>
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

React.render(<ProgressBar/>, document.getElementById('progressbar'));
