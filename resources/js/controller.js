/**
 * @author Andrew
 */
function startGame(){
	//Create game stage
	var stageSlots = [];
	for(var i = 0; i < 9; i++){
		createHtmlCanvases(i);
		stageSlots.push(undefined);
	}
	localStorage.setItem('stageSlots', JSON.stringify(stageSlots));
	createDeck();
	var canvases = [];
	var myDeck = JSON.parse(localStorage.deck);
	//localStorage.setItem('back-canvases', JSON.stringify(canvases));
	//localStorage.setItem('front-canvases', JSON.stringify());
	//localStorage.setItem('newCanvas', JSON.stringify(newCanvas));
	//Need this one
	
	var selectorCanvas = new SelectorCanvases();
	selectorCanvas.addDivClickEvent();
	//Copy this
	// var cardIndex = [2, 4, 7, 17, 3, 9, 27, 5, 6];
	// var myDeck = JSON.parse(localStorage.deck);
	// var testCard = myDeck[cardIndex[0]];
	// var testCanvas = new CardCanvasObject(testCard);
}

