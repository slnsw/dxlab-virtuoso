import React from 'react';
import PropTypes from 'prop-types';

// import css from './Icon.module.scss';

const Icon = ({ name, className }) => {
  return (
    <ion-icon
      // name={`${name}-sharp`}  // this breaks the ones starting with 'logo-'
      name={name}
      className={[
        // css.icon,
        className || '',
      ].join(' ')}
      style={{
        fontSize: 'var(--font-size-sm)',
      }}
    />
  );
};

Icon.propTypes = {
  className: PropTypes.string,
};

export default Icon;
