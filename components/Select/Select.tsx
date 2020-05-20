import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

import css from './Select.module.scss';

const Select = ({
  options,
  defaultValue,
  value,
  // isSearchable = false,
  menuIsOpen,
  variant = 'dark',
  className,
  onChange,
  isDisabled,
  isSearchable,
}) => {
  const variantColour =
    variant === 'light' ? 'var(--colour-black)' : 'var(--colour-white)';

  return (
    <ReactSelect
      options={options}
      defaultValue={defaultValue}
      value={value}
      // isSearchable={isSearchable}
      className={[css.select, className || ''].join(' ')}
      styles={{
        placeholder: (provider) => {
          return {
            ...provider,
            // Adjustment due to Barlow font
            top: '48%',
            color: variantColour,
            fontFamily: 'var(--font-secondary)',
          };
        },
        control: (provided, state) => {
          // console.log(provided, state);

          return {
            ...provided,
            borderColor: variantColour,
            '&:hover': {
              borderColor: variantColour,
              // outlineWidth: '2px !important',
              // outlineStyle: 'solid !important',
              // outlineColor: 'red !important',
            },
            boxShadow: state.isFocused
              ? '0 0 0 3px var(--colour-primary)'
              : null,
            ...(state.isDisabled
              ? {
                  backgroundColor: 'var(--colour-grey-darkest)',
                }
              : {}),
          };
        },
        option: (provided) => {
          // console.log(provided);

          return {
            ...provided,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: variantColour,
            borderTop: 'none',
          };
        },
        menu: (provided) => {
          return {
            ...provided,
            borderTop: `1px solid ${variantColour}`,
            boxShadow: 'none',
            // margin: 0,
          };
        },
        menuList: (provided) => {
          return {
            ...provided,
            padding: 0,
            fontFamily: 'var(--font-secondary)',
          };
        },
        // Value in 'control'
        singleValue: (provided) => {
          return {
            ...provided,
            color: variantColour,
            top: '48%',
            fontFamily: 'var(--font-secondary)',
          };
        },
        dropdownIndicator: (provided) => {
          return {
            ...provided,
            color: variantColour,
            padding: '10px 10px 11px 10px',

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
            primary25:
              variant === 'light'
                ? 'var(--colour-grey-lightest)'
                : 'var(--colour-grey-darkest)',
            primary50:
              variant === 'light'
                ? 'var(--colour-grey-lighter)'
                : 'var(--colour-grey-darker)',
            // primary75: 'var(--colour-primary)',
            neutral0:
              variant === 'light'
                ? 'var(--colour-white)'
                : 'var(--colour-black)',
            neutral20: variantColour,
            // neutral80: 'var(--colour-white)',
            // neutral90: 'var(--colour-white)',
          },
        };
      }}
      menuIsOpen={menuIsOpen}
      onChange={onChange}
      isDisabled={isDisabled}
      isSearchable={isSearchable}
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
  variant: PropTypes.oneOf(['dark', 'light']),
  isMenuOpen: PropTypes.bool,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default Select;
