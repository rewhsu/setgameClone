/**
 * @author Andrew
 */

document.addEventListener('DOMContentLoaded', function() {
	var highScore = JSON.parse(localStorage.getItem('high_score'));
	localStorage.setItem('points', JSON.stringify(0));
	localStorage.setItem('isRunning', JSON.stringify(false));
	document.getElementById('points').innerHTML = 0;
	// document.getElementById('high_score').innerHTML = highScore;
	document.getElementById('gameStage').innerHTML = "";
	createDeck();
	var lastDuration = JSON.parse(localStorage.getItem('duration'));
	if (lastDuration === undefined){
		setUserTime();
	}
	reset();
    //run();
    // startTime();
}, false);

function gameIsRunning(){
	var isRunning = JSON.parse(localStorage.getItem('isRunning'));
	if(isRunning === true){
		return true;
	}
	else{
		return false;
	}
}

function startGame(){
	//Create game stage
	if(gameIsRunning()){
		var result = confirm("Are you sure you want to quit your current game?");
		if (result === false){
			return false;
		}
	}
	reset();
	run();
	startTime();
}

function resetHighScore(){
	if(confirm("Are you sure you want to reset your high score?")){
		localStorage.setItem('high_score', JSON.stringify(0));
		document.getElementById('high_score').innerHTML = 0;
	}
}

function myCombinations(){
	var myCombos = [];
	for(var i = 0; i < 7; i++){
		for(var j = 1; j < 8; j++){
			for(var k = 2; k < 9; k++){
				if(j > i && k > j){
					myCombos.push([i, j, k]);
				}
			};
		};
	};
	return myCombos;
}

function checkIfSetAlert(){
	var results = checkIfSet();
	if(results !== false){
		results = results.join("\n");
		alert(results);
	}
	else{
		alert("No Match... resetting stage");
		resetWithoutPoints();
		run();
	}
}

function checkIfSet(){
	var uniqueCombos = myCombinations();
	var results = [];
	uniqueCombos.forEach(function(combination){
		if(compareCards(combination) === true){
			results.push(combination);
		};
	});
	if (results.length !== 0){
		return results;
	}
	else{
		return false;
	}
	
};

function addPoints(num){
	var points = JSON.parse(localStorage.getItem('points'));
	points += num;
	document.getElementById('points').innerHTML = points;
	localStorage.setItem('points', JSON.stringify(points));
}

function subtractPoints(num){
	var points = JSON.parse(localStorage.getItem('points'));
	points -= num;
	if(points < 0){
		points = 0;
	}
	document.getElementById('points').innerHTML = points;
	localStorage.setItem('points', JSON.stringify(points));
}

// function setUserTime(){
	// var time_mmss = document.getElementById('usr_time').value;
	// var seconds = convert_mmss_to_secs(time_mmss);
	// localStorage.setItem('usr_time', JSON.stringify(seconds));
// }
// function checkIfTimeExists(){
	// if(JSON.parse(localStorage.getItem('start')) === true
// }

function setUserTime(){
	if(gameIsRunning()){
		var quitBool = confirm("Are you sure you want to quit your current game?");
		if(quitBool === false){
			return false;
		}
	}
	var response = prompt("Please enter your desired duration", "mm:ss");
	if(response === false || response === null){
		return false;
	}
	var secs = convert_mmss_to_secs(response);
    localStorage.setItem('usr_time',JSON.stringify(secs));
	reset();
	run();
	startTime();
}

function convert_mmss_to_secs(myStr){
	var ind = myStr.search(':');
	var mins = parseInt(myStr.substring(0, ind));
	var secs = parseInt(myStr.substring(ind + 1));
	var totalSecs = mins * 60 + secs;
	return totalSecs;
}

function createNewFrontCanvas(){
	//Reset selection canvases
	localStorage.setItem('selectedCanvases', JSON.stringify([]));
	deleteClickEvent();
	var selectorCanvas = new SelectorCanvases();
	selectorCanvas.addDivClickEvent();
	// localStorage.setItem('deleteBool', JSON.stringify(false));
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

// function preserveHighScore(){
	// //Save data before reset
	// if(JSON.parse(localStorage.getItem('high_score')) === "undefined" || JSON.parse(localStorage.getItem('high_score')) === null){
		// var highScore = 0;
	// }
	// else{
		// var highScore = JSON.parse(localStorage.getItem('high_score'));
	// }
	// localStorage.setItem('high_score', JSON.stringify(highScore));
// }
// 
// function preserveUserTime(){
	// //Save data before reset
	// var usrTime = JSON.parse(localStorage.getItem('usr_time'));
	// if(usrTime == undefined || usrTime == null){
		// var utime = setUserTime();
	// }
	// else{
		// var utime = usrTime;
	// }
	// console.log("Time is set to : " + utime + " mm:ss");
	// localStorage.setItem('usr_time', JSON.stringify(utime));
// }

function reset(){
	localStorage.setItem('isRunning', JSON.stringify(false));
	var time = JSON.parse(localStorage.getItem('timer'));
	//Stop timer
	localStorage.removeItem('selectedCanvases');
	localStorage.removeItem('discardPile');
	localStorage.removeItem('cards_left');
	localStorage.removeItem('points');
	//localStorage.removeItem('start');
	clearInterval(time);
	// preserveHighScore();
	// preserveUserTime();
	//Initialize initial page storage values
	localStorage.setItem('selectedCanvases', JSON.stringify([]));
	localStorage.setItem('discardPile', JSON.stringify([]));
	localStorage.setItem('cards_left', JSON.stringify(81));
	localStorage.setItem('points', JSON.stringify(0));
	//Delete click event
	deleteClickEvent();
	//Set HTML elements
	// document.getElementById('cards_left').innerHTML = 81;
	document.getElementById('points').innerHTML = 0;
	document.getElementById('gameStage').innerHTML = "";
	//Reset stage
	resetStageSlots();
	//Create deck object and store in page
	//createDeck();
}

function resetWithoutPoints(){

	localStorage.removeItem('selectedCanvases');
	localStorage.removeItem('discardPile');
	localStorage.removeItem('cards_left');
	//Initialize initial page storage values
	localStorage.setItem('selectedCanvases', JSON.stringify([]));
	localStorage.setItem('discardPile', JSON.stringify([]));
	localStorage.setItem('cards_left', JSON.stringify(81));
	//Delete click event
	deleteClickEvent();
	//Set HTML elements
	// document.getElementById('cards_left').innerHTML = 81;
	document.getElementById('gameStage').innerHTML = "";
	//Reset stage
	resetStageSlots();
	//Create deck object and store in page
}

function deleteClickEvent(){
	localStorage.setItem('deleteBool', JSON.stringify(true));
	//Delete click event
	document.getElementById('gameStage').click();	
	localStorage.setItem('deleteBool', JSON.stringify(false));
}

function run(){
	localStorage.setItem('isRunning', JSON.stringify(true));
	//Start Game
	var myDeck = JSON.parse(localStorage.deck);
	createNewFrontCanvas();
	assignRandomCards();
}

function assignRandomCards(reset){
	// if(JSON.parse(localStorage.getItem('reset') === true)){
		// reset();
		// localStorage.setItem('start', JSON.stringify(false));
	// }
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
	if(compareStagedCards() === true){
		//alert(true);
		console.log("Congrats, you've found one!");
		isMatch();
		assignRandomCards();
	}
	else{
		alert(compareStagedCards());
	}
}

function gameEnds(){
	var time = JSON.parse(localStorage.getItem('timer'));
	localStorage.setItem('isRunning', JSON.stringify(false));
	var bool = highScore();
	if(bool === false){
		if(confirm("Game Over!\nPress OK to Reset and Play Again")){
			reset();
        	run();
        	startTime();
    	}
    }
    else{
    	if(confirm("NEW HIGH SCORE!!!!\nPlease Press OK to Reset and Play Again")){
			reset();
        	run();
        	startTime();
    	}
    	document.getElementById('high_score').innerHTML = newHighScore;
    }
    clearInterval(time);
}

function highScore(){
	var newHighScore = checkNewHighScore();
	localStorage.setItem('points', JSON.stringify(0));
	if(newHighScore !== false){
		// alert("NEW HIGH SCORE!!!!\nPlease Press OK to Reset and Play Again");
		// document.getElementById('high_score').innerHTML = newHighScore;
		return true;
	}
	return false;
} 

function checkNewHighScore(){
	var points = JSON.parse(localStorage.getItem('points'));
	var highScore = JSON.parse(localStorage.getItem('high_score'));
	if(highScore < points){
		localStorage.setItem('high_score', JSON.stringify(points));
		return points;
	};
	return false;
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
        	gameEnds();
        }
    }, 1000);
	localStorage.setItem('timer', JSON.stringify(interval));
}

function startTime () {
	var user_time = JSON.parse(localStorage.getItem('usr_time'));
    var display = document.querySelector('#time');
    startTimer(user_time, display);
};
