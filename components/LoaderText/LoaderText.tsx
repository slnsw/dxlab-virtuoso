import { Component } from 'react';
import PropTypes from 'prop-types';

class LoaderText extends Component {
  static propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    text: 'Loading',
  };

  render() {
    const { text, className, style } = this.props;

    return (
      <div className={['loader-text', className || ''].join(' ')} style={style}>
        {text} <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    );
  }
}

export default LoaderText;
