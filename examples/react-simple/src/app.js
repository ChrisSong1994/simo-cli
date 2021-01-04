/* eslint-disable no-unused-vars */
import * as React from 'react';

import noImage from './images/noImage.png';

class App extends React.Component {
  render() {
    return (
      <div>
        hello world
        <img src={noImage} />
      </div>
    );
  }
}

export default App;
