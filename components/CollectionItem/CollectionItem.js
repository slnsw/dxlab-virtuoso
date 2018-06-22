import { Component } from 'react';
import PropTypes from 'prop-types';

import './CollectionItem.css';
import Link from '../Link';
import NoImage from '../NoImage';

class CollectionItem extends Component {
  static propTypes = {
    id: PropTypes.string,
    layoutType: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    type: PropTypes.string,
    totalImages: PropTypes.number,
  };

  render() {
    const {
      id,
      layoutType,
      title,
      description,
      imageUrl,
      type,
      totalImages,
    } = this.props;

    return (
      <article
        className={`collection-item ${
          layoutType === 'grid' ? 'collection-item--grid' : undefined
        }`}
        key={`collection-item-${id}`}
      >
        <Link to={`/collection/item/${id}`}>
          <a>
            <div
              className={`collection-item__image-holder ${
                imageUrl ? '' : 'collection-item__image-holder--no-image'
              }`}
            >
              {imageUrl ? <img src={imageUrl} alt={title} /> : <NoImage />}

              {totalImages > 1 && (
                <div className="collection-item__image-holder__total-images">
                  {totalImages > 10 ? '+10' : totalImages} Images
                </div>
              )}
            </div>

            <div className="collection-item__info">
              <div className="collection-item__type">{type}</div>
              <h1 className="collection-item__title">{title}</h1>

              {description && (
                <div className="collection-item__content">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  />
                </div>
              )}
              <p className="collection-item__id">{id}</p>
            </div>
          </a>
        </Link>
      </article>
    );
  }
}

export default CollectionItem;
