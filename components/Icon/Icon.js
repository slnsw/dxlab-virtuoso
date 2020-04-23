import React from 'react';
import PropTypes from 'prop-types';

// import css from './Icon.module.scss';

const Icon = ({ name, size = 'md', className }) => {
  const isSharp = ['close'].includes(name);

  return (
    <ion-icon
      name={`${name}${isSharp ? '-sharp' : ''}`}
      // name={name}
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
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xlg', 'xxlg']),
  className: PropTypes.string,
};

export default Icon;
