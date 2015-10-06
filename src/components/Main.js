require('normalize.css');
require("font-awesome-webpack");
require('bootstrap/dist/css/bootstrap.css');
require('styles/App.scss');

import React from 'react/addons';

let Article = require('./Article/Article');

class AppComponent extends React.Component {
  render() {
    return (
      <span className="something">
        <Article/>
      </span>
    );
  }
}


AppComponent.defaultProps = {
};

export default AppComponent;
