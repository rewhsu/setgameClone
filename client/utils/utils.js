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

export const validateSelection = (selection, deck) => {
  return compareCards(selection, deck);
}

// From legacy code
function compareStagedCards(){
  var selectedCanvases = JSON.parse(localStorage.getItem('selectedCanvases'));
  return compareCards(selectedCanvases);
}

function compareCards(selection, deck){
  // var stageSlots = JSON.parse(localStorage.getItem('stageSlots'));
  var cardArr = [];
    var noMatch = "";
    var allProps = {
      colors: [],
      fills: [],
      numbers: [],
      shapes: [],
    };
    selection.forEach(function(index) {
      // var card = getCardById(stageSlots[index]);
      if (allProps.colors.indexOf(deck[index].color) === -1) {
        allProps.colors.push(deck[index].color);
      }
      if (allProps.fills.indexOf(deck[index].fill) === -1) {
        allProps.fills.push(deck[index].fill);
      }
      if (allProps.numbers.indexOf(deck[index].number) === -1) {
        allProps.numbers.push(deck[index].number);
      }
      if (allProps.shapes.indexOf(deck[index].shape) === -1) {
        allProps.shapes.push(deck[index].shape);
      }
    });
    for (var myProp in allProps) {
      var check = allProps[myProp];
      if (allProps.hasOwnProperty(myProp)) {
        if (allProps[myProp].length % 2 === 0) {
          noMatch += ("Mismatched " + myProp + ": " + allProps[myProp] + "\n");
        }
      }
    }
    console.log(noMatch);
    if (noMatch.length === 0) {
      return true;
    } 
    else {
      return noMatch;
    }
};