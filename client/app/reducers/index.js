import { combineReducers } from 'redux';
import { stage, selections } from './stage';
import { deck, deckIndex } from './deck';
import { points, log } from './stats';

const setApp = combineReducers({
  stage,
  deck,
  deckIndex,
  selections,
  points,
  log,
})

export default setApp