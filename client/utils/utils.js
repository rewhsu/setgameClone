import createDeck from './createDeck';

export const initializeStage = function() {
  var stage = [];
  for (var i = 0; i < 9; i++) {
    stage.push({
      stageId: i,
      isSelected: false,
      card: null,
    });
  }
  return stage;
}

export const makeDeck = function() {
  var deck = createDeck();
  return deck;
}

export const getShuffledDeck = function() {
  var deck = makeDeck();
  for (var i = deck.length - 1; i > 0; i--) {
    var temp = deck[i];
    var rand = Math.floor(Math.random() * i);
    deck[i] = deck[rand];
    deck[rand] = temp;
  }
  console.log('deck', deck);
  return deck;
}