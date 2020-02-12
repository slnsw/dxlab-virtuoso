import { Component } from 'react';
import PropTypes from 'prop-types';

import Link from '../Link';
import Image from '../Image';
// import TileImage from '../TileImage';
// import Button from '../Button';
import './SimpleTile.css';

class SimpleTile extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    url: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    imageAltText: PropTypes.string,
  };

  render() {
    const { title, subtitle, url, imageUrl, imageAltText } = this.props;

    return (
      <article className="simple-tile simple-tile--tall">
        {/* <TileImage
          imageUrl={imageUrl}
          url={url}
          className="simple-tile__image"
        /> */}

        <Link to={url}>
          <a href={url} className="simple-tile__image">
            <Image src={imageUrl} alt={imageAltText || title} />
          </a>
        </Link>

        <div className="simple-tile__info">
          <h1 className="simple-tile__title">
            <Link to={url}>
              <a href={url} dangerouslySetInnerHTML={{ __html: title }} />
            </Link>
          </h1>
          <p className="simple-tile__subtitle">{subtitle}</p>
        </div>
      </article>
    );
  }
}

export default SimpleTile;
