import { Component } from 'react';
import PropTypes from 'prop-types';

type Props = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
};

class LoaderText extends Component<Props> {
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
