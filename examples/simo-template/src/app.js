/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import _ from 'lodash';

import noImage from './images/noImage.png';
import Style from './app.less';
import text from './text.text';
import markdown from './markdown.md';
class App extends React.Component {
  componentDidMount() {
    console.log('lodash.keys', Object.keys(_));

    console.log('text', text);

    console.log('markdown', markdown);
  }

  debugger;

  render() {
    return (
      <div>
        <h3 className={Style['title']}> hello simo </h3>
        hello world dddddddddsasasass
        <img src={noImage} />
      </div>
    );
  }
}

export default App;
