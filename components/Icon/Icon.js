import React from 'react';
import PropTypes from 'prop-types';

// import css from './Icon.module.scss';

const Icon = ({ name, size = 'md', className }) => {
  return (
    <ion-icon
      name={`${name}-sharp`}
      className={[
        // css.icon,
        className || '',
      ].join(' ')}
      style={{
        fontSize: `var(--font-size-${size})`,
      }}
    />
  );
};

Icon.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Icon;
