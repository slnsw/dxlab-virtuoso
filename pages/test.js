import React from 'react';

const TestPage = ({ headers }) => {
  return (
    <div>
      <h1>{JSON.stringify(headers)}</h1>
    </div>
  );
};

TestPage.getInitialProps = (props) => {
  // console.log(props.req);
  return {
    headers: props.req.headers,
  };
};

export default TestPage;
