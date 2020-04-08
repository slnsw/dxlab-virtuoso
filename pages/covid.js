import React from 'react';

import WPAPI from 'wpapi';

function yyyymmdd() {
  const date = new Date();
  const mm = `${date.getMonth() + 1 > 9 ? '' : '0'}${date.getMonth() + 1}`; // getMonth() is zero-based
  const dd = `${date.getDate() > 9 ? '' : '0'}${date.getDate()}`;
  const hh = `${date.getHours() > 9 ? '' : '0'}${date.getHours()}`;
  const mins = `${date.getMinutes() > 9 ? '' : '0'}${date.getMinutes()}`;
  const ss = `${date.getSeconds() > 9 ? '' : '0'}${date.getSeconds()}`;

  return `${date.getFullYear()}-${mm}-${dd}-${hh}-${mins}-${ss}`;
}

const postName = yyyymmdd();
console.log(postName);
console.log(process.env.WP_API_ENDPOINT);

const wp = new WPAPI({
  endpoint: process.env.WP_API_ENDPOINT,
  username: process.env.WP_USERNAME,
  password: process.env.WP_PASSWORD,
});

// wp.storyPost = wp.registerRoute(
//     'acf/v3',
//     '/posts/(?P<id>\\d+)',
// );

// const postType = wp.instagramSelfies();
async function test() {
  try {
    // wp.posts().then(function( data ) {
    //     // do something with the returned posts
    // }).catch(function( err ) {
    //     // handle error
    // });

    const createObj = {
        title: postName,
        slug: postName,
        content: 'Not quite 300 words but I am only testing.',
        status: 'publish',
        meta: {
        name: 'test name',
        email: 'test@email.com',
        date_text: 'test date text',
        },
    };
    console.log(createObj);
    const newPost = await wp.posts().create(createObj);
    console.log(newPost);
  } catch (e) {
    console.log(e);
  }
}

const CovidPage = () => {
//   test();
  return (
    <div>
      <h1 onClick={()=>{test()}}>Covid</h1>
    </div>
  );
};

export default CovidPage;
