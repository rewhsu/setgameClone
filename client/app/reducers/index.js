import { combineReducers } from 'redux';
import { stage } from './stage';
import { deck, deckIndex } from './deck';

const setApp = combineReducers({
  stage,
  deck,
  deckIndex,
})

export default setApp