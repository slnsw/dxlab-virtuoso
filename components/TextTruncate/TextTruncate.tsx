import React from 'react';
import PropTypes from 'prop-types';

// import Button from '../Button';

import { isInViewport } from '../../lib/is-in-viewport';
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
 * TODO: Add tests from CEP
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

  // Don't really want to count the HTML tags in the length
  const isTextOverLimit = stripHtml(text).length > limit;

  let result;

  if (isTextOverLimit && isActive) {
    const strippedText = shouldStripHtml ? stripHtml(text) : text;
    // const truncatedText = `${strippedText
    //   .slice(0, limit)
    //   .trimRight()}${ellipsisChars}`;
    const truncatedText = truncateNicely(strippedText, limit, ellipsisChars);
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

function truncateNicely(text, limit, endChar) {
  // console.log(text);
  // Writen by LukeD Apr/May 2020
  // NOTE: uses generateClosingTag() function below.
  // Function is passed a text string to be truncated to 'limit' chars long
  // But it may contain nested HTML <tags> which we don't want to truncate in
  // the middle of leaving this: <tag... (we also don't really want to count
  // them as they don't generally contribute to the length of text rendered.)
  // Also we want to ensure the correct closing tags exit after the truncation
  // so the returned text is valid HTML.

  const splitByTags = text.split(/(<[^>]+>)/gi);
  // The above returns an array something like:
  // [ 'text', 'tag', 'text', 'tag', 'text', 'tag', 'text', 'tag', 'text' ]

  const stack = []; // place to remember opened tags that might need to closed after truncation
  const tagList = [];
  const textList = [];

  // Split it into two arrays, one of tags, one of texts.
  // But keep positions intact, so we get:
  // [ null, 'tag', null, 'tag', null, 'tag', null, 'tag', null ]
  // [ 'text', null, 'text', null, 'text', null, 'text', null, 'text' ]

  for (let i = 0; i < splitByTags.length; i++) {
    if (splitByTags[i].slice(0, 1) === '<') {
      tagList[i] = splitByTags[i];
    } else {
      textList[i] = splitByTags[i];
    }
  }

  // Now start reassembling, counting length of text parts only
  let lengthSoFar = 0;
  let out = '';
  let overLimit = false;
  for (let i = 0; i < splitByTags.length; i++) {
    if (!overLimit) {
      // We are still under the character limit.
      // First deal with next bit of text
      if (textList[i] && textList[i] !== '\n') {
        const textBitLength = textList[i].length;
        if (lengthSoFar + textBitLength > limit) {
          // OK so adding the current bit of text will take us over the limit.
          // Work out by how much:
          let truncBitLength = limit - lengthSoFar;
          // First, check here that we aren't about to chop an HTML entity in half.
          const indexOfAmpersand = textList[i].indexOf('&');
          const indexOfSemicolon = textList[i].indexOf(';');
          if (
            indexOfAmpersand > -1 &&
            indexOfSemicolon > -1 &&
            indexOfAmpersand < truncBitLength &&
            truncBitLength < indexOfSemicolon
          ) {
            truncBitLength = indexOfSemicolon;
          }
          // and now chop the bit of text safely, add it to the output
          // and signal we have reached the limit
          const truncText = textList[i].slice(0, truncBitLength);
          out += `${truncText}${endChar}`;
          lengthSoFar += truncBitLength;
          overLimit = true;
        } else {
          // otherwise, we aren't going over the limit by adding this
          // bit so add it and update the cumulative length:
          out += textList[i];
          lengthSoFar += textBitLength;
        }
      }
      // Next add back in the next tag
      if (tagList[i]) {
        out += tagList[i];
        // push them onto the stack, unless they self-closing
        if (splitByTags[i].slice(-2) !== '/>') {
          // or are the closing tag for the top of the stack
          if (
            stack.length > 0 &&
            generateClosingTag(stack[stack.length - 1]) === splitByTags[i]
          ) {
            stack.pop();
            // its not the closing tag for the top of the stack, so
            // if its not a 'rogue' closing tag, it will be an opening
            // tag, so add it to the stack.
          } else if (splitByTags[i].slice(0, 2) !== '</') {
            stack.push(splitByTags[i]);
          }
        }
      }
    }
  }
  // now add closing tags for any tags left in the stack
  while (overLimit && stack.length > 0) {
    const closing = generateClosingTag(stack.pop());
    if (closing) {
      out += closing;
    }
  }
  return out;
}

function generateClosingTag(tag) {
  // Writen by LukeD Apr/May 2020
  // This function generates the closing
  // tag that corresponds to any opening tag.
  // EG </p> for a <p>, </div> for <div class="somthing">
  // or </ul> for <ul style="color: black" class="someclass">
  if (!tag) {
    // nothing to do...
    return null;
  }
  if (tag.slice(0, 2) === '</') {
    // it is already a closing tag!
    return tag;
  }
  if (tag.slice(-2) === '/>') {
    // its is a self-closing tag!
    return tag;
  }
  // match from after the < up until the first whitespace or the >
  const inners = tag.match(/<([^\s>]+).*/i);
  if (inners[1]) {
    return `</${inners[1]}>`;
  }
}

TextTruncate.propTypes = {
  className: PropTypes.string,
};

export default TextTruncate;
