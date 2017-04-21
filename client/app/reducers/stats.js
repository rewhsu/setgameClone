export const points = (state = 0, action) => {
  switch (action.type) {
    case 'ADD_POINTS':
      return state + action.points;
    default:
      return state
  }
}

export const log = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_LOG':
      return state + action.text;
    default:
      return state
  }
}