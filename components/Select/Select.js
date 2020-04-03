import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

import css from './Select.module.scss';

const Select = ({
  options, // defaultOption,
  variant = 'dark',
  className,
  onChange,
}) => {
  return (
    <ReactSelect
      options={options}
      className={className}
      // styles={{
      //   option: (provided) => ({
      //     ...provided,
      //     color: cssVariables['colour-grey-800'],
      //   }),
      //   control: (provided) => ({
      //     ...provided,
      //     height: '48px',
      //     backgroundColor:
      //       variant === 'black'
      //         ? cssVariables['colour-grey-800']
      //         : cssVariables['colour-white'],
      //     borderWidth: variant === 'black' ? 0 : 1,
      //     // '&:hover': {
      //     //   outlineWidth: '2px !important',
      //     //   outlineStyle: 'solid !important',
      //     //   outlineColor: 'Highlight !important',
      //     // },
      //   }),
      //   singleValue: (provided) => ({
      //     ...provided,
      //     color:
      //       variant === 'black'
      //         ? cssVariables['colour-white']
      //         : cssVariables['colour-grey-800'],
      //   }),
      // }}
      // theme={(theme) => ({
      //   ...theme,
      //   height: '48px',
      //   borderRadius: cssVariables['border-radius'],
      //   colors: {
      //     ...theme.colors,
      //     primary: cssVariables['colour-primary'],
      //   },
      // })}
      onChange={onChange}
    />
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  variant: PropTypes.oneOfType(['dark', 'light']),
  className: PropTypes.string,
};

export default Select;
