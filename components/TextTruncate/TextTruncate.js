import React from 'react';
import PropTypes from 'prop-types';

// import Button from '../Button';

import { isInViewport } from '../../lib/isInViewport';
// import { useUniqueId } from '../../lib/hooks';

import css from './TextTruncate.module.scss';

// type Props = {
//   limit?: number;
//   children?: string | React.ReactNode;
//   className?: string;
//   ellipsisChars?: string;
//   showButton?: boolean;
//   shouldStripHtml?: boolean;
//   // onChange?: Function;
// };

/**
 * Truncates text within props.children
 * Can accept multiple tags, strings or dangerouslySetInnerHTML
 * If using multiple tags, the first tag is used to display the truncated text.
 * Copied from CEP
 * TODO: Consider publishing as own component
 */
const TextTruncate = ({
  className,
  children,
  limit = 100,
  ellipsisChars = '…',
  showButton = true,
  shouldStripHtml = false,
  // onChange,
}) => {
  const [isActive, setActive] = React.useState(true);

  React.useEffect(() => {
    setActive(true);
  }, [children]);

  // const idScope = React.useRef(useUniqueId(`TextTruncate--`)).current;

  const textTopMarkerEl = React.useRef(null);

  if (children === undefined) {
    return null;
  }

  // Work in progress
  // if (typeof onChange === 'function') {
  //   if (children.length > limit) {
  //     onChange('more');
  //   } else {
  //     onChange('less');
  //   }
  // }

  // Assign firstChildrenType
  let firstChildrenType;

  // Determine which initial element to use when truncate is active
  if (typeof children === 'string') {
    firstChildrenType = 'string';
  } else if (Array.isArray(children)) {
    if (
      children[0].props.dangerouslySetInnerHTML &&
      /* eslint-disable no-underscore-dangle */
      children[0].props.dangerouslySetInnerHTML.__html
    ) {
      firstChildrenType = 'html';
    } else {
      firstChildrenType = 'tags';
    }
  } else if (React.Children.only(children)) {
    if (
      children.props.dangerouslySetInnerHTML &&
      /* eslint-disable no-underscore-dangle */
      children.props.dangerouslySetInnerHTML.__html
      /* eslint-enable no-underscore-dangle */
    ) {
      firstChildrenType = 'html';
    } else {
      firstChildrenType = 'tag';
    }
  }

  // Extract text
  const text = React.Children.map(children, (child) => {
    let childText;

    if (typeof child === 'string') {
      childText = child;
    } else if (
      child.props.dangerouslySetInnerHTML &&
      /* eslint-disable no-underscore-dangle */
      child.props.dangerouslySetInnerHTML.__html
    ) {
      childText = child.props.dangerouslySetInnerHTML.__html;
      /* eslint-enable no-underscore-dangle */
    } else {
      childText = child.props.children;
    }

    return childText;
  }).join(' ');

  const isTextOverLimit = text.length > limit;

  let result;

  if (isTextOverLimit && isActive) {
    const strippedText = shouldStripHtml ? stripHtml(text) : text;
    const truncatedText = `${strippedText
      .slice(0, limit)
      .trimRight()}${ellipsisChars}`;

    // Assign processed text depending on firstChildrenType
    if (firstChildrenType === 'string') {
      result = truncatedText;
    } else if (firstChildrenType === 'html') {
      const newHtmlChild = children.length > 0 ? children[0] : children;
      result = React.cloneElement(
        newHtmlChild,
        shouldStripHtml
          ? {
              // dangerouslySetInnerHTML: {
              //   __html: truncatedText,
              // },
              children: truncatedText,
              dangerouslySetInnerHTML: undefined,
            }
          : {
              dangerouslySetInnerHTML: {
                __html: truncatedText,
              },
            },
      );
    } else if (firstChildrenType === 'tags') {
      result = React.cloneElement(children[0], {
        children: truncatedText,
      });
    } else if (firstChildrenType === 'tag') {
      result = React.cloneElement(children, {
        children: truncatedText,
      });
    }
  } else {
    result = children;
  }

  return (
    <>
      <span
        // id={idScope}
        ref={textTopMarkerEl}
      />

      {result}

      {showButton && isTextOverLimit ? (
        <button
          className={[css.button, className].join(' ')}
          size="sm"
          data-testid="showMoreButton"
          aria-expanded={!isActive}
          // aria-controls={idScope}
          onClick={() => {
            // Scroll back up to top of text if truncate is active and marker element is out of viewport
            if (!isActive && !isInViewport(textTopMarkerEl.current)) {
              textTopMarkerEl.current.scrollIntoView();
            }
            setActive(!isActive);
          }}
        >
          {isActive ? 'Read more' : 'Read less'}
        </button>
      ) : null}
    </>
  );
};

function stripHtml(text) {
  return text.replace(/(<([^>]+)>)/gi, '');
}

TextTruncate.propTypes = {
  className: PropTypes.string,
};

export default TextTruncate;
