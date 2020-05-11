import React from 'react';
import PropTypes from 'prop-types';

import css from './HeaderNavV2.module.scss';

const HeaderNavV2 = ({ isOpen, children, className, insideClassName }) => {
  return (
    <div className={[css.headerNavV2, className || ''].join(' ')}>
      <div
        className={[
          css.inside,
          insideClassName || '',
          isOpen ? css.isOpen : '',
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  );
};

HeaderNavV2.propTypes = {
  className: PropTypes.string,
  insideClassName: PropTypes.string,
};

export default HeaderNavV2;
