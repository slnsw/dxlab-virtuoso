import { Component } from 'react';
import PropTypes from 'prop-types';

import Link from '../Link';
import TileImage from '../TileImage';
import CTALink from '../CTALink';
import TileButtonGroup from '../TileButtonGroup';

// import './MainTile.css';

type Props = {
  title: string;
  subtitle?: string;
  showTitleButton?: boolean;
  url: string;
  target?: string;
  primaryText?: string;
  secondaryText?: string;
  secondaryUrl?: string;
  secondaryTarget?: string;
  tertiaryText?: string;
  tertiaryUrl?: string;
  tertiaryTarget?: string;
  imageUrl: string;
  imageAltText: string;
  content?: string;
  size?: string;
};

type State = {
  isMouseOver: boolean;
};

class MainTile extends Component<Props, State> {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    showTitleButton: PropTypes.bool,
    url: PropTypes.string,
    target: PropTypes.string,
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
    secondaryUrl: PropTypes.string,
    secondaryTarget: PropTypes.string,
    tertiaryText: PropTypes.string,
    tertiaryUrl: PropTypes.string,
    tertiaryTarget: PropTypes.string,
    imageUrl: PropTypes.string,
    imageAltText: PropTypes.string,
    content: PropTypes.string,
    size: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { isMouseOver: false };
  }

  handleMouseOverImage = () => {
    this.setState({
      isMouseOver: true,
    });
  };

  handleMouseOutImage = () => {
    this.setState({
      isMouseOver: false,
    });
  };

  render() {
    const {
      title,
      subtitle,
      showTitleButton,
      url,
      target,
      imageUrl,
      content,
      size,
      primaryText,
      secondaryText,
      secondaryUrl,
      secondaryTarget,
      tertiaryText,
      tertiaryUrl,
      tertiaryTarget,
      // imageAltText,
    } = this.props;

    return (
      <article
        className={`main-tile ${size && `main-tile--${size}`} ${
          this.state.isMouseOver ? 'main-tile--active' : ''
        }`}
      >
        <TileImage
          imageUrl={imageUrl}
          url={url}
          target={target}
          className="main-tile__image"
          ariaLabel={title}
          onMouseOver={this.handleMouseOverImage}
          onMouseOut={this.handleMouseOutImage}
        />

        <div className="main-tile__info">
          <header className="main-tile__header">
            <h1 className="main-tile__title">
              {url && url.match('^http') ? (
                <a href={url} target={target}>
                  {title}
                </a>
              ) : (
                <Link as={url}>
                  <a target={target}>{title}</a>
                </Link>
              )}
            </h1>
            <div className="main-tile__subtitle">{subtitle}</div>
            {showTitleButton && (
              <div className="main-tile__title-button">
                <CTALink href={url}>Launch Experiment</CTALink>
              </div>
            )}
          </header>

          <div
            className="main-tile__content"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="main-tile__cta">
            <TileButtonGroup
              primaryUrl={showTitleButton ? '' : url}
              primaryText={primaryText}
              // primaryText={secondaryUrl ? 'Read' : 'Launch'}
              primaryTarget={target}
              secondaryUrl={secondaryUrl}
              secondaryText={secondaryText}
              secondaryTarget={secondaryTarget}
              tertiaryUrl={tertiaryUrl}
              tertiaryText={tertiaryText}
              tertiaryTarget={tertiaryTarget}
            />
          </div>
        </div>

        {/* TODO: CSS is targeting Button, hence why it is global. Need to add appropriate styles to Button so global can be removed. */}
      </article>
    );
  }
}

export default MainTile;
