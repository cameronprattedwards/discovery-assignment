import {connect} from 'react-redux';
import {LandingPage as PureLandingPage} from '../components/LandingPage';
import {loadMoreVideos, loadPage} from '../ducks/landingPage';

function mapStateToProps(state) {
  return {
    featuredVideo: state.landingPage.featuredVideo,
    additionalVideos: state.landingPage.additionalVideos,
    isInfiniteLoading: state.landingPage.loadingAdditionalVideos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onInfiniteLoad: () => dispatch(loadMoreVideos()),
    loadPage: () => dispatch(loadPage()),
  };
}

const LandingPage = connect(mapStateToProps, mapDispatchToProps)(PureLandingPage);

export {LandingPage};
