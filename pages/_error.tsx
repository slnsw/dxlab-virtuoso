import { Component } from 'react';

import WebsiteApp from '../components/WebsiteApp';
import initMaze from '../lib/dxmaze';
// import './_error.css';

class Four04 extends Component {
  componentDidMount() {
    initMaze();
  }

  render() {
    return (
      <WebsiteApp>
        <div className="error-page container container--lg" id="dxmaze-holder">
          <canvas id="dxmaze" />
          <h1>Some experiments fail.</h1>
          <h2>Page not found!</h2>
        </div>
      </WebsiteApp>
    );
  }
}

export default Four04;
