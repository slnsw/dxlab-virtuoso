import { Component } from 'react';
import PropTypes from 'prop-types';

import CTAButton from '../CTAButton';

import css from './TileButtonGroup.module.scss';

class TileButtonGroup extends Component {
  static propTypes = {
    primaryUrl: PropTypes.string,
    primaryText: PropTypes.string,
    primaryTarget: PropTypes.string,
    secondaryUrl: PropTypes.string,
    secondaryText: PropTypes.string,
    secondaryTarget: PropTypes.string,
    tertiaryUrl: PropTypes.string,
    tertiaryText: PropTypes.string,
    tertiaryTarget: PropTypes.string,
  };

  render() {
    const {
      primaryUrl,
      primaryText,
      primaryTarget,
      secondaryUrl,
      secondaryText,
      secondaryTarget,
      tertiaryUrl,
      tertiaryText,
      tertiaryTarget,
    } = this.props;

    return (
      <div className={css.tileButtonGroup}>
        {primaryUrl && (
          <CTAButton
            href={primaryUrl}
            target={primaryTarget}
            className={css.primaryButton}
          >
            {primaryText}
          </CTAButton>
        )}

        {secondaryUrl && (
          <CTAButton
            href={secondaryUrl}
            target={secondaryTarget}
            size="sm"
            className={css.secondaryButton}
          >
            {secondaryText}
          </CTAButton>
        )}

        {tertiaryUrl && (
          <CTAButton
            href={tertiaryUrl}
            target={tertiaryTarget}
            size="sm"
            className={css.secondaryButton}
          >
            {tertiaryText}
          </CTAButton>
        )}
      </div>
    );
  }
}

export default TileButtonGroup;
