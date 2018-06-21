import { Component } from 'react';
import PropTypes from 'prop-types';

import './CollectionParts.css';
import Link from '../Link';

class CollectionParts extends Component {
  static propTypes = {
    parts: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        level: PropTypes.string,
        images: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string,
          }),
        ),
      }),
    ),
  };

  render() {
    const { parts } = this.props;

    return parts ? (
      <div className="collection-parts">
        <ul>
          {parts.map((part) => {
            const imageUrl =
              part.images && part.images[0] && part.images[0].url;

            return (
              <li
                className="collection-part"
                key={`collection-part-${part.id}`}
              >
                <div className="collection-part__image-holder">
                  {imageUrl && (
                    <img
                      className="collection-part__image"
                      src={imageUrl}
                      alt={part.title}
                    />
                  )}
                </div>

                <div className="collection-part__info">
                  <div className="collection-part__level">{part.level}</div>
                  <Link to={`/collection/item/ADLIB${part.id}`}>
                    <a className="collection-part__title">{part.title}</a>
                  </Link>

                  <CollectionParts parts={part.parts} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    ) : null;
  }
}

export default CollectionParts;
