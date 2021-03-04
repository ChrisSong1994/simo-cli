/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import _ from 'lodash';

import noImage from './images/noImage.png';
import Style from './app.less';

class App extends React.Component {
  componentDidMount() {
    console.log('lodash.keys', Object.keys(_));
  }

  render() {
    return (
      <div>
        <h3 className={Style['title']}> hello simo </h3>
        hello world ddddddddds
        <img src={noImage} />
      </div>
    );
  }
}

export default App;
