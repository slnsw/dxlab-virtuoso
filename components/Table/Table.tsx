import { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';

// import './Table.css';

type Props = {
  items: any[];
  className?: string;
};

class Table extends Component<Props> {
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
          items
            .filter((item) => item)
            .map((item, i) => {
              return (
                <div className="table__row" key={`table-row-${i}`}>
                  <div className="table__cell table__cell--head">
                    {item.name}
                  </div>
                  <div className="table__cell">
                    {item.url ? (
                      <Link as={item.url}>{item.value}</Link>
                    ) : (
                      item.value
                    )}
                  </div>
                </div>
              );
            })}
      </div>
    );
  }
}

export default Table;
