import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

import css from './SearchTextInput.module.scss';

type Props = {
  name?: string;
  value?: string;
  placeholder?: string;
  className?: string;
  onChange?: Function;
};

const SearchTextInput: React.FC<Props> = ({
  name,
  value,
  placeholder,
  className,
  onChange,
  ...restProps
}) => {
  const [inputValue, setInputValue] = React.useState(value);

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (event) => {
    const newValue = event?.target?.value;
    setInputValue(newValue);

    if (typeof onChange === 'function') {
      onChange(event);
    }
  };

  const handleCloseClick = () => {
    setInputValue('');
  };

  return (
    <div className={[css.searchTextInput, className || ''].join(' ')}>
      <input
        name={name}
        type="text"
        placeholder={placeholder}
        value={inputValue || ''}
        onChange={handleInputChange}
        {...restProps}
      />

      {inputValue && inputValue.length > 0 && (
        <button
          type="button"
          className={css.clearButton}
          aria-label="Clear text"
          onClick={handleCloseClick}
        >
          <Icon name="close" colour="white" size={'lg'} />
        </button>
      )}
    </div>
  );
};

SearchTextInput.propTypes = {
  className: PropTypes.string,
};

export default SearchTextInput;
