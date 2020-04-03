import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

// import css from './Select.module.scss';

const Select = ({
  options,
  // defaultOption,
  // variant = 'light',
  className,
  onChange,
}) => {
  return (
    <ReactSelect
      options={options}
      className={className}
      styles={{
        placeholder: (provider) => {
          return {
            ...provider,
            color: 'var(--colour-white)',
          };
        },
        control: (provided) => {
          return {
            ...provided,
            borderColor: 'var(--colour-white)',
            // '&:hover': {
            //   outlineWidth: '2px !important',
            //   outlineStyle: 'solid !important',
            //   outlineColor: 'Highlight !important',
            // },
          };
        },
        option: (provided) => {
          // console.log(provided);

          return {
            ...provided,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'var(--colour-white)',
            borderTop: 'none',
            // color: cssVariables['colour-grey-800'],
          };
        },
        menu: (provided) => {
          return {
            ...provided,
            borderTop: '1px solid var(--colour-white)',
            // margin: 0,
          };
        },
        menuList: (provided) => {
          return {
            ...provided,
            padding: 0,
          };
        },
        // Value in 'control'
        singleValue: (provided) => {
          return {
            ...provided,
            color: 'var(--colour-white)',
          };
        },
        dropdownIndicator: (provided) => {
          return {
            ...provided,
            color: 'var(--colour-white)',
            ':hover': 'var(--colour-primary)',
          };
        },
      }}
      theme={(theme) => {
        // console.log(theme);

        return {
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary: 'var(--colour-primary)',
            // Hover option background-color
            primary25: 'var(--colour-grey-darkest)',
            primary50: 'var(--colour-grey-darker)',
            // primary75: 'var(--colour-primary)',
            neutral0: 'var(--colour-black)',
            // neutral80: 'var(--colour-white)',
            // neutral90: 'var(--colour-white)',
          },
        };
      }}
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

  className: PropTypes.string,
};

export default Select;
