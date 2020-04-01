import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import css from './MenuIconButton.module.scss';

const MenuIconButton = ({ isOpen, className, ...restProps }) => {
  return (
    <Button
      className={[
        css.menuIconButton,
        isOpen ? css.isOpen : '',
        className || '',
      ].join(' ')}
      {...restProps}
    >
      <div>
        <span />
        <span />
        <span />
        <span />
      </div>
    </Button>
  );
};

MenuIconButton.propTypes = {
  className: PropTypes.string,
};

export default MenuIconButton;
