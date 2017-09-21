import 'isomorphic-fetch';

const INITIAL_STATE = {
};

const LOAD_PAGE_ERROR = 'viewingPage/LOAD_PAGE_ERROR';
const LOAD_PAGE_SUCCESS = 'viewingPage/LOAD_PAGE_SUCCESS';
const LOAD_PAGE_INIT = 'viewingPage/LOAD_PAGE_INIT';

function loadPageError(errorMessage) {
  return {
    type: LOAD_PAGE_ERROR,
    errorMessage,
  };
}

function loadPageInit(videoId) {
  return {
    type: LOAD_PAGE_INIT,
    videoId,
  };
}

function loadPageSuccess(videoId, additionalVideos) {
  return {
    type: LOAD_PAGE_SUCCESS,
    videoId,
    additionalVideos,
  };
}

function loadPage(videoId) {
  return async dispatch => {
    try {
      dispatch(loadPageInit());
      const url = `http://localhost:5000/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=11`;
      const response = await fetch(url);
      const json = await response.json();
      console.log('json', json);
      const additionalVideos = json.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
      }));
      dispatch(loadPageSuccess(videoId, additionalVideos));
    } catch (e) {
      dispatch(loadPageError(videoId, e.message));
    }
  };
}

function loadPageErrorReducer(state, action) {
  return {
    ...state,
    [action.videoId]: {
      featuredVideo: action.videoId,
      additionalVideos: [],
      loading: false,
      error: action.errorMessage,
    },
  };
}

function loadPageInitReducer(state, action) {
  return {
    ...state,
    [action.videoId]: {
      featuredVideo: action.videoId,
      additionalVideos: [],
      loading: true,
      error: null,
    },
  };
}

function loadPageSuccessReducer(state, action) {
  return {
    ...state,
    [action.videoId]: {
      featuredVideo: action.videoId,
      additionalVideos: action.additionalVideos,
      loading: false,
      error: null,
    }
  };
}

function viewingPageReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_PAGE_SUCCESS:
      return loadPageSuccessReducer(state, action);
    case LOAD_PAGE_INIT:
      return loadPageInitReducer(state, action);
    case LOAD_PAGE_ERROR:
      return loadPageErrorReducer(state, action);
  }
  return state;
}

export {viewingPageReducer, loadPage};
