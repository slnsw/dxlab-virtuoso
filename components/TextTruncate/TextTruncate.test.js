import * as React from 'react';
import {
  render,
  cleanup,
  // queryByAttribute,
  fireEvent,
} from '@testing-library/react';
// import fireEvent from '@testing-library/user-event';

import TextTruncate from './TextTruncate';

afterEach(cleanup);

const reallyLongText =
  'Lorem ipsum dolor amet kombucha hashtag chambray dreamcatcher schlitz asymmetrical hell of actually paleo sriracha. Fanny pack pinterest synth lyft roof party mixtape freegan cray venmo taxidermy vegan paleo cliche.<br/><br/>Crucifix fashion axe banh mi PBR&B, cray post-ironic bespoke pork belly disrupt. Salvia marfa gastropub viral microdosing subway tile raclette four dollar toast humblebrag pop-up.';

describe('TextTruncate', () => {
  // Show less button uses 'scrollIntoView' to return to original scroll position
  // window.HTMLElement.prototype.scrollIntoView = () => {};

  it('renders TextTruncate component with string', () => {
    render(<TextTruncate>Testing 123</TextTruncate>);
  });

  it('should truncate text within tag and toggle', () => {
    const { getByText } = render(
      <TextTruncate limit={10}>
        <p>{reallyLongText}</p>
      </TextTruncate>,
    );

    const moreButton = getByText('Read more');
    const trimmedText = `${reallyLongText.substring(0, 10)}…`;

    expect(getByText(trimmedText).innerHTML).toHaveLength(11);
    fireEvent.click(moreButton);
    expect(getByText(reallyLongText).innerHTML).toHaveLength(420);

    const lessButton = getByText('Read less');
    fireEvent.click(lessButton);
    expect(getByText(trimmedText).innerHTML).toHaveLength(11);
  });

  it('should truncate text within multiple tags', () => {
    const { getByText } = render(
      <TextTruncate limit={10}>
        <p>First paragraph</p>
        <p>Second paragraph</p>
      </TextTruncate>,
    );

    const moreButton = getByText('Read more');

    expect(getByText('First para…').innerHTML).toBeDefined();
    fireEvent.click(moreButton);
    expect(getByText('First paragraph')).toBeDefined();
    expect(getByText('Second paragraph')).toBeDefined();
  });

  // it('runs callback with truncate status', () => {
  //   render(
  //     <TextTruncate
  //       onChange={(isTruncated) => {
  //         setIsOpen(isTruncated);
  //       }}
  //     >
  //       {isOpen ? convertLineBreaks(reallyLongText) : reallyLongText}
  //     </TextTruncate>,
  //   );
  // });

  it('should truncate text within dangerouslySetInnerHTML', () => {
    const { getByText } = render(
      <TextTruncate limit={10}>
        <p dangerouslySetInnerHTML={{ __html: reallyLongText }} />
      </TextTruncate>,
    );

    const trimmedText = `${reallyLongText.substring(0, 10)}…`;
    expect(getByText(trimmedText).innerHTML).toHaveLength(11);
  });

  it('should truncate multiple tags with text in dangerouslySetInnerHTML', () => {
    const { getByText } = render(
      <TextTruncate limit={10}>
        <p dangerouslySetInnerHTML={{ __html: reallyLongText }} />
        <p dangerouslySetInnerHTML={{ __html: reallyLongText }} />
      </TextTruncate>,
    );

    const trimmedText = `${reallyLongText.substring(0, 10)}…`;
    expect(getByText(trimmedText).innerHTML).toHaveLength(11);
  });

  it('should strip HTML, truncate text in dangerouslySetInnerHTML, then toggle show all', () => {
    const { getByText } = render(
      <TextTruncate limit={10} shouldStripHtml={true}>
        <p dangerouslySetInnerHTML={{ __html: 'I have a<br/> line break' }} />
      </TextTruncate>,
    );

    const trimmedText = 'I have a l…';
    expect(getByText(trimmedText).innerHTML).toHaveLength(11);

    const moreButton = getByText('Read more');
    fireEvent.click(moreButton);
    expect(getByText(/I have/i).innerHTML).toEqual('I have a<br> line break');
  });

  it('should not strip HTML, then truncate text in dangerouslySetInnerHTML', () => {
    const { getByText } = render(
      <TextTruncate limit={10} shouldStripHtml={false}>
        <p dangerouslySetInnerHTML={{ __html: 'I have a<br/> line break' }} />
      </TextTruncate>,
    );

    expect(getByText(/I have/i).innerHTML).toEqual('I have a<br> l…');
  });

  it('sets an ID wrapping string elements', () => {
    const {
      // container,
      getByText,
    } = render(<TextTruncate limit={4}>Testing 123</TextTruncate>);

    expect(getByText('Test…')).toBeDefined();

    // const getById = queryByAttribute.bind(null, 'id');
    const moreButton = getByText('Read more');
    expect(moreButton).toBeDefined();
    // expect(
    //   getById(
    //     container,
    //     moreButton.getAttribute('aria-controls'),
    //   ),
    // ).toBeDefined();

    fireEvent.click(moreButton);
    expect(getByText('Testing 123')).toBeDefined();
  });

  it('uses existing ID where available', () => {
    const {
      // container,
      getByText,
    } = render(
      <TextTruncate limit={4}>
        <p id="foo">Testing 123</p>
      </TextTruncate>,
    );

    expect(getByText('Test…')).toBeDefined();

    // const getById = queryByAttribute.bind(null, 'id');
    const moreButton = getByText('Read more');
    expect(moreButton).toBeDefined();

    // const id = moreButton.getAttribute('aria-controls');
    // expect(id).toContain('TextTruncate--');
    // expect(getById(container)).toBeDefined();

    fireEvent.click(moreButton);
    expect(getByText('Testing 123')).toBeDefined();
  });

  it('handles ID properly for multiple children', () => {
    const {
      // container,
      getByText,
    } = render(
      <TextTruncate limit={4}>
        <p id="foo">Testing 123</p>
        <p id="bar">Testing 456</p>
      </TextTruncate>,
    );
    expect(getByText('Test…')).toBeDefined();
    // const getById = queryByAttribute.bind(null, 'id');
    const moreButton = getByText('Read more');
    expect(moreButton).toBeDefined();

    // const id = moreButton.getAttribute('aria-controls');
    // expect(id).toContain('TextTruncate--');
    // expect(getById(container, id)).toBeDefined();

    fireEvent.click(moreButton);
    expect(getByText('Testing 123')).toBeDefined();
    expect(getByText('Testing 456')).toBeDefined();
  });

  const tagBreakTest =
    '<div><p>Lyrics</p><p>There was no apology<br />Where is the humanity<br />It would have been better if it never happened ever</p></div>';

  // Before we added the 'truncateNicely' function the string above (such as we get out of WP) being
  // truncated to 44 chars would chop the first <br /> tag in half, rendering the resulting HTML
  // faulty. Not only is the BR tag broken, but the <p> and <div> are left unclosed.
  it('should truncate text in dangerouslySetInnerHTML without chopping a tag in half', () => {
    const { getByText } = render(
      <TextTruncate limit={44} shouldStripHtml={false}>
        <p dangerouslySetInnerHTML={{ __html: tagBreakTest }} />
      </TextTruncate>,
    );
    console.log(getByText);
    expect(getByText(/Where is the human/).innerHTML).toEqual(
      'There was no apology<br>Where is the human…',
    );
  });
});
