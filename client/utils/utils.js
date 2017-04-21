import createDeck from './createDeck';

export const initializeStage = () => {
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

export const makeDeck = () => {
  var deck = createDeck();
  return deck;
}

export const getShuffledDeck = () => {
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

export const validateSelection = (selection) => {
  
}