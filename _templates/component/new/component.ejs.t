---
to: components/<%= name %>/<%= name %>.js
---
import React from 'react';
import PropTypes from 'prop-types';

import css from './<%= name %>.module.scss';

const <%= name %> = ({ className }) => {
  return <div className={[css.<%= h.changeCase.camel(name) %>, className || ''].join(' ')}></div>;
};

<%= name %>.propTypes = {
  className: PropTypes.string,
};

export default <%= name %>;
