import { combineReducers } from 'redux';
import { stage, selections } from './stage';
import { deck, deckIndex } from './deck';
import { points } from './stats';

const setApp = combineReducers({
  stage,
  deck,
  deckIndex,
  selections,
  points,
})

export default setApp