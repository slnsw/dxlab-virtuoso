import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

const useDiaryFilesPostsQuery = ({
  search = '',
  offset = 0,
  limit = 20,
  skip = false,
}) => {
  const {
    loading,
    error,
    data = { diaryFiles: { posts: [], postTotal: null } },
    fetchMore,
  } = useQuery(postsQuery, {
    variables: {
      search,
      offset: 0,
      limit,
      skip,
    },
    fetchPolicy: 'cache-and-network',
  });

  const { diaryFiles } = data;
  const { posts, postTotal } = diaryFiles;
  const hasMorePosts = posts && posts.length < postTotal;

  React.useEffect(() => {
    if (offset > 0) {
      fetchMore({
        variables: {
          search,
          offset,
          limit,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }

          // Merge new posts with existing posts
          return {
            diaryFiles: {
              ...fetchMoreResult.diaryFiles,
              posts: [
                ...prev.diaryFiles.posts,
                ...fetchMoreResult.diaryFiles.posts,
              ],
            },
          };
        },
      });
    }
  }, [offset, limit, search, fetchMore]);

  let status;

  if (error) {
    status = 'error';
  } else if (loading) {
    status = 'loading';
  } else if (!search) {
    status = 'initial';
  } else {
    status = 'loaded';
  }

  return {
    status,
    posts: posts || [],
    postTotal,
    hasMorePosts,
    error,
  };
};

const postsQuery = gql`
  query getPosts($search: String, $offset: Int, $limit: Int, $skip: Boolean!) {
    diaryFiles {
      posts(search: $search, offset: $offset, limit: $limit) @skip(if: $skip) {
        id
        title
        content
        dateText
        authorName
        city
        state
        postcode
        outsideAustralia
        age
        relatedPosts {
          id
          title
        }
      }
      postTotal(search: $search)
    }
  }
`;

export default useDiaryFilesPostsQuery;
