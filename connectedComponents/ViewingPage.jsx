import {connect} from 'react-redux';
import {ViewingPage as PureViewingPage} from '../components/ViewingPage';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

const ViewingPage = connect(mapStateToProps, mapDispatchToProps)(PureViewingPage);

export {ViewingPage};
