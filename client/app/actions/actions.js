export const toggleCard = (stageId) => {
  return {
    type: 'TOGGLE_CARD',
    stageId,
  }
}

export const dealCard = (stageId, card) => {
  return {
    type: 'DEAL_CARD',
    stageId,
    card,
  }
}

export const resetDeck = () => {
  return {
    type: 'RESET_DECK',
  }
}

export const addDeck = () => {
  return {
    type: 'ADD_DECK',
  }
}