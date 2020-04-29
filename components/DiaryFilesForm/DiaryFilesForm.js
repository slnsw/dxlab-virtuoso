import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Select from '../Select/Select';

import css from './DiaryFilesForm.module.scss';
import CTAButton from '../CTAButton';

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
  { value: 'WA', label: 'Western Australia' },
];

const DiaryFilesForm = (props) => {
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const [showWarning, setShowWarning] = React.useState('');
  const [showSubmitError, setShowSubmitError] = React.useState(false);
  const [formState, setFormState] = React.useState(null);
  const [isOutsideAustralia, setIsOutsideAustralia] = React.useState(false);
  const [wordCount, setWordCount] = React.useState(0);
  const [newId, setNewId] = React.useState(null);

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
      age,
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
      const args = {
        authorEmail: email.value,
        authorName: name.value,
        content: content.value,
        title: postName,
        dateText: dateText.value,
        city: city.value,
        state: (formState && formState.value) || '',
        outsideAustralia: outsideAustralia.checked,
        age: age.value,
      };
      // only add postcode if we have one, otherwise things break.
      if (postcode.value !== '') {
        args['postcode'] = parseInt(postcode.value, 10);
      }
      props
        .createDiaryFilesPost(args)
        .then((result) => {
          const newIdValue =
            result &&
            result.data &&
            result.data.createDiaryFilesPost &&
            result.data.createDiaryFilesPost.id;
          console.log(newIdValue);
          setNewId(newIdValue);
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
    <>
      {/* <audio id="audio" controls style={{ display: 'none' }}>
        <source src="/audio/typewriter-clack.mp3" type="audio/mpeg" />
      </audio> */}
      <div className={css['diaryFilesForm']}>
        {!isFormSubmitted ? (
          <div>
            <h1>Write your diary entry</h1>
            <form onSubmit={handleSubmit} className={css.form}>
              <div
                className={`${css['diaryFilesForm__section']} ${css['diaryFilesForm__date']}`}
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

              <div className={css['diaryFilesForm__section']}>
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
                <p>
                  <span>*</span> Word count: {wordCount}
                  {'/'}
                  {wordCountLimit}{' '}
                  {wordCount > wordCountLimit && (
                    <span>Wordcount exceeded!</span>
                  )}
                </p>
              </div>

              <h2>Optional Fields</h2>

              <p className={css['diaryFilesForm__info']}>
                Please note all the fields below are <strong>optional</strong>.
                If you fill in these fields we will publish them with your
                entry, except for your email address, which we will only use to
                contact you in relation to <strong>The Diary Files</strong>.
                {/* Your email address will not be published and is optional. It is,
              however, used ‘under the hood’ to denote entries as being by the
              same author. Required fields are marked <span>*</span> */}
              </p>
              <p> Thank you for your contribution.</p>

              <div
                className={`${css['diaryFilesForm__section']} ${css['diaryFilesForm__name']}`}
              >
                <label htmlFor="name">Name</label>
                <input
                  name="name"
                  aria-label="name"
                  type="text"
                  aria-required="false"
                  placeholder="Your name"
                />
              </div>
              <div
                className={`${css['diaryFilesForm__section']} ${css['diaryFilesForm__email']}`}
              >
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  aria-label="email"
                  type="text"
                  aria-required="false"
                  placeholder="Your email"
                />
              </div>
              <div
                className={`${css['diaryFilesForm__section']} ${css['diaryFilesForm__age']}`}
              >
                <label htmlFor="age">Age</label>
                <input
                  name="age"
                  aria-label="age"
                  type="text"
                  aria-required="false"
                  placeholder="Age"
                />
              </div>
              <div
                className={`${
                  isOutsideAustralia ? css['diaryFilesForm__location'] : ''
                }`}
              >
                <div
                  className={`${css['diaryFilesForm__section']} ${css['diaryFilesForm__city']}`}
                >
                  <label htmlFor="city">City</label>
                  <input
                    name="city"
                    aria-label="city"
                    type="text"
                    aria-required="false"
                    placeholder="City, town or suburb"
                    disabled={isOutsideAustralia}
                  />
                </div>

                <div
                  className={`${css['diaryFilesForm__section']} ${css['diaryFilesForm__state']}`}
                >
                  <label htmlFor="state">State</label>
                  <Select
                    variant="dark"
                    name="state"
                    options={stateOptions}
                    onChange={(option) => setFormState(option)}
                    isDisabled={isOutsideAustralia}
                  />
                </div>

                <div
                  className={`${css['diaryFilesForm__section']} ${css['diaryFilesForm__postcode']}`}
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
              <div
                className={`${css['diaryFilesForm__section']} ${css['diaryFilesForm__outsideAustralia']}`}
              >
                <input
                  name="outsideAustralia"
                  aria-label="outsideAustralia"
                  type="checkbox"
                  onChange={(event) =>
                    setIsOutsideAustralia(event.target.checked)
                  }
                />
                <label
                  className={css['diaryFilesForm__outsideAustraliaLabel']}
                  htmlFor="outsideAustralia"
                >
                  I am outside Australia
                </label>
              </div>

              {/* TODO: Try input type submit */}
              <div className={css['diaryFilesForm__submitWrapper']}>
                <button
                  className="button"
                  type="submit"
                  aria-label="Submit Button."
                  disabled={wordCount > wordCountLimit}
                >
                  Submit
                </button>
              </div>

              <p className={css['diaryFilesForm__termsAndConditions']}>
                By submitting your diary entry in this platform you are allowing
                the State Library of NSW to collect, store and publish your text
                as part of this online experience, for exhibition and
                promotional purposes.
              </p>
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
            <p>
              Thank you for your diary entry, we will approve this as soon as we
              can. Please{' '}
              <a href={`/diary-files/entry/${newId}`}>
                check back later to see your entry published
              </a>{' '}
              and you can share it with your friends and family.
            </p>
            <CTAButton href="/diary-files" className={css.continueButton}>
              Continue
            </CTAButton>
            {/* <CTAButtonV2
              onClick={() => {
                if (typeof props.onClose === 'function') {
                  // setShowWarning(false);
                  // setShowSubmitError(false);
                  // setIsFormSubmitted(false);
                  props.onClose();
                }
              }}
            >
              continue
            </CTAButtonV2> */}
          </div>
        )}
      </div>
    </>
  );
};

const query = gql`
  mutation createDiaryFilesPost(
    $authorEmail: String
    $authorName: String
    $content: String!
    $title: String!
    $dateText: String!
    $city: String
    $state: String
    $postcode: Int
    $outsideAustralia: Boolean
    $age: String
  ) {
    createDiaryFilesPost(
      authorEmail: $authorEmail
      authorName: $authorName
      content: $content
      title: $title
      dateText: $dateText
      city: $city
      state: $state
      postcode: $postcode
      outsideAustralia: $outsideAustralia
      age: $age
    ) {
      id
      # content
      # authorName
    }
  }
`;

export default graphql(query, {
  props: ({ mutate }) => ({
    createDiaryFilesPost: (args) =>
      mutate({
        variables: args,
      }),
  }),
})(DiaryFilesForm);
