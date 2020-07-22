/* eslint css-modules/no-unused-class: [2, { markAsUsed: ['white', 'grey', 'black', 'sm', 'md', 'lg', 'xlg', 'xxlg'] }] */
import React from 'react';
import PropTypes from 'prop-types';

import { getSVG } from './getSVG';
import css from './Icon.module.scss';

const Icon = ({ name, size = 'md', colour, style, className }) => {
  const isLogo = ['facebook', 'twitter'].includes(name);

  return (
    <span
      style={style}
      className={[
        css.svgIcon,
        css[size],
        className || '',
        colour ? css[colour] : '',
      ].join(' ')}
    >
      <svg
        className={[css.svg, className].join(' ')}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        aria-hidden={true}
        focusable={false}
      >
        {getSVG(`${isLogo ? 'logo-' : ''}${name}${isLogo ? '' : '-sharp'}`)}
      </svg>
    </span>
  );
};

Icon.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xlg', 'xxlg']),
  colour: PropTypes.oneOf(['white', 'grey', 'black']),
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Icon;
