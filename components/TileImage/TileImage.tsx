import { Component } from 'react';

import Link from '../Link';
// import './TileImage.css';

type Props = {
  url?: string;
  target?: string;
  imageUrl?: string;
  className?: string;
  ariaLabel?: string;
  onMouseOver?: Function;
  onMouseOut?: Function;
};

class TileImage extends Component<Props> {
  handleMouseOver = () => {
    if (typeof this.props.onMouseOver === 'function') {
      this.props.onMouseOver();
    }
  };

  handleMouseOut = () => {
    if (typeof this.props.onMouseOut === 'function') {
      this.props.onMouseOut();
    }
  };

  render() {
    const {
      url,
      target,
      imageUrl,
      className = '',
      ariaLabel = '',
    } = this.props;

    // TODO: Make this DRY!
    return url && url.match('^http') ? (
      <a
        href={url}
        className={`tile-image ${className}`}
        target={target}
        aria-label={ariaLabel}
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        &nbsp;
      </a>
    ) : (
      <Link as={url}>
        <a
          href={url}
          className={`tile-image ${className}`}
          target={target}
          aria-label={ariaLabel}
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        >
          &nbsp;
        </a>
      </Link>
    );
  }
}

export default TileImage;
