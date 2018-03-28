import { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import './Popover.css';
// import Link from '../Link';

class Popover extends Component {
  static propTypes = {
    items: PropTypes.array,
    // selectedItemIndex: PropTypes.number,
  };

  constructor() {
    super();

    this.state = {
      isOpen: false,
      selectedItemIndex: 0,
    };
  }

  handleTitleClick = (event, i) => {
    event.preventDefault();

    this.setState({
      isOpen: !this.state.isOpen,
    });

    if (typeof i === 'number') {
      this.setState({
        selectedItemIndex: i,
      });

      const url = this.props.items[i].url;
      Router.push(url);
    }
  };

  render() {
    const { items } = this.props;
    const { isOpen, selectedItemIndex } = this.state;
    const selectedItem = items[selectedItemIndex];

    return (
      <div className="popover">
        <div className="popover__title" onClick={this.handleTitleClick}>
          {selectedItem.name}{' '}
          {isOpen ? (
            <span
              dangerouslySetInnerHTML={{
                __html: '&#9652;',
              }}
            />
          ) : (
            <span
              dangerouslySetInnerHTML={{
                __html: '&#9662;',
              }}
            />
          )}
        </div>

        {isOpen && (
          <div className="popover__items">
            <ul>
              {items.map((item, i) => {
                return (
                  <li>
                    <a onClick={(event) => this.handleTitleClick(event, i)}>
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Popover;
