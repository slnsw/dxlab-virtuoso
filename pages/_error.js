import { Component } from 'react';

import App from '../components/App';
import initMaze from '../lib/dxmaze';
// import './_error.css';

class Four04 extends Component {
  componentDidMount() {
    initMaze();
  }

  render() {
    return (
      <App>
        <div className="error-page container container--lg" id="dxmaze-holder">
          <canvas id="dxmaze" />
          <h1>Some experiments fail.</h1>
          <h2>Page not found!</h2>
        </div>
      </App>
    );
  }
}

export default Four04;
