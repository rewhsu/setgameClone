import { getShuffledDeck } from '../../utils/utils';

export const deck = (state = [], action) => {
  switch (action.type) {
    case 'RESET_DECK':
      return getShuffledDeck();
    case 'ADD_DECK':
      return Object.assign({}, state, getShuffledDeck());
    default:
      return state
  }
}

export const deckIndex = (state = 0, action) => {
  console.log('deal card deck index', state, action);
  switch (action.type) {
    case 'DEAL_CARD':
      return state + 1;
    default:
      return state
  }
}