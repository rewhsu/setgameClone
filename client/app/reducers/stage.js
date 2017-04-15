import { randomCard } from '../../utils/utils';

export const stage = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_CARD':
      return state.map(t =>
        card(t, action)
      )
    case 'SET_CARD':
      return state.map(t =>
        card(t, action)
      )
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
        isSelected: !isSelected
      })
    case 'SET_CARD':
      if (state.stageId !== action.stageId) {
        return state;
      }
      return Object.assign({}, state, {
        cardId: action.cardId,
      })
    default:
      return state
  }
}