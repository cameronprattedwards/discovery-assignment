import {connect} from 'react-redux';
import {LandingPage as PureLandingPage} from '../components/LandingPage';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

const LandingPage = connect(mapStateToProps, mapDispatchToProps)(PureLandingPage);

export {LandingPage};
