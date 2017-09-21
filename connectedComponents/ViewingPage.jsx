import {connect} from 'react-redux';
import {ViewingPage as PureViewingPage} from '../components/ViewingPage';
import {loadPage} from '../ducks/viewingPage';

function mapStateToProps(state, ownProps) {
  const videoId = ownProps.match.params.id;
  const pageState = state.viewingPage[videoId];
  if (pageState) {
    return pageState;
  }

  return {
    loading: true,
    featuredVideo: videoId,
    additionalVideos: [],
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const videoId = ownProps.match.params.id;
  return {
    loadPage: () => dispatch(loadPage(videoId)),
  };
}

const ViewingPage = connect(mapStateToProps, mapDispatchToProps)(PureViewingPage);

export {ViewingPage};
