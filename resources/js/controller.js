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
	localStorage.setItem('selectedCanvases', JSON.stringify([]));
	localStorage.setItem('discardPile', JSON.stringify([]));
	var myDeck = JSON.parse(localStorage.deck);
	createNew();
}

