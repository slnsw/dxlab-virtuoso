import { React } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function yyyymmdd() {
  const date = new Date();
  const mm = `${date.getMonth() + 1 > 9 ? '' : '0'}${date.getMonth() + 1}`; // getMonth() is zero-based
  const dd = `${date.getDate() > 9 ? '' : '0'}${date.getDate()}`;
  const hh = `${date.getHours() > 9 ? '' : '0'}${date.getHours()}`;
  const mins = `${date.getMinutes() > 9 ? '' : '0'}${date.getMinutes()}`;
  const ss = `${date.getSeconds() > 9 ? '' : '0'}${date.getSeconds()}`;

  return `${date.getFullYear()}-${mm}-${dd}-${hh}-${mins}-${ss}`;
}

const CovidForm = ({ props }) => {
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const [showWarning, setShowWarning] = React.useState(false);
  const [showSubmitError, setShowSubmitError] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, name, content, date } = e.target.elements;

    const postName = yyyymmdd();

    // Check all fields are not empty
    if (email.value && name.value && content.value && date.value) {
      //   const parentId = 0;

      props
        .createCovidExperimentPost({
          authorEmail: email.value,
          authorName: name.value,
          content: content.value,
          dateText: content.date,
          title: postName,
          //   postId: this.props.postId,
          //   parentId,
        })
        .then(() => {
          setIsFormSubmitted(true);
        })
        .catch(() => {
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

          <form onSubmit={handleSubmit()}>
            <div className="comment-form__section">
              <label htmlFor="date">
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
              <label htmlFor="name">
                Name<span>*</span>
              </label>
              <input
                name="name"
                aria-label="name"
                type="text"
                aria-required="true"
                placeholder="Your name"
              />
            </div>

            <div className="comment-form__section">
              <label htmlFor="email">
                Email<span>*</span>
              </label>
              <input
                name="email"
                aria-label="email"
                type="email"
                aria-required="true"
                placeholder="Your email"
              />
            </div>

            <div className="comment-form__section">
              <label htmlFor="content">
                Comment<span>*</span>
              </label>
              <textarea
                placeholder="Write a comment"
                name="content"
                aria-label="content"
                aria-required="true"
                rows="6"
              />
            </div>

            {/* TODO: Try input type submit */}
            <button
              className="button"
              type="submit"
              aria-label="Comment Submit Button."
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
  mutation createComment(
    $authorEmail: String
    $authorName: String!
    $content: String!
    $title: String!
    $dateText: String!
  ) {
    createComment(
      authorEmail: $authorEmail
      authorName: $authorName
      content: $content
      title: $postTitle
      dateText: $dateText
    ) {
      id
      content
      authorName
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
