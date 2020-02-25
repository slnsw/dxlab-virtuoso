import { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';

import './CollectionPart.css';
import CollectionParts from '../CollectionParts';
import NoImage from '../NoImage';
import Link from '../Link';

class CollectionPart extends Component {
  // static propTypes = {
  //   part:
  // }

  constructor() {
    super();

    this.state = {
      isShowingParts: false,
    };
  }

  handleToggleButton = () => {
    this.setState({
      isShowingParts: !this.state.isShowingParts,
    });
  };

  render() {
    const { part } = this.props;
    const { isShowingParts } = this.state;
    const imageUrl = part.images && part.images[0] && part.images[0].url;

    return (
      <li className="collection-part" key={`collection-part-${part.id}`}>
        <div className="collection-part__image-holder">
          {imageUrl ? (
            <img
              className="collection-part__image"
              src={imageUrl}
              alt={part.title}
            />
          ) : (
            <NoImage />
          )}
        </div>

        <div className="collection-part__info">
          <div className="collection-part__content">
            <div className="collection-part__level">{part.level}</div>
            <Link as={`/collection/item/ADLIB${part.id}`}>
              <a className="collection-part__title">{part.title}</a>
            </Link>
          </div>

          {part.parts && part.parts.length > 0 && (
            <Fragment>
              <button
                className="collection-part__toggle-button"
                onClick={this.handleToggleButton}
              >
                {isShowingParts
                  ? 'Hide'
                  : `More (${
                      part.parts.length > 9 ? '+10' : part.parts.length
                    })`}
              </button>

              <br />
              <br />

              {isShowingParts && (
                <CollectionParts
                  id={part.id}
                  // parts={part.parts}
                />
              )}
            </Fragment>
          )}
        </div>
      </li>
    );
  }
}

export default CollectionPart;
