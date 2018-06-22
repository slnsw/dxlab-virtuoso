import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import './CollectionParts.css';
import Link from '../Link';

class CollectionPart extends Component {
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
          {imageUrl && (
            <img
              className="collection-part__image"
              src={imageUrl}
              alt={part.title}
            />
          )}
        </div>

        <div className="collection-part__info">
          <div className="collection-part__content">
            <div className="collection-part__level">{part.level}</div>
            <Link to={`/collection/item/ADLIB${part.id}`}>
              <a className="collection-part__title">{part.title}</a>
            </Link>
          </div>

          {part.parts &&
            part.parts.length > 0 && (
              <Fragment>
                <button
                  className="collection-part__toggle-button button"
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

                {isShowingParts && <CollectionParts parts={part.parts} />}
              </Fragment>
            )}
        </div>
      </li>
    );
  }
}

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
            return <CollectionPart part={part} />;
          })}
        </ul>
      </div>
    ) : null;
  }
}

export default CollectionParts;
