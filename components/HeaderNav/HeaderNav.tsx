import React from 'react';
import PropTypes from 'prop-types';

import css from './HeaderNav.module.scss';

const HeaderNav = ({ isOpen, className, children }) => {
  return (
    <nav
      className={[
        css.headerNav,
        isOpen ? css['is-active'] : '',
        className || '',
      ].join(' ')}
    >
      {children}
    </nav>
  );
};

HeaderNav.propTypes = {
  className: PropTypes.string,
};

export default HeaderNav;
