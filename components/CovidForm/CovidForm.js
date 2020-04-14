import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Select from '../Select/Select';

// import './CovidForm.scss';

function yyyymmdd() {
  const date = new Date();
  const mm = `${date.getMonth() + 1 > 9 ? '' : '0'}${date.getMonth() + 1}`; // getMonth() is zero-based
  const dd = `${date.getDate() > 9 ? '' : '0'}${date.getDate()}`;
  const hh = `${date.getHours() > 9 ? '' : '0'}${date.getHours()}`;
  const mins = `${date.getMinutes() > 9 ? '' : '0'}${date.getMinutes()}`;
  const ss = `${date.getSeconds() > 9 ? '' : '0'}${date.getSeconds()}`;

  return `${date.getFullYear()}-${mm}-${dd}-${hh}-${mins}-${ss}`;
}

const stateOptions = [
  { value: 'NSW', label: 'New South Wales' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'NT', label: 'Northern Territory' },
  { value: 'ACT', label: 'Australian Capital Territory' },
  { value: 'SA', label: 'South Australia' },
  { value: 'WA', label: 'Western Australai' },
];

const CovidForm = (props) => {
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const [showWarning, setShowWarning] = React.useState(false);
  const [showSubmitError, setShowSubmitError] = React.useState(false);
  const [formState, setFormState] = React.useState(null);

  const [wordCount, setWordCount] = React.useState(0);

  const wordCountLimit = 30;

  const updateWordCount = (event) => {
    const arr = event.target.value.split(/\S+/g) || [];
    const wc = arr.length - 1;
    setWordCount(wc);
  };

  const monitorTyping = (keypress) => {
    const validKeys = [8, 46, 37, 38, 39, 40]; // backspace and delete and cursor keys
    if (
      wordCount > wordCountLimit &&
      validKeys.indexOf(keypress.keyCode) === -1
    ) {
      keypress.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      email,
      name,
      content,
      dateText,
      city,
      postcode,
      outsideAustralia,
    } = e.target.elements;
    const postName = yyyymmdd();

    // Check some fields are not empty
    if (content.value && dateText.value) {
      props
        .createCovidExperimentPost({
          authorEmail: email.value,
          authorName: name.value,
          content: content.value,
          title: postName,
          dateText: dateText.value,
          city: city.value,
          state: formState.value,
          postcode: postcode.value,
          outsideAustralia: outsideAustralia.checked ? '1' : '',
        })
        .then(() => {
          setIsFormSubmitted(true);
        })
        .catch((err) => {
          console.log(err);
          setShowSubmitError(true);
        });
    } else {
      setShowWarning(true);
    }

    // reset form
    // e.target.elements.content.value = '';
  };

  return (
    <div className="comment-form">
      {!isFormSubmitted ? (
        <div>
          <p className="comment-form__intro">
            Your email address will not be published. Required fields are marked{' '}
            <span>*</span>.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="comment-form__section">
              <label htmlFor="name">Name</label>
              <input
                name="name"
                aria-label="name"
                type="text"
                aria-required="false"
                placeholder="Your name (optional)"
              />
            </div>

            <div className="comment-form__section">
              <label htmlFor="dateText">
                Date<span>*</span>
              </label>
              <input
                name="dateText"
                aria-label="dateText"
                type="text"
                aria-required="true"
                placeholder="Date"
              />
            </div>

            <div className="comment-form__section">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                aria-label="email"
                type="email"
                aria-required="false"
                placeholder="Your email (optional)"
              />
            </div>

            <div className="comment-form__section">
              <label htmlFor="city">City</label>
              <input
                name="city"
                aria-label="city"
                type="text"
                aria-required="false"
                placeholder="City, town or suburb (optional)"
              />
            </div>

            <div className="comment-form__section">
              <label htmlFor="state">State</label>
              {/* <input
                name="state"
                aria-label="state"
                type="text"
                aria-required="false"
                placeholder="State (optional)"
              /> */}

              <Select
                variant="dark"
                name="state"
                options={stateOptions}
                onChange={(option) => setFormState(option)}
              />
            </div>

            <div className="comment-form__section">
              <label htmlFor="postcode">Postcode</label>
              <input
                name="postcode"
                aria-label="postcode"
                type="text"
                aria-required="false"
                placeholder="Your postcode (optional)"
              />
            </div>

            <div className="comment-form__section">
              <input
                name="outsideAustralia"
                aria-label="outsideAustralia"
                type="checkbox"
              />
              <label
                style={{ display: 'inline', marginLeft: '6px' }}
                htmlFor="outsideAustralia"
              >
                I am outside Australia
              </label>
            </div>

            <div className="comment-form__section">
              <label htmlFor="content">
                Comment<span>*</span>
              </label>
              <textarea
                id="story"
                placeholder="Write in here..."
                name="content"
                aria-label="content"
                aria-required="true"
                rows="20"
                onChange={updateWordCount}
                onKeyDown={monitorTyping}
              />
            </div>
            <div>
              {wordCount}
              {'/'}
              {wordCountLimit}{' '}
              {wordCount > wordCountLimit && <span>Wordcount exceeded!</span>}
            </div>

            {/* TODO: Try input type submit */}
            <button
              className="button"
              type="submit"
              aria-label="Submit Button."
              disabled={wordCount > wordCountLimit}
            >
              Submit
            </button>

            {showWarning && (
              <div className="warning">Please fill in all fields.</div>
            )}

            {showSubmitError && (
              <div className="warning">
                There seems to be a problem, please refresh the page and try
                again.
              </div>
            )}
          </form>
        </div>
      ) : (
        <div>
          <p>Thanks for your submission. Your entry is awaiting approval.</p>
        </div>
      )}
    </div>
  );
};

const query = gql`
  mutation createCovidExperimentPost(
    $authorEmail: String
    $authorName: String
    $content: String!
    $title: String!
    $dateText: String!
    $city: String
    $state: String
    $postcode: String
    $outsideAustralia: String!
  ) {
    createCovidExperimentPost(
      authorEmail: $authorEmail
      authorName: $authorName
      content: $content
      title: $title
      dateText: $dateText
      city: $city
      state: $state
      postcode: $postcode
      outsideAustralia: $outsideAustralia
    ) {
      id
      # content
      # authorName
    }
  }
`;

export default graphql(query, {
  props: ({ mutate }) => ({
    createCovidExperimentPost: (args) =>
      mutate({
        variables: args,
      }),
  }),
})(CovidForm);
