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
  variant?: 'dark' | 'light';
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
  variant = 'dark',
  className,
  onChange,
  isDisabled,
  isSearchable = false,
}) => {
  const variantColour =
    variant === 'light' ? 'var(--colour-black)' : 'var(--colour-white)';

  return (
    <ReactSelect
      options={options}
      defaultValue={defaultValue}
      value={value}
      className={[css.select, className || ''].join(' ')}
      styles={{
        placeholder: (provider) => {
          return {
            ...provider,
            // Adjustment due to Barlow font
            top: '48%',
            color: variantColour,
            fontFamily: 'var(--font-primary)',
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
            fontFamily: 'var(--font-primary)',
            textTransform: 'capitalize',
          };
        },
        // Value in 'control'
        singleValue: (provided) => {
          return {
            ...provided,
            color: variantColour,
            top: '48%',
            fontFamily: 'var(--font-primary)',
            textTransform: 'capitalize',
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

export default Select;
