export const points = (state = 0, action) => {
  switch (action.type) {
    case 'ADD_POINTS':
      return state + action.points;
    default:
      return state
  }
}