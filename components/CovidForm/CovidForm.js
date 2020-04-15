import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Select from '../Select/Select';

import css from './CovidForm.module.scss';

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
  const [showWarning, setShowWarning] = React.useState('');
  const [showSubmitError, setShowSubmitError] = React.useState(false);
  const [formState, setFormState] = React.useState(null);
  const [isOutsideAustralia, setIsOutsideAustralia] = React.useState(false);
  const [wordCount, setWordCount] = React.useState(0);

  const wordCountLimit = 300;

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

    // Let's do a little basic validation
    if (postcode.value && (postcode.value > 9999 || postcode.value < 200)) {
      setShowWarning(
        'Please ensure postcode is a number between 200 and 9999.',
      );
    } else if (
      email.value &&
      (email.value.indexOf('@') === -1 || email.value.indexOf('.') === -1)
    ) {
      setShowWarning('Please use a valid email address.');
    } else if (content.value && dateText.value) {
      console.log(parseInt(postcode.value, 10));
      props
        .createCovidExperimentPost({
          authorEmail: email.value,
          authorName: name.value,
          content: content.value,
          title: postName,
          dateText: dateText.value,
          city: city.value,
          state: (formState && formState.value) || '',
          postcode: postcode.value ? parseInt(postcode.value, 10) : null,
          outsideAustralia: outsideAustralia.checked,
        })
        .then(() => {
          setIsFormSubmitted(true);
        })
        .catch((err) => {
          console.log(err);
          setShowSubmitError(true);
        });
    } else {
      setShowWarning('Please ensure you have entered a story and a date.');
    }

    // reset form
    // e.target.elements.content.value = '';
  };

  return (
    <div className={css['covidForm']}>
      {!isFormSubmitted ? (
        <div>
          <p className={css['covidForm__intro']}>Tell us a story...</p>
          <form onSubmit={handleSubmit}>
            <div
              className={`${css['covidForm__section']} ${css['covidForm__date']}`}
            >
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

            <div className={css['covidForm__section']}>
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
              <span>*</span> Word count: {wordCount}
              {'/'}
              {wordCountLimit}{' '}
              {wordCount > wordCountLimit && <span>Wordcount exceeded!</span>}
            </div>

            <div
              className={`${css['covidForm__section']} ${css['covidForm__name']}`}
            >
              <label htmlFor="name">Name</label>
              <input
                name="name"
                aria-label="name"
                type="text"
                aria-required="false"
                placeholder="Your name (optional)"
              />
            </div>
            <div
              className={`${css['covidForm__section']} ${css['covidForm__email']}`}
            >
              <label htmlFor="email">Email</label>
              <input
                name="email"
                aria-label="email"
                type="text"
                aria-required="false"
                placeholder="Your email (optional)"
              />
            </div>
            <p className={css['covidForm__info']}>
              Your email address will not be published and is optional. It is,
              however, used ‘under the hood’ to denote entries as being by the
              same author. Required fields are marked <span>*</span>
            </p>
            <div
              className={`${
                isOutsideAustralia ? css['covidForm__location'] : ''
              }`}
            >
              <div
                className={`${css['covidForm__section']} ${css['covidForm__city']}`}
              >
                <label htmlFor="city">City</label>
                <input
                  name="city"
                  aria-label="city"
                  type="text"
                  aria-required="false"
                  placeholder="City, town or suburb (optional)"
                  disabled={isOutsideAustralia}
                />
              </div>

              <div
                className={`${css['covidForm__section']} ${css['covidForm__state']}`}
              >
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
                  isDisabled={isOutsideAustralia}
                />
              </div>

              <div
                className={`${css['covidForm__section']} ${css['covidForm__postcode']}`}
              >
                <label htmlFor="postcode">Postcode</label>
                <input
                  name="postcode"
                  aria-label="postcode"
                  type="text"
                  aria-required="false"
                  placeholder="Postcode"
                  disabled={isOutsideAustralia}
                />
              </div>
            </div>
            <div className={css['covidForm__section']}>
              <input
                name="outsideAustralia"
                aria-label="outsideAustralia"
                type="checkbox"
                onChange={(event) =>
                  setIsOutsideAustralia(event.target.checked)
                }
              />
              <label
                className={css['covidForm__outsideAustraliaLabel']}
                htmlFor="outsideAustralia"
              >
                I am outside Australia
              </label>
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

            {showWarning && <div className="warning">{showWarning}</div>}

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
    $postcode: Int
    $outsideAustralia: Boolean
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
