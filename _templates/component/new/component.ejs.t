---
to: components/<%= name %>/<%= name %>.tsx
---
import React from 'react';

import css from './<%= name %>.module.scss';

type Props = {
  className?: string;
}

const <%= name %>: React.FC<Props> = ({ className }) => {
  return <div className={[css.<%= h.changeCase.camel(name) %>, className || ''].join(' ')}></div>;
};

export default <%= name %>;
