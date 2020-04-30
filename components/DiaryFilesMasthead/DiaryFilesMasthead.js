import React from 'react';
import PropTypes from 'prop-types';

import CTAButton from '../CTAButton';
import Typewriter from '../DiaryFilesHome/Typewriter';

import css from './DiaryFilesMasthead.module.scss';

const DiaryFilesMasthead = ({ className }) => {
  return (
    <div className={[css.diaryFilesMasthead, className || ''].join(' ')}>
      <Typewriter />
      <p>Everyone has a story to tell</p>

      <CTAButton href="/diary-files/write" className={css.mastheadButton}>
        Start writing
      </CTAButton>
      <CTAButton href="/diary-files/about" className={css.mastheadButton}>
        About
      </CTAButton>
    </div>
  );
};

DiaryFilesMasthead.propTypes = {
  className: PropTypes.string,
};

export default DiaryFilesMasthead;
