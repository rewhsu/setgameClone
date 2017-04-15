import createDeck from './createDeck';

export const initializeStage = function() {
  var stage = [];
  for (var i = 0; i < 9; i++) {
    stage.push({
      stageId: i,
      cardId: null,
      isSelected: false,
    });
  }
  return stage;
}