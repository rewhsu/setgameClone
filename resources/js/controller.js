/**
 * @author Andrew
 */
function startGame(){
	//Create game stage
	if(JSON.parse(localStorage.getItem('start')) === undefined){
		run();
	}
	else{
		reset();
		alert("Time is set to : 30 seconds");
		run();
	}
}

function createNewFrontCanvas(){
	//Reset selection canvases
	localStorage.setItem('selectedCanvases', JSON.stringify([]));
	var selectorCanvas = new SelectorCanvases();
	selectorCanvas.addDivClickEvent();
	localStorage.setItem('deleteBool', JSON.stringify(false));
	return selectorCanvas;
};

function resetStageSlots(){
	var stageSlots = [];
	for(var i = 0; i < 9; i++){
		createHtmlCanvases(i);
		stageSlots.push(undefined);
	}
	localStorage.setItem('stageSlots', JSON.stringify(stageSlots));
}

function preserveHighScore(){
	//Save data before reset
	if(JSON.parse(localStorage.getItem('high_score')) === "undefined" || JSON.parse(localStorage.getItem('high_score')) === null){
		var highScore = 0;
	}
	else{
		var highScore = JSON.parse(localStorage.getItem('high_score'));
	}
	localStorage.setItem('high_score', JSON.stringify(highScore));
}

function reset(){
	var time = JSON.parse(localStorage.getItem('timer'));
	//Stop timer
	clearInterval(time);
	//Clear page storage
	localStorage.clear();
	preserveHighScore();
	//Initialize initial page storage values
	localStorage.setItem('selectedCanvases', JSON.stringify([]));
	localStorage.setItem('discardPile', JSON.stringify([]));
	localStorage.setItem('cards_left', JSON.stringify(81));
	localStorage.setItem('points', JSON.stringify(0));
	localStorage.setItem('start', JSON.stringify(true));
	//Set HTML elements
	document.getElementById('cards_left').innerHTML = 81;
	document.getElementById('points').innerHTML = 0;
	document.getElementById('gameStage').innerHTML = "";
	//Delete click event
	deleteClickEvent();
	//Reset stage
	resetStageSlots();
	//Create deck object and store in page
	createDeck();
}

function deleteClickEvent(){
	//Delete click event
	setLocalItem('deleteBool', JSON.stringify(true));
	document.getElementById('gameStage').click();	
}

function run(){
	//Start Game
	localStorage.setItem('start', JSON.stringify(true));
	var myDeck = JSON.parse(localStorage.deck);
	createNewFrontCanvas();
	assignRandomCards();
	startTime();
}

function assignRandomCards(reset){
	if(JSON.parse(localStorage.getItem('reset') === true)){
		reset();
		localStorage.setItem('start', JSON.stringify(false));
	}
	var stageSlots = JSON.parse(localStorage.getItem('stageSlots'));
	var canvasObjects = [];
	for(var i = 0; i < stageSlots.length; i++){
		if(stageSlots[i] === null || stageSlots[i] === undefined){
			var card = getRandomCard();
			stageSlots[i] = card.id;
			var newCanvas = new CardCanvasObject(card, i);
			localStorage.setItem('stageSlots', JSON.stringify(stageSlots));
			newCanvas.drawCard();
			// newCanvas.ctx.beginPath();
			// newCanvas.ctx.strokeRect(0, 0, 50, 50);
			// newCanvas.ctx.stroke();
			localStorage.setItem('assignedCards', JSON.stringify(stageSlots));
			canvasObjects.push(newCanvas);	
		}
	}
	localStorage.setItem('stageSlots', JSON.stringify(stageSlots));
	localStorage.setItem('canvasObjects', JSON.stringify(canvasObjects));
}

function compare(){
	if(compareCards() === true){
		//alert(true);
		alert("Congrats Gabby! You've found one!");
		isMatch();
	}
	else{
		alert(compareCards());
	}
}

function checkNewHighScore(){
	var points = JSON.parse(localStorage.getItem('points'));
	var highScore = JSON.parse(localStorage.getItem('high_score'));
	if(highScore < points){
		localStorage.setItem('high_score', JSON.stringify(points));
	};
	localStorage.setItem('points', JSON.stringify(0));
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    console.log(document.querySelector('#time').value);
    var interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        
        if (--timer < 0) {
        	alert("Game Over!");
        	highScore();
        	reset();
        	clearInterval(interval);
        }
    }, 1000);
	function highScore(){
		var gotNewHighScore = checkNewHighScore();
		if(gotNewHighScore){
			alert("NEW HIGH SCORE!!!!");
		}
		clearInterval(interval);
	} 
	localStorage.setItem('timer', JSON.stringify(interval));
}

function startTime () {
    var threeMinutes = 60 * .5,
        display = document.querySelector('#time');
    startTimer(threeMinutes, display);
};