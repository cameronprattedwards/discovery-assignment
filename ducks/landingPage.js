import qs from 'qs';

const FEATURED_VIDEO_ID = 'tlTKTTt47WE';

const INITIAL_STATE = {
  featuredVideo: FEATURED_VIDEO_ID,
  additionalVideos: [],
  loadingPage: false,
  loadingAdditionalVideos: false,
  error: null,
  additionalVideosLoaded: 0,
  nextPageToken: null,
};

const LOAD_PAGE_ERROR = 'landingPage/LOAD_PAGE_ERROR';
const LOAD_PAGE_SUCCESS = 'landingPage/LOAD_PAGE_SUCCESS';
const LOAD_PAGE_INIT = 'landingPage/LOAD_PAGE_INIT';
const LOAD_MORE_ERROR = 'landingPage/LOAD_MORE_ERROR';
const LOAD_MORE_SUCCESS = 'landingPage/LOAD_MORE_SUCCESS';
const LOAD_MORE_INIT = 'landingPage/LOAD_MORE_INIT';

function loadPageError(errorMessage) {
  return {
    type: LOAD_PAGE_ERROR,
    errorMessage,
  };
}

function loadPageInit() {
  return {
    type: LOAD_PAGE_INIT,
  };
}

function loadPageSuccess(additionalVideos, nextPageToken) {
  return {
    type: LOAD_PAGE_SUCCESS,
    additionalVideos,
    nextPageToken,
  };
}

async function deserializeResponse(response) {
  const json = await response.json();
  const additionalVideos = json.items.map(item => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
  }));
  return {additionalVideos, nextPageToken: json.nextPageToken};
}

function loadPage() {
  return async dispatch => {
    try {
      dispatch(loadPageInit());
      const query = qs.stringify({
        part: 'snippet',
        relatedToVideoId: FEATURED_VIDEO_ID,
        type: 'video',
        maxResults: 10,
      });
      const url = `http://localhost:5000/search?${query}`;
      const response = await fetch(url);
      const {additionalVideos, nextPageToken} = await deserializeResponse(response);
      dispatch(loadPageSuccess(additionalVideos, nextPageToken));
    } catch (e) {
      dispatch(loadPageError(e.message));
    }
  };
}

function loadMoreVideosInit() {
  return {
    type: LOAD_MORE_INIT,
  };
}

function loadMoreVideosSuccess(additionalVideos, nextPageToken) {
  return {
    type: LOAD_MORE_SUCCESS,
    additionalVideos,
    nextPageToken,
  };
}

function loadMoreVideosError(errorMessage) {
  return {
    type: LOAD_MORE_ERROR,
    errorMessage,
  };
}

function loadMoreVideos() {
  return async (dispatch, getData) => {
    const {landingPage} = getData();
    if (landingPage.loadingAdditionalVideos || landingPage.additionalVideosLoaded >= 30 || landingPage.loadingPage) {
      return;
    }
    try {
      dispatch(loadMoreVideosInit());
      const query = qs.stringify({
        part: 'snippet',
        relatedToVideoId: FEATURED_VIDEO_ID,
        type: 'video',
        maxResults: 10,
        pageToken: landingPage.nextPageToken,
      });
      const url = `http://localhost:5000/search?${query}`;
      const response = await fetch(url);
      const {additionalVideos, nextPageToken} = await deserializeResponse(response);
      dispatch(loadMoreVideosSuccess(additionalVideos, nextPageToken));
    } catch (e) {
      dispatch(loadMoreVideosError(e.message));
    }
  };
}

function loadPageErrorReducer(state, action) {
  return {
    ...state,
    additionalVideos: [],
    loadingPage: false,
    error: action.errorMessage,
  };
}

function loadPageInitReducer(state, action) {
  return {
    ...state,
    additionalVideos: [],
    loadingPage: true,
    error: null,
  };
}

function loadPageSuccessReducer(state, action) {
  return {
    ...state,
    additionalVideos: action.additionalVideos,
    loadingPage: false,
    error: null,
    additionalVideosLoaded: 10,
    nextPageToken: action.nextPageToken,
  };
}

function loadMoreVideosInitReducer(state, action) {
  return {
    ...state,
    loadingAdditionalVideos: true,
  };
}

function loadMoreVideosSuccessReducer(state, action) {
  return {
    ...state,
    loadingAdditionalVideos: false,
    additionalVideos: state.additionalVideos.concat(action.additionalVideos),
    additionalVideosLoaded: state.additionalVideosLoaded + 10,
    nextPageToken: action.nextPageToken,
  };
}

function loadMoreVideosErrorReducer(state, action) {
  return {
    ...state,
    loadingAdditionalVideos: false,
    error: action.errorMessage,
  };
}

function landingPageReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_PAGE_SUCCESS:
      return loadPageSuccessReducer(state, action);
    case LOAD_PAGE_INIT:
      return loadPageInitReducer(state, action);
    case LOAD_PAGE_ERROR:
      return loadPageErrorReducer(state, action);
    case LOAD_MORE_INIT:
      return loadMoreVideosInitReducer(state, action);
    case LOAD_MORE_SUCCESS:
      return loadMoreVideosSuccessReducer(state, action);
    case LOAD_MORE_ERROR:
      return loadMoreVideosErrorReducer(state, action);
  }
  return state;
}

export {landingPageReducer, loadPage, loadMoreVideos};

