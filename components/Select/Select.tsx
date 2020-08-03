import React from 'react';
// import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

import css from './Select.module.scss';

// Select.propTypes = {
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       value: PropTypes.string,
//       label: PropTypes.string,
//     }),
//   ),
//   variant: PropTypes.oneOf(['dark', 'light']),
//   menuIsOpen: PropTypes.bool,
//   className: PropTypes.string,
//   isDisabled: PropTypes.bool,
// };

type Props = {
  options: Option[];
  defaultValue?: Option;
  value?: Option;
  theme?: 'dark' | 'light';
  menuIsOpen?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  className?: string;
  onChange?: Function;
};

type Option = {
  value: string;
  label: string;
};

const Select: React.FC<Props> = ({
  options,
  defaultValue,
  value,
  menuIsOpen,
  theme = 'dark',
  className,
  onChange,
  isDisabled,
  isSearchable = false,
}) => {
  const themeColour =
    theme === 'light' ? 'var(--colour-black)' : 'var(--colour-white)';
  const bgColour =
    theme === 'light' ? 'var(--colour-white)' : 'var(--colour-black)';
  const disabledOpacity = 0.4;

  return (
    <ReactSelect
      options={options}
      defaultValue={defaultValue}
      value={value}
      className={[css.select, className || ''].join(' ')}
      styles={{
        placeholder: (provider, state) => {
          return {
            ...provider,
            // Adjustment due to Barlow font
            top: '48%',
            color: themeColour,
            fontFamily: 'var(--font-primary)',
            ...(state.isDisabled
              ? {
                  opacity: disabledOpacity,
                }
              : {}),
          };
        },
        control: (provided, state) => {
          // console.log(provided, state);

          return {
            ...provided,
            borderColor: themeColour,
            '&:hover': {
              borderColor: themeColour,
              // outlineWidth: '2px !important',
              // outlineStyle: 'solid !important',
              // outlineColor: 'red !important',
            },
            boxShadow: state.isFocused
              ? '0 0 0 3px var(--colour-primary)'
              : null,
            ...(state.isDisabled
              ? {
                  backgroundColor: bgColour,
                }
              : {}),
          };
        },
        option: (provided) => {
          return {
            ...provided,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: themeColour,
            borderTop: 'none',
          };
        },
        menu: (provided) => {
          return {
            ...provided,
            borderTop: `1px solid ${themeColour}`,
            boxShadow: 'none',
            // margin: 0,
          };
        },
        menuList: (provided) => {
          return {
            ...provided,
            padding: 0,
            fontFamily: 'var(--font-primary)',
            textTransform: 'capitalize',
            color: themeColour,
          };
        },
        // Value in 'control'
        singleValue: (provided, state) => {
          return {
            ...provided,
            color: themeColour,
            top: '48%',
            fontFamily: 'var(--font-primary)',
            textTransform: 'capitalize',
            ...(state.isDisabled
              ? {
                  opacity: disabledOpacity,
                }
              : {}),
          };
        },
        indicatorSeparator: (provided) => {
          return {
            ...provided,
            backgroundColor: themeColour,
          };
        },
        dropdownIndicator: (provided, state) => {
          return {
            ...provided,
            color: themeColour,
            padding: '10px 10px 11px 10px',
            ':hover': 'var(--colour-primary)',
            ...(state.isDisabled
              ? {
                  opacity: disabledOpacity,
                }
              : {}),
          };
        },
      }}
      theme={(selectTheme) => {
        // console.log(theme);

        return {
          ...selectTheme,
          borderRadius: 0,
          colors: {
            ...selectTheme.colors,
            primary: 'var(--colour-primary)',
            // Hover option background-color
            primary25:
              theme === 'light'
                ? 'var(--colour-grey-lightest)'
                : 'var(--colour-grey-darkest)',
            primary50:
              theme === 'light'
                ? 'var(--colour-grey-lighter)'
                : 'var(--colour-grey-darker)',
            // primary75: 'var(--colour-primary)',
            neutral0:
              theme === 'light' ? 'var(--colour-white)' : 'var(--colour-black)',
            neutral20: themeColour,
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

export default Select;
