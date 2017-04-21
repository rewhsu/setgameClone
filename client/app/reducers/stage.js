import { randomCard, validate } from '../../utils/utils';

export const stage = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_CARD':
    case 'DEAL_CARD':
      return state.map(t =>
        card(t, action)
      )
    default:
      return state
  }
}

export const selections = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_CARD':
      if (action.newState) {
        // if (state.length < 3) {
          return [...state, action.stageId];
        // }
        // return state;
      }
      console.log('new state is false');
      return state.slice(0, state.length - 1);
      // return state - 1;
    default:
      return state
  }
}

const card = (state = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_CARD':
      if (state.stageId !== action.stageId) {
        return state;
      }   
      return Object.assign({}, state, {
        isSelected: !state.isSelected
      })
      return state
    case 'DEAL_CARD':
      if (state.stageId !== action.stageId) {
        return state;
      }
      return Object.assign({}, state, {
        card: action.card,
      })
    default:
      return state
  }
}