Object.CardPile.prototype = {
	cards: [],
	getCard: function(card){
		cards.push(card)
	}
	sendCardTo: function(cardId, dstPile){
		var selectedCard = cards.splice(cards.cardId);
		dstPile.getCard(selectedCard);
	}
}
function createDeck(){
	var shapes = ["A", "B", "C"];
	var numbers = [1, 2, 3];
	var colors = ["red", "green", "purple"];
	var fills = ["solid", "hatched", "none"];
	var cardArray = [];
	var count = 1;
	var propVariations = 3;
	for(var i = 0; i < propVariations; i++){
		for(var j = 0; j < propVariations; j++){
			for(var k = 0; k < propVariations; k++){
				for(var l = 0; l < propVariations; l++){
					var myObj = {
						id: count,
						shape: shapes[i],
						number: numbers[j],
						color: colors[k],
						fill: fills[l],
					}
					cardArray.push(myObj);
					count++;
				}
			}
		}
	}
	return cardArray;
}

var deckPile = createDeck();
var activePile = [];
var discardPile = [];

