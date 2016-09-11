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
	localStorage.setItem('selectedCanvases', JSON.stringify([]));
	localStorage.setItem('discardPile', JSON.stringify([]));
	localStorage.setItem('cards_left', JSON.stringify([81]));
	var myDeck = JSON.parse(localStorage.deck);
	createNew();
}

function reload(){
	//Reset game
	localStorage.clear();
	document.getElementById('gameStage').innerHTML = "";
	setLocalItem('deleteBool', JSON.stringify([true]));
	document.getElementById('gameStage').click();
	startGame();
}

function assignRandomCards(){
	var stageSlots = JSON.parse(localStorage.getItem('stageSlots'));
	var canvasObjects = [];
	for(var i = 0; i < stageSlots.length; i++){
		if(stageSlots[i] === null || stageSlots[i] === undefined){
			var card = getRandomCard();
			stageSlots[i] = card.id;
			var newCanvas = new CardCanvasObject(card, i);
			localStorage.setItem('stageSlots', JSON.stringify(stageSlots));
			newCanvas.drawCard();
			newCanvas.ctx.beginPath();
			newCanvas.ctx.strokeRect(0, 0, 50, 50);
			newCanvas.ctx.stroke();
			localStorage.setItem('assignedCards', JSON.stringify(stageSlots));
			canvasObjects.push(newCanvas);	
		}
	}
	localStorage.setItem('stageSlots', JSON.stringify(stageSlots));
	localStorage.setItem('canvasObjects', JSON.stringify(canvasObjects));
}

function compare(){
	alert(compareCards());
	if(compareCards() === true){
		isMatch();
	}
}