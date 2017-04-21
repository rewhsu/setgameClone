import Log from '../components/Log/Log.js'
import { connect } from 'react-redux';

var mapStateToProps = (state) => {
  return {
    log: state.log,
  }
}

var LogContainer = connect(
  mapStateToProps,
)(Log)

export default LogContainer;