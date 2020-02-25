import { Component } from 'react';
import PropTypes from 'prop-types';

import './RelatedCollectionItems.css';
import Link from '../Link';

class RelatedCollectionItems extends Component {
  static propTypes = {
    item: PropTypes.array,
  };

  render() {
    const { items } = this.props;

    return (
      <div className="related-collection-items">
        <h2>Related Items</h2>

        <div className="related-collection-items__cards">
          {items.map((item) => {
            return (
              <article
                className="related-collection-items__card"
                key={`related-collection-items__card-${item.id}`}
              >
                <Link as={`/collection/item/${item.id}`}>
                  <a>
                    <div className="related-collection-items__card__type">
                      {item.type}
                    </div>

                    <div className="related-collection-items__card__content">
                      {item.images && (
                        <div className="related-collection-items__card__image-holder">
                          <img src={item.images[0].url} alt={item.title} />
                        </div>
                      )}
                      <h1 className="related-collection-items__card__title">
                        {item.title}
                      </h1>
                    </div>
                  </a>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    );
  }
}

export default RelatedCollectionItems;
