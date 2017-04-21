import Sidebar from '../components/Sidebar/Sidebar.js'
import { connect } from 'react-redux';
import { addPts, updateLog } from '../actions/actions';
import { validateSelection } from '../../utils/utils';

var mapStateToProps = (state) => {
  return {
    selections: state.selections,
    deck: state.deck,
    points: state.points,
  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    addPoints(points) {
      dispatch(addPts(points));
    },
    validateSelection(selection, deck) {
      if (selection.length === 3) {
        var result = validateSelection(selection, deck);
        console.log('result', result);
        updateLog(result);
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