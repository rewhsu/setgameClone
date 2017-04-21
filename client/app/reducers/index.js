import { combineReducers } from 'redux';
import { stage, numSelected } from './stage';
import { deck, deckIndex } from './deck';

const setApp = combineReducers({
  stage,
  deck,
  deckIndex,
  numSelected,
})

export default setApp