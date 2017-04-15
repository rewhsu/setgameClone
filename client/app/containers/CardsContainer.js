import Cards from '../components/Cards/Cards.js'
import { connect } from 'react-redux';
import { toggleCard, setCard } from '../actions/actions';
import createDeck from '../../utils/createDeck';

var mapStateToProps = (state) => {
  return {
    stage: state.stage,
    deck: createDeck(),
  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    toggleCard(stageId, isSelected) {
      dispatch(toggleCard(stageId, isSelected));
    },
    setCard(stageId, card) {
      dispatch(setCard(stageId, card));
    }
  }
}

var CardsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards)

export default CardsContainer;