import Sidebar from '../components/Sidebar/Sidebar.js'
import { connect } from 'react-redux';
import { addPts } from '../actions/actions';
import { validateSelection } from '../../utils/utils';

var mapStateToProps = (state) => {
  return {
    points: state.points,
  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    addPoints(points) {
      dispatch(addPts(points));
    },
    validateSelection(selection) {
      if (selection.length === 3) {
        validateSelection(selection);
      } else {
        alert('You must select 3 cards to validate');
      }
    },
  }
}

var SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)

export default SidebarContainer;