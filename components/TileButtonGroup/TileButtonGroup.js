import { Component } from 'react';
import PropTypes from 'prop-types';

import CTAButton from '../CTAButton';
// import './TileButtonGroup.css';

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
      <div className="tile-button-group tile-button-group--alt">
        {primaryUrl && (
          <CTAButton href={primaryUrl} target={primaryTarget}>
            {primaryText}
          </CTAButton>
        )}

        {secondaryUrl && (
          <CTAButton href={secondaryUrl} target={secondaryTarget} size="sm">
            {secondaryText}
          </CTAButton>
        )}

        {tertiaryUrl && (
          <CTAButton href={tertiaryUrl} target={tertiaryTarget} size="sm">
            {tertiaryText}
          </CTAButton>
        )}
      </div>
    );
  }
}

export default TileButtonGroup;
