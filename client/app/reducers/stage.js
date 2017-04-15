export const stage = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_CARD':
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
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        isSelected: !isSelected
      })
    default:
      return state
  }
}