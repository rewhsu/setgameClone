/**
 * @author Andrew
 */
function startGame(){
	createDeck();
	var canvases = [];
	var myDeck = JSON.parse(localStorage.deck);
	var cardIndex = [2, 14, 47, 55, 13, 29, 7, 5, 16];
	for(var i = 0; i < cardIndex.length; i++){
		var card = myDeck[cardIndex[i]];
		loadCanvasHtml(card.id, i, true);
		loadCanvasHtml(card.id, i, false);
		var newCanvas = new CardCanvasObject(card);
		canvases.push(newCanvas);
		newCanvas.drawCard();
	}
	
	localStorage.setItem('test', JSON.stringify(canvases));
	localStorage.setItem('testCard', JSON.stringify(canvases[0]));
	localStorage.setItem('newCanvas', JSON.stringify(newCanvas));
	
	//Copy this
	var cardIndex = [2, 4, 7, 17, 3, 9, 27, 5, 6];
	var myDeck = JSON.parse(localStorage.deck);
	var testCard = myDeck[cardIndex[0]];
	var testCanvas = new CardCanvasObject(testCard);
}

