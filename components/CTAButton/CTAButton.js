import { Component } from 'react';
import PropTypes from 'prop-types';

import Link from '../Link';

class CTAButton extends Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    size: PropTypes.string,
    target: PropTypes.string,
  };

  render() {
    const { children, href, size, target } = this.props;

    // TODO: Make this DRY
    return href && href.match('^http') ? (
      <a
        href={href}
        className={`button ${size ? `button--${size}` : ''}`}
        target={target}
      >
        {children}
      </a>
    ) : (
      <Link as={href}>
        <a
          // href={href}
          className={`button ${size ? `button--${size}` : ''}`}
          target={target}
        >
          {children}
        </a>
      </Link>
    );
  }
}

export default CTAButton;
