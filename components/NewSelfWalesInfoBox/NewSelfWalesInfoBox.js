import { Component } from 'react';
// import PropTypes from 'prop-types';

import './NewSelfWalesInfoBox.css';

class InfoBox extends Component {
  // static propTypes = {};

  render() {
    // const {} = this.props;

    return (
      <div className="nsw-info-box">
        <h1>#NewSelfWales</h1>
        <p>Share your portrait and become part of our opening exhibitions.</p>

        <button className="button">Read More</button>
      </div>
    );
  }
}

export default InfoBox;
