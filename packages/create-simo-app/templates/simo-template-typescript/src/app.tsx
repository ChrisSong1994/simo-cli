
import * as React from 'react';

import noImage from './images/noImage.png';
import Style from './app.less';

class App extends React.Component {
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
