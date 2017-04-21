export const toggleCard = (stageId, newState, selections) => {
  return {
    type: 'TOGGLE_CARD',
    stageId,
    newState,
    selections,
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