import Cards from '../components/Cards/Cards.js'
import { connect } from 'react-redux';
import { toggleCard, dealCard, addDeck, resetDeck } from '../actions/actions';
import { createDeck, shuffleDeck } from '../../utils/createDeck';

var mapStateToProps = (state) => {
  return {
    stage: state.stage,
    deck: state.deck,
    deckIndex: state.deckIndex,
    numSelected: state.numSelected,
  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    toggleCard(stageId, newState, numSelected) {
      dispatch(toggleCard(stageId, newState, numSelected));
    },
    dealCard(stageId, card) {
      dispatch(dealCard(stageId, card));
    },
    resetDeck() {
      dispatch(resetDeck());
    },
    addDeck() {
      dispatch(addDeck());
    },
  }
}

var CardsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards)

export default CardsContainer;