import { Component } from 'react';
// import PropTypes from 'prop-types';

// import './SectionTitle.css';

class SectionTitle extends Component {
  render() {
    const { children } = this.props;

    return <h2 className="section-title">{children}</h2>;
  }
}

export default SectionTitle;
