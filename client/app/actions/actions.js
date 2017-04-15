export const toggleCard = (stageId) => {
  return {
    type: 'TOGGLE_CARD',
    stageId,
  }
}

export const setCard = (stageId, cardId) => {
  return {
    type: 'SET_CARD',
    stageId,
    cardId,
  }
}