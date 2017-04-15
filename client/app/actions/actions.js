export const toggleCard = (stageId) => {
  return {
    type: 'TOGGLE_CARD',
    stageId,
  }
}

export const setCard = (stageId, card) => {
  return {
    type: 'SET_CARD',
    stageId,
    card,
  }
}