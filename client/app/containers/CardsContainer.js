import Cards from '../components/Cards/Cards.js'
import { connect } from 'react-redux';
import toggleCard from '../actions/actions';

var mapStateToProps = (state) => {
  return {
    stage: state.stage
  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    toggleCard(id) {
      dispatch(toggleCard(id));
    }
  }
}

var CardsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards)

export default CardsContainer;