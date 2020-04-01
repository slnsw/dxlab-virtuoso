import { Component } from 'react';
import PropTypes from 'prop-types';

import Link from '../Link';

import css from './CTAButton.module.scss';

class CTAButton extends Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    size: PropTypes.string,
    target: PropTypes.string,
    className: PropTypes.string,
  };

  render() {
    const { children, href, size, target, className } = this.props;

    // TODO: Make this DRY
    return href && href.match('^http') ? (
      <a
        href={href}
        className={[
          css.ctaButton,
          size ? css.ctaButtonSm : '',
          className || '',
        ].join(' ')}
        target={target}
      >
        {children}
      </a>
    ) : (
      <Link as={href}>
        <a
          // href={href}
          className={[
            css.ctaButton,
            size ? css.ctaButtonSm : '',
            className || '',
          ].join(' ')}
          target={target}
        >
          {children}
        </a>
      </Link>
    );
  }
}

export default CTAButton;
