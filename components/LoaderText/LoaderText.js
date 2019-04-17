import { Component } from 'react';
import PropTypes from 'prop-types';

import './LoaderText.css';

class LoaderText extends Component {
  static propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    text: 'Loading',
  };

  render() {
    const { text, className } = this.props;

    return (
      <div className={['loader-text', className || ''].join(' ')}>
        {text} <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    );
  }
}

export default LoaderText;
