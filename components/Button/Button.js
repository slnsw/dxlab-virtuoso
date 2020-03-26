import { Component } from 'react';
import PropTypes from 'prop-types';

// import './Button.css';
import Link from '../Link';

class Button extends Component {
  static propTypes = {
    href: PropTypes.string,
    size: PropTypes.string,
    target: PropTypes.string,
    onClick: PropTypes.func,
  };

  render() {
    const { children, href, size, target, onClick } = this.props;

    // TODO: Make this DRY
    return href && href.match('^http') ? (
      <a
        href={href}
        className={`button ${size ? `button--${size}` : ''}`}
        target={target}
        onClick={onClick}
      >
        {children}
      </a>
    ) : (
      <Link as={href}>
        <a
          className={`button ${size ? `button--${size}` : ''}`}
          target={target}
          onClick={onClick}
        >
          {children}
        </a>
      </Link>
    );
  }
}

export default Button;
