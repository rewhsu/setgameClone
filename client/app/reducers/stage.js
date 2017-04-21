import { randomCard } from '../../utils/utils';

export const stage = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_CARD':
    case 'DEAL_CARD':
    case 'VALIDATE_CARDS':
      return state.map(t =>
        card(t, action)
      )
    default:
      return state
  }
}

export const numSelected = (state = 0, action) => {
  switch (action.type) {
    case 'TOGGLE_CARD':
      if (action.newState) {
        if (state < 3) {
          return state + 1;
        }
        return state;
      }
      return state - 1;
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
      if (action.numSelected < 3) {      
        return Object.assign({}, state, {
          isSelected: !state.isSelected
        })
      }
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