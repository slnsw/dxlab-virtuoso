import * as React from 'react';

const DiaryFilesContext = React.createContext([]);

const defaultState = {
  hasVisitedHomePage: false,
  // homePosts: [],
};

const types = {
  HAS_VISITED_HOME_PAGE: 'HAS_VISITED_HOME_PAGE',
  // ADD_POSTS: 'ADD_POSTS',
};

function reducer(state, action) {
  switch (action.type) {
    case types.HAS_VISITED_HOME_PAGE: {
      return {
        ...state,
        hasVisitedHomePage: action.payload,
      };
    }

    // case types.ADD_POSTS: {
    //   return {
    //     ...state,
    //     homePosts: [...state.homePosts, ...action.payload],
    //   };
    // }

    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

function useDiaryFiles() {
  const context = React.useContext(DiaryFilesContext);

  if (!context) {
    throw new Error('useDiaryFiles must be used within DiaryFilesProvider');
  }

  const [state, dispatch] = context;

  return {
    state,
    dispatch,
  };
}

function DiaryFilesProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, defaultState);
  const value = React.useMemo(() => [state, dispatch], [state]);

  return <DiaryFilesContext.Provider value={value} {...props} />;
}

export { types, useDiaryFiles, DiaryFilesProvider };
