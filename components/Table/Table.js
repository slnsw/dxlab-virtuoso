import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Table.css';

class Table extends Component {
  static propTypes = {
    items: PropTypes.array,
    className: PropTypes.string,
  };

  // .shape({
  // 	name: PropTypes.string,
  // 	value: PropTypes.string,
  // })

  render() {
    const { items, className } = this.props;

    return (
      <div className={`table ${className}`}>
        {items &&
          items.filter((item) => item).map((item, i) => {
            return (
              <div className="table__row" key={`table-row-${i}`}>
                <div className="table__cell table__cell--head">{item.name}</div>
                <div className="table__cell">{item.value}</div>
              </div>
            );
          })}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Table;
