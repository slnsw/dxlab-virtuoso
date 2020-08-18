import React from 'react';
import PropTypes from 'prop-types';

import css from './Sidebar.module.scss';

const Sidebar = ({ className, children }) => {
  return (
    <nav className={[css.sidebar, className || ''].join(' ')}>{children}</nav>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default Sidebar;
