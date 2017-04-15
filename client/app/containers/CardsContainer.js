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
    toggleCard(stageId) {
      dispatch(toggleCard(stageId));
    },
    setCard(stageId, cardId) {
      dispatch(setCard(stageId, cardId));
    }
  }
}

var CardsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards)

export default CardsContainer;