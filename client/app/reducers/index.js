import { combineReducers } from 'redux';
import { stage, selections } from './stage';
import { deck, deckIndex } from './deck';

const setApp = combineReducers({
  stage,
  deck,
  deckIndex,
  selections,
})

export default setApp