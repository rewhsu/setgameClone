import Sidebar from '../components/Sidebar/Sidebar.js'
import { connect } from 'react-redux';

var mapStateToProps = (state) => {
  return {
  }
}

var mapDispatchToProps = (dispatch) => {
  return {
  }
}

var SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)

export default SidebarContainer;