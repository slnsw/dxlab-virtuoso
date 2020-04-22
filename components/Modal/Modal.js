import React from 'react';
import PropTypes from 'prop-types';

import Overlay from '../Overlay';
import Icon from '../Icon';

import css from './Modal.module.scss';

const Modal = ({ isActive, children, className, onClose }) => {
  return (
    <>
      <div
        className={[
          css.modal,
          isActive ? css.isActive : '',
          className || '',
        ].join(' ')}
      >
        <button
          className={css.closeButton}
          onClick={() => {
            if (typeof onClose === 'function') {
              onClose();
            }
          }}
        >
          <Icon name="close" size="xlg" />
        </button>

        {children}
      </div>

      <Overlay
        isActive={isActive}
        onClick={() => {
          if (typeof onClose === 'function') {
            onClose();
          }
        }}
      />
    </>
  );
};

Modal.propTypes = {
  isActive: PropTypes.bool,
  className: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.element,
};

export default Modal;
