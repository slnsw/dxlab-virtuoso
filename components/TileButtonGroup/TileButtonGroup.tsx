import { Component } from 'react';
import PropTypes from 'prop-types';

import CTALink from '../CTALink';

import css from './TileButtonGroup.module.scss';

type Props = {
  primaryUrl: string;
  primaryText: string;
  primaryTarget: string;
  secondaryUrl: string;
  secondaryText: string;
  secondaryTarget: string;
  tertiaryUrl: string;
  tertiaryText: string;
  tertiaryTarget: string;
};

class TileButtonGroup extends Component<Props> {
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
          <CTALink
            href={primaryUrl}
            target={primaryTarget}
            size="sm"
            className={css.primaryButton}
          >
            {primaryText}
          </CTALink>
        )}

        {secondaryUrl && (
          <CTALink
            href={secondaryUrl}
            target={secondaryTarget}
            size="sm"
            variant="secondary"
            className={css.secondaryButton}
          >
            {secondaryText}
          </CTALink>
        )}

        {tertiaryUrl && (
          <CTALink
            href={tertiaryUrl}
            target={tertiaryTarget}
            size="sm"
            variant="secondary"
            className={css.secondaryButton}
          >
            {tertiaryText}
          </CTALink>
        )}
      </div>
    );
  }
}

export default TileButtonGroup;
