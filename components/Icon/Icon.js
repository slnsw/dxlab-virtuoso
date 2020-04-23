import React from 'react';
import PropTypes from 'prop-types';

// import css from './Icon.module.scss';

const Icon = ({ name, size = 'md', className }) => {
  const isLogo = ['facebook', 'twitter'].includes(name);

  return (
    <ion-icon
      name={`${isLogo ? 'logo-' : ''}${name}${isLogo ? '' : '-sharp'}`}
      // name={name}
      class={[
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
